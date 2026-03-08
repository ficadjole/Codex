import type { ItemDto } from "../../../models/item/ItemDto";

export type ItemCardProps = {
    item: ItemDto;
    author?: string;
}