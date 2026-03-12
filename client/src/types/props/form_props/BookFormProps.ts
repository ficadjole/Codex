import type { BookDetailsDto } from "../../../models/item/details/BookDetailsDto"
import type { AdminApiProps } from "../admin_add_item_props/AdminAddItemProps"

export type BookFormProps = AdminApiProps & {
  initialData?: BookDetailsDto
  isEdit?: boolean
}