export interface ItemDto {
    itemId      
    :       number,
    name        :       string,
    price       :       number,
    imageUrl    : string,
    public type?: ItemType,
    public createdAt: Date = new Date()
}