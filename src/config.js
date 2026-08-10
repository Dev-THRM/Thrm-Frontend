export const API_BASE_URL = 
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://thrmbackend.in";

/**
 * Resolves an image URL from the database to a working URL.
 *
 * Cases handled:
 *  1. Cloudinary URL → use as-is
 *  2. /images/... path → served by the frontend host directly (no prefix needed)
 *  3. thrmbackend.in/uploads/folder/file → rewrite to /api/uploads/ route
 *  4. Relative /uploads/ or /api/uploads/ path → prepend API_BASE_URL
 *  5. Any other absolute URL → use as-is
 */
export function getImageUrl(imageUrl) {
  if (!imageUrl) return "";

  // Cloudinary URLs — use as-is
  if (imageUrl.includes("res.cloudinary.com")) {
    return imageUrl;
  }

  // Frontend-hosted images (public/images/...) — served by the frontend host itself
  // Works on both localhost:5173 and thrmdigitalmarketing.in without any prefix
  if (imageUrl.startsWith("/images/")) {
    return imageUrl;
  }

  // Full thrmbackend.in URL with /uploads/ path — rewrite to /api/uploads/
  const backendUploadPattern = /^https?:\/\/thrmbackend\.in\/uploads\/([^/]+)\/(.+)$/;
  const backendMatch = imageUrl.match(backendUploadPattern);
  if (backendMatch) {
    return `${API_BASE_URL}/api/uploads/${backendMatch[1]}/${backendMatch[2]}`;
  }

  // Relative /uploads/folder/file path — rewrite to /api/uploads/
  const relativeUploadPattern = /^\/uploads\/([^/]+)\/(.+)$/;
  const relativeMatch = imageUrl.match(relativeUploadPattern);
  if (relativeMatch) {
    return `${API_BASE_URL}/api/uploads/${relativeMatch[1]}/${relativeMatch[2]}`;
  }

  // /api/uploads/ path — prepend API_BASE_URL
  if (imageUrl.startsWith("/api/uploads/")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  // Any other absolute URL — use as-is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Fallback
  return `${API_BASE_URL}${imageUrl}`;
}


