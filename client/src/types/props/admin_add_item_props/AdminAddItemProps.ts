import type { IGenreApiService } from "../../../api_services/genreApi/IGenreApiService";
import type { IItemApiService } from "../../../api_services/itemApi/IItemApiService";
import type { IItemImageApiService } from "../../../api_services/itemImageApi/IItemImageApiService";

export type AdminApiProps = {
  genreApi: IGenreApiService;
  itemApi: IItemApiService;
  itemImageApi: IItemImageApiService;
};
