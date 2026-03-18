import type { PresingedUrlDto } from "../../models/r2/PresingedUrlDto";
import type { PresignedUrlResult } from "../../types/r2/PresignedUrlResult";

export interface IR2StorageApi {
  generateUrlForUpload(
    itemId: number,
    presignedUrlDto: PresingedUrlDto,
    token: string,
  ): Promise<PresignedUrlResult>;
}
