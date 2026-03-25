import { ItemImageDto } from "../itemImage/ItemImageDto";

export class AccessoryDetailsDto {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public discountPercent?: number,
    public discountFrom?: Date,
    public discountTo?: Date,
    public description: string = "",
    public content: string = "",
    public images: ItemImageDto[] = [],
  ) {}
}
