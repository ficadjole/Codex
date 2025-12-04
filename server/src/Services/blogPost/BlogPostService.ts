import { ArtikalDto } from "../../Domain/DTOs/artikal/ArtikalDto";
import { BlogPostDetaljiDto } from "../../Domain/DTOs/blogPost/BlogPostDetaljiDto";
import { BlogPostDto } from "../../Domain/DTOs/blogPost/BlogPostListDto";
import { TipBlogPosta } from "../../Domain/enums/TipBlogPosta";
import { BlogPost } from "../../Domain/models/BlogPost";
import { IArtikalRepository } from "../../Domain/repositories/IItemRepository";
import { IBlogPostArtikalRepository } from "../../Domain/repositories/IBlogPostArtikalRepository";
import { IBlogPostRepository } from "../../Domain/repositories/IBlogPostRepository";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IBlogPostService } from "../../Domain/services/blogPost/IBlogPostService";

export class BlogPostService implements IBlogPostService {
  public constructor(
    private blogPostRepository: IBlogPostRepository,
    private blogPostArtikalRepository: IBlogPostArtikalRepository,
    private artikalRepository: IArtikalRepository,
    private korisnikRepository: IUserRepository
  ) {}

  async dodajBlogPost(noviBlogPost: BlogPost): Promise<BlogPostDetaljiDto> {
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

      if (dodatPoveznik.artikal_id === 0 || dodatPoveznik.blog_post_id === 0) {
        return new BlogPostDetaljiDto();
      }
    }

    //ako je sve dobro proslo vracamo ceo dto nazad

    return this.mapToDTO(dodatBlogPost, noviBlogPost.artikal_id);
  }

  async izmeniBlogPost(
    izmenjeniBlogPost: BlogPost
  ): Promise<BlogPostDetaljiDto> {
    const postojeciBlogPost = await this.blogPostRepository.getBlogPostById(
      izmenjeniBlogPost.blog_post_id
    );

    if (postojeciBlogPost.blog_post_id === 0) return new BlogPostDetaljiDto();

    const azuriraniBlogPost = await this.blogPostRepository.updateBlogPost(
      postojeciBlogPost.blog_post_id,
      izmenjeniBlogPost
    );

    if (azuriraniBlogPost.blog_post_id === 0) return new BlogPostDetaljiDto();

    const blogPostArtikli =
      await this.blogPostArtikalRepository.getAllPoBlogPostId(
        postojeciBlogPost.blog_post_id
      );

    //prvo cu obrisati sve pa cu azurirati

    const obrisano = await this.blogPostArtikalRepository.obrisiSveArtikleBloga(
      postojeciBlogPost.blog_post_id
    );

    if (izmenjeniBlogPost.artikal_id.length !== 0) {
      for (var i = 0; i < izmenjeniBlogPost.artikal_id.length; i++) {
        const dodato =
          await this.blogPostArtikalRepository.dodajBlogPostArtikal(
            izmenjeniBlogPost.blog_post_id,
            izmenjeniBlogPost.artikal_id[i]
          );

        if (dodato.artikal_id === 0 || dodato.blog_post_id === 0) {
          return new BlogPostDetaljiDto();
        }
      }
    }

    return this.mapToDTO(azuriraniBlogPost, izmenjeniBlogPost.artikal_id);
  }

  async obrisiBlogPost(blog_post_id: number): Promise<boolean> {
    const postojeciBlogPost = await this.blogPostRepository.getBlogPostById(
      blog_post_id
    );

    if (postojeciBlogPost.blog_post_id === 0) return false;

    return await this.blogPostRepository.deleteBlogPost(blog_post_id);
  }

  async getAllBlogPostovi(): Promise<BlogPostDto[]> {
    const blogPostovi: BlogPost[] =
      await this.blogPostRepository.getAllBlogPosts();

    return blogPostovi.map(
      (blogPost) =>
        new BlogPostDto(
          blogPost.blog_post_id,
          blogPost.naslov,
          blogPost.slika_url,
          blogPost.sadrzaj,
          blogPost.tipPosta,
          blogPost.datum_objave
        )
    );
  }

  async getBlogPostById(blog_post_id: number): Promise<BlogPostDetaljiDto> {
    const postojeciBlogPost = await this.blogPostRepository.getBlogPostById(
      blog_post_id
    );

    if (postojeciBlogPost.blog_post_id === 0) return new BlogPostDetaljiDto();

    const blogPostArtikli =
      await this.blogPostArtikalRepository.getAllPoBlogPostId(blog_post_id);

    const artikli: number[] = blogPostArtikli.map(
      (artikal) => artikal.artikal_id
    );

    return this.mapToDTO(postojeciBlogPost, artikli);
  }

  async getBlogPostByTip(tipPosta: TipBlogPosta): Promise<BlogPostDto[]> {
    const blogoviPoTipu: BlogPost[] =
      await this.blogPostRepository.getBlogPostsPoTipu(tipPosta);

    return blogoviPoTipu.map(
      (blogPost) =>
        new BlogPostDto(
          blogPost.blog_post_id,
          blogPost.naslov,
          blogPost.slika_url,
          blogPost.sadrzaj,
          blogPost.tipPosta,
          blogPost.datum_objave
        )
    );
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
        autor_id: autor.userId,
        ime: autor.username,
        prezime: autor.lastName,
      }
    );
  }
}
