import { BlogPostArtikal } from "../models/BlogPostArtikal";

export interface IBlogPostArtikalRepository {
  dodajBlogPostArtikal(
    blog_post_id: number,
    artikal_id: number
  ): Promise<BlogPostArtikal>;
  obrisiBlogPostArtikal(
    blog_post_id: number,
    artikal_id: number
  ): Promise<boolean>;
  getByIds(blog_post_id: number, artikal_id: number): Promise<BlogPostArtikal>;
  getAllPoBlogPostId(blog_post_id: number): Promise<BlogPostArtikal[]>;
}
