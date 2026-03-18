import { PresingedUrlDto } from "../../DTOs/r2/PresignedUrlDto";
import { PresignedUrlResult } from "../../types/PresignedUrlResult";

export interface IR2StorageService {
  generateUrlForUpload(dto: PresingedUrlDto): Promise<PresignedUrlResult>;
}
