import axios from "axios";
import { r2StorageApi } from "../api_services/r2StorageApi/R2StorageApi";
import { optimizeImage } from "./optimizeImage";

export async function uploadImage(
  itemId: number,
  file: File,
  token: string,
  itemType: string,
) {
  const optimized = await optimizeImage(file);

  const uploadData = await r2StorageApi.generateUrlForUpload(
    itemId,
    {
      fileName: optimized.name,
      contentType: optimized.type,
      itemType: itemType,
    },
    token,
  );

  const { uploadUrl, fileName } = uploadData;

  const res = await axios.put(uploadUrl, optimized, {
    headers: {
      "Content-Type": optimized.type,
    },
  });

  if (res === null) {
    return "";
  }

  return fileName;
}
