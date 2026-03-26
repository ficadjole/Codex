import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3 from "../connections/s3_client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { IR2StorageService } from "../../Domain/services/R2/IR2StorageService";
import { PresingedUrlDto } from "../../Domain/DTOs/r2/PresignedUrlDto";
import { PresignedUrlResult } from "../../Domain/types/PresignedUrlResult";

export class R2StorageService implements IR2StorageService {
  generateFileName(fileName: string, contentType: string): string {
    const slug = fileName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const timestamp = Date.now();

    const random = Math.random().toString(36).substring(2, 8);

    const ext = contentType.split("/")[1];

    return `${slug}-${timestamp}-${random}.${ext}`;
  }

  keyGenerator(dto: PresingedUrlDto, slug: string): string {
    const itemNameFormatted = dto.itemName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (dto.contentType.includes("pdf")) {
      return `items/${dto.itemType}/${itemNameFormatted}/pdf/${slug}`;
    }

    return `items/${dto.itemType}/${itemNameFormatted}/images/${slug}`;
  }

  async generateUrlForUpload(
    dto: PresingedUrlDto,
  ): Promise<PresignedUrlResult> {
    const slug = this.generateFileName(dto.fileName, dto.contentType);

    const key = this.keyGenerator(dto, slug);

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

  getKeyFromUrl(dataUrl: string): string {
    return dataUrl.replace("https://cdn.dekaton.rs/", "").trim();
  }

  async deleteData(dataUrl: string): Promise<boolean> {
    const key = this.getKeyFromUrl(dataUrl);

    const result = await S3.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET as string,
        Key: key,
      }),
    );

    if (
      result.$metadata.httpStatusCode! < 300 &&
      result.$metadata.httpStatusCode! >= 200
    ) {
      return true;
    } else {
      return false;
    }
  }
}
