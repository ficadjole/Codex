import { ItemType } from "../../enums/ItemType";

export interface PresingedUrlDto {
  itemId: number;
  fileName: string;
  contentType: string;
  itemType: ItemType;
}
