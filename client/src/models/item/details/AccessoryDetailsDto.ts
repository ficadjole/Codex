import type { ItemDto } from "../ItemDto"
import type { ItemImageDto } from "./ItemImageDto"

export interface AccessoryDetailsDto extends ItemDto {
    content     : string
    images      : ItemImageDto[]
}