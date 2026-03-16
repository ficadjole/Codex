export type ItemType = "knjiga" | "aksesoar"

export interface ItemDto {
    itemId          ?:   number,
    name            :   string,
    price           :   number,
    discountPercent ?:  number | null,
    discountFrom    ?:  string,
    discountTo      ?:  string,
    type            :   ItemType,
    description     :   string,
    createdAt       ?:  string,
    primaryImageUrl :   string
}