const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const router = express.Router();

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

// Generate presigned URLs
router.post("/presigned-urls", async (req, res) => {
  try {
    const { files } = req.body; // [{ name, type }]

    if (!files || !files.length) {
      return res.status(400).json({ message: "No files provided" });
    }

    const urls = [];

    for (const file of files) {
      const key = `sales/${Date.now()}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: file.type,
      });

      const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 900,
      });

      urls.push({
        name: file.name,
        uploadUrl,
        publicUrl: `${process.env.R2_PUBLIC_URL}/${key}`,
      });
    }

    res.json({ urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
