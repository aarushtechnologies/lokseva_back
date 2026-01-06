const {
  S3Client,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME;

/**
 * Extract R2 object key from public URL
 * Example:
 * https://cdn.example.com/sales/123.jpg → sales/123.jpg
 */
function extractKeyFromUrl(url) {
  if (!url) return null;
  return decodeURIComponent(url.split("/").slice(-2).join("/"));
}

async function deleteFromR2(url) {
  const key = extractKeyFromUrl(url);
  if (!key) return;

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
  } catch (err) {
    console.error("❌ R2 delete failed:", key, err.message);
  }
}

module.exports = {
  deleteFromR2,
};
