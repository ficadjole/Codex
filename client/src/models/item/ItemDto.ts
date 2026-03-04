export interface ItemDto {
    itemId          :   number,
    name            :   string,
    price           :   number,
    discountPercent ?:  number,
    discountFrom    ?:  string,
    discountTo      ?:  string,
    type            :   string,
    description     :   string,
    createdAt       ?:  string,
    primaryImageUrl :   string
}