export class ItemImageDto {
  constructor(
    public imageId: number = 0,
    public imageUrl: string = "",
    public isPrimary: boolean = false,
    public sortOrder: number = 0,
  ) {}
}