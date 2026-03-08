import type { ItemDto } from "../../../models/item/ItemDto";

export type ItemCarouselProps = {
    items: ItemDto[];
    visibleCount: number;
}