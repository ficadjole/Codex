import { Accessories } from "../models/Accessories";

export interface IAccessoryRepository {
  create(aksesoar: Accessories): Promise<Accessories>;
  update(aksesoar: Accessories): Promise<Accessories>;
  getById(itemId: number): Promise<Accessories>;
}
