import type { ItemImageDto } from "../../../models/item/details/ItemImageDto"

export type ImageUploaderProps = {
    onChange: (files: File[], primaryIndex: number | null) => void
    initialImages?: ItemImageDto[]
}