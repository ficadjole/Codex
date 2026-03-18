import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3 from "../connections/s3_client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { IR2StorageService } from "../../Domain/services/R2/IR2StorageService";
import { PresingedUrlDto } from "../../Domain/DTOs/r2/PresignedUrlDto";
import { PresignedUrlResult } from "../../Domain/types/PresignedUrlResult";

export class R2StorageService implements IR2StorageService {
  generateFileName(fileName: string, ext: string): string {
    const slug = fileName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const timestamp = Date.now();

    const random = Math.random().toString(36).substring(2, 8);

    return `${slug}-${timestamp}-${random}.${ext}`;
  }

  async generateUrlForUpload(
    dto: PresingedUrlDto,
  ): Promise<PresignedUrlResult> {
    const slug = this.generateFileName(dto.fileName, dto.contentType);

    const key = `items/${dto.itemType}/${dto.itemId}/${slug}`;

    const newPutUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET as string,
        Key: key,
        ContentType: dto.contentType,
      }),
      { expiresIn: 3600 },
    );

    return {
      uploadUrl: newPutUrl,
      fileName: `${process.env.R2_PUBLIC_CDN_URL}/${key}`,
    };
  }
}
