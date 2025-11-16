import { TipBlogPosta } from "../enums/TipBlogPosta";

export class BlogPost {
  constructor(
    public blog_post_id: number = 0,
    public naslov: string = "",
    public slika_url: string = "",
    public opis: string = "",
    public tipPosta: TipBlogPosta = TipBlogPosta.obavestenja,
    public datum_objave: Date = new Date(),
    public admin_id: number = 0
  ) {}
}
