import { ItemType } from "../../enums/ItemType";

export class ItemDto {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public discountPercent?: number,
    public discountFrom?: Date,
    public discountTo?: Date,
    public imageUrl: string = "",
    public type?: ItemType,
    public description: string = "",
    public createdAt: Date = new Date(),
  ) {}
}

//ovo sluzi kada hocemo da prikazemo sve artikle bez detalja
//npr na pocetnoj strani ili u pretrazi
