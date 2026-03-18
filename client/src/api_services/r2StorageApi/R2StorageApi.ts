import axios from "axios";
import type { IR2StorageApi } from "./IR2StorageApi";
import type { PresingedUrlDto } from "../../models/r2/PresingedUrlDto";
import type { PresignedUrlResult } from "../../types/r2/PresignedUrlResult";

const API_URL: string = import.meta.env.VITE_API_URL + "r2";

export const r2StorageApi: IR2StorageApi = {
  generateUrlForUpload: async function (
    itemId: number,
    presignedUrlDto: PresingedUrlDto,
    token: string,
  ): Promise<PresignedUrlResult> {
    try {
      const res = await axios.post(`${API_URL}/${itemId}`, presignedUrlDto, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch {
      return { uploadUrl: "", fileName: "" };
    }
  },
};
