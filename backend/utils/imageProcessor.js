import multer from "multer"
import sharp from "sharp"
import crypto from "crypto"
import ImageKit, { toFile } from "@imagekit/nodejs"

// ─── ImageKit SDK ───────────────────────────────────────────────────────────────
export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ─── Multer Configuration ───────────────────────────────────────────────────────
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
        ];
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error("Only JPEG, PNG, WebP, and AVIF images are allowed."), false);
        }
        cb(null, true);
    },
});

// ─── Magic Byte Signatures ──────────────────────────────────────────────────────
export function validateMagicBytes(buffer) {
    const bytes = new Uint8Array(buffer);

    // JPEG: FF D8 FF
    if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return true;

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
        bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A) return true;

    // WebP: starts with RIFF, then 4 bytes of size, then WEBP
    if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
        bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return true;

    // AVIF: ftyp box — bytes 4-7 are "ftyp", then "avif" or "avis" or "mif1"
    if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
        const brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
        if (["avif", "avis", "mif1"].includes(brand)) return true;
    }

    return false;
}

// ─── Process Image with Sharp ───────────────────────────────────────────────────
export async function processImageToWebp(buffer) {
    return await sharp(buffer)
        .rotate() // auto-rotate based on EXIF before stripping
        .webp({ quality: 85 })
        .toBuffer();
}

// ─── Upload to ImageKit ──────────────────────────────────────────────────────────
export async function uploadToImageKit(buffer, folderName) {
    const uuid = crypto.randomUUID();
    const fileName = `${uuid}.webp`;
    
    const fileData = await toFile(buffer, fileName, { type: 'image/webp' });
    
    return await imagekit.files.upload({
        file: fileData,
        fileName,
        folder: folderName,
        useUniqueFileName: false, // we already generate UUID
    });
}
