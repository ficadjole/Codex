import axios from "axios";
import { r2StorageApi } from "../api_services/r2StorageApi/R2StorageApi";
import { optimizeImage } from "./optimizeImage";

export async function uploadFile(
  itemId: number,
  file: File,
  token: string,
  itemType: string,
) {
  let processedFile = file;

  if (file.type.startsWith("image/")) {
    processedFile = await optimizeImage(file);
  }

  const uploadData = await r2StorageApi.generateUrlForUpload(
    itemId,
    {
      fileName: processedFile.name,
      contentType: processedFile.type,
      itemType: itemType,
    },
    token,
  );

  const { uploadUrl, fileName } = uploadData;

  const res = await axios.put(uploadUrl, processedFile, {
    headers: {
      "Content-Type": processedFile.type,
    },
  });

  if (res === null) {
    return "";
  }

  return fileName;
}
