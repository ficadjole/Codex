import { ItemType } from "../../enums/ItemType";

export interface PresingedUrlDto {
  fileName: string;
  itemName: string;
  contentType: string;
  itemType: ItemType;
}
