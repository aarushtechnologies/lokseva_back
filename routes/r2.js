require("dotenv").config();
const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const router = express.Router();

/* ================================
   STEP 1: ENV VALIDATION
================================ */
if (
  !process.env.R2_ACCESS_KEY ||
  !process.env.R2_SECRET_KEY ||
  !process.env.R2_ACCOUNT_ID ||
  !process.env.R2_BUCKET_NAME ||
  !process.env.R2_PUBLIC_BASE
) {
  throw new Error("❌ Missing Cloudflare R2 environment variables");
}

/* ================================
   STEP 2: R2 S3 CLIENT
================================ */
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

/* ================================
   STEP 3: PRESIGNED URL API
================================ */
router.post("/presigned-urls", async (req, res) => {
  try {
    const { files } = req.body;

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const urls = [];

    for (const file of files) {
      const key = `sales/${Date.now()}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: file.type || "image/jpeg",
      });

      // 🔐 Signed upload URL (PUT)
      const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 900, // 15 minutes
      });

      // 🌍 Public URL (STORE THIS IN DB)
      const publicUrl = `${process.env.R2_PUBLIC_BASE}/${key}`;

      urls.push({
        key,
        uploadUrl,
        publicUrl,
      });
    }

    return res.json({ urls });
  } catch (err) {
    console.error("❌ Presigned URL error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
