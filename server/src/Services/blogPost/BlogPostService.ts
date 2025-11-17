import { ArtikalDto } from "../../Domain/DTOs/artikal/ArtikalDto";
import { BlogPostDetaljiDto } from "../../Domain/DTOs/blogPost/BlogPostDetaljiDto";
import { BlogPostDto } from "../../Domain/DTOs/blogPost/BlogPostListDto";
import { TipBlogPosta } from "../../Domain/enums/TipBlogPosta";
import { BlogPost } from "../../Domain/models/BlogPost";
import { IArtikalRepository } from "../../Domain/repositories/IArtikalRepository";
import { IBlogPostArtikalRepository } from "../../Domain/repositories/IBlogPostArtikalRepository";
import { IBlogPostRepository } from "../../Domain/repositories/IBlogPostRepository";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IBlogPostService } from "../../Domain/services/blogPost/IBlogPostService";

export class BlogPostService implements IBlogPostService {
  public constructor(
    private blogPostRepository: IBlogPostRepository,
    private blogPostArtikalRepository: IBlogPostArtikalRepository,
    private artikalRepository: IArtikalRepository,
    private korisnikRepository: IKorisnikRepository
  ) {}

  async dodajBlogPost(noviBlogPost: BlogPost): Promise<BlogPostDetaljiDto> {
    try {
      const dodatBlogPost = await this.blogPostRepository.createBlogPost(
        noviBlogPost
      );

      if (dodatBlogPost.blog_post_id === 0) return new BlogPostDetaljiDto();

      //sada trebam dodati podatke u poveznu tabelu

      for (var i = 0; i < noviBlogPost.artikal_id.length; i++) {
        const dodatPoveznik =
          await this.blogPostArtikalRepository.dodajBlogPostArtikal(
            dodatBlogPost.blog_post_id,
            noviBlogPost.artikal_id[i]
          );

        if (
          dodatPoveznik.artikal_id === 0 ||
          dodatPoveznik.blog_post_id === 0
        ) {
          return new BlogPostDetaljiDto();
        }
      }

      //ako je sve dobro proslo vracamo ceo dto nazad

      return this.mapToDTO(dodatBlogPost, noviBlogPost.artikal_id);
    } catch {
      return new BlogPostDetaljiDto();
    }
  }
  async izmeniBlogPost(
    izmenjeniBlogPost: BlogPost
  ): Promise<BlogPostDetaljiDto> {
    throw new Error("Method not implemented.");
  }
  async obrisiBlogPost(blog_post_id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getAllBlogPostovi(): Promise<BlogPostDto[]> {
    throw new Error("Method not implemented.");
  }
  async getBlogPostById(blog_post_id: number): Promise<BlogPostDetaljiDto> {
    throw new Error("Method not implemented.");
  }
  async getBlogPostByTip(tipPosta: TipBlogPosta): Promise<BlogPostDto[]> {
    throw new Error("Method not implemented.");
  }

  private async mapToDTO(
    dodatBlogPost: BlogPost,
    artikal_id: number[]
  ): Promise<BlogPostDetaljiDto> {
    const autor = await this.korisnikRepository.getById(dodatBlogPost.admin_id);

    const artikli: ArtikalDto[] = [];

    for (var i = 0; i < artikal_id.length; i++) {
      const artikal = await this.artikalRepository.getByArtikalId(
        artikal_id[i]
      );

      if (artikal.artikal_id !== 0) {
        artikli.push(
          new ArtikalDto(
            artikal.artikal_id,
            artikal.naziv,
            artikal.cena,
            artikal.slika_url,
            artikal.tip,
            artikal.datumKreiranja
          )
        );
      }
    }

    return new BlogPostDetaljiDto(
      dodatBlogPost.blog_post_id,
      dodatBlogPost.naslov,
      dodatBlogPost.slika_url,
      dodatBlogPost.sadrzaj,
      dodatBlogPost.tipPosta,
      dodatBlogPost.datum_objave,
      artikli,
      {
        autor_id: autor.korisnik_id,
        ime: autor.ime,
        prezime: autor.prezime,
      }
    );
  }
}
