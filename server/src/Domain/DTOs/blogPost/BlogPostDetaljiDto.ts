import { TipBlogPosta } from "../../enums/TipBlogPosta";
import { ArtikalDto } from "../artikal/ArtikalDto";

export class BlogPostDetaljiDto {
  public constructor(
    public blog_post_id: number = 0,
    public naslov: string = "",
    public slika_url: string = "",
    public sadrzaj: string = "",
    public tipPosta: TipBlogPosta = TipBlogPosta.obavestenje,
    public datumKreiranja: Date = new Date(),
    public artikli: ArtikalDto[] = [],
    public autor?: {
      autor_id: number;
      ime: string;
      prezime: string;
    }
  ) {}
}
