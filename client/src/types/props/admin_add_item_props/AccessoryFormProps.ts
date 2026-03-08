import type { IItemApiService } from "../../../api_services/itemApi/IItemApiService"
import type { IItemImageApiService } from "../../../api_services/itemImageApi/IItemImageApiService"

export type AccessoryFormProps = {
    itemApi: IItemApiService
    itemImageApi: IItemImageApiService
}