import { Accessories } from "../models/Accessories";

export interface IAccessoryRepository {
  create(accesory: Accessories): Promise<Accessories>;
  update(accesory: Accessories): Promise<Accessories>;
  getById(itemId: number): Promise<Accessories>;
}
