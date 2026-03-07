import type { IGenreApiService } from "../../../api_services/genreApi/IGenreApiService"
import type { IItemApiService } from "../../../api_services/itemApi/IItemApiService"

export interface AdminApiProps {
    genreApi: IGenreApiService
    itemApi: IItemApiService
}