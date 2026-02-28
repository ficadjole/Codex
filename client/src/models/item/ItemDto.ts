export interface ItemDto {
    itemId          :   number,
    name            :   string,
    price           :   number,
    discountPercent ?:  number,
    discountFrom    ?:  string,
    discountTo      ?:  string,
    imageUrl        :   string,
    type            :   string,
    description     :   string,
    userId          :   number,
    createdAt       ?:  string,
}