import imageCompression from "browser-image-compression";

export async function optimizeImage(file: File) {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
  };

  return await imageCompression(file, options);
}
