import { TipBlogPosta } from "../../enums/TipBlogPosta";
import { ArtikalDto } from "../artikal/ArtikalDto";

export class BlogPostDto {
  public constructor(
    public blog_post_id: number = 0,
    public naslov: string = "",
    public slika_url: string = "",
    public sadrzaj: string = "",
    public tipPosta: TipBlogPosta = TipBlogPosta.obavestenja,
    public datumKreiranja: Date = new Date()
  ) {}
}
