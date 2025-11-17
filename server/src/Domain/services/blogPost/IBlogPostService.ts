import { BlogPostDetaljiDto } from "../../DTOs/blogPost/BlogPostDetaljiDto";
import { BlogPostDto } from "../../DTOs/blogPost/BlogPostListDto";
import { TipBlogPosta } from "../../enums/TipBlogPosta";
import { BlogPost } from "../../models/BlogPost";

export interface IBlogPostService {
  dodajBlogPost(noviBlogPost: BlogPost): Promise<BlogPostDetaljiDto>;

  izmeniBlogPost(izmenjeniBlogPost: BlogPost): Promise<BlogPostDetaljiDto>;

  obrisiBlogPost(blog_post_id: number): Promise<boolean>;

  getAllBlogPostovi(): Promise<BlogPostDto[]>;

  getBlogPostById(blog_post_id: number): Promise<BlogPostDetaljiDto>;

  getBlogPostByTip(tipPosta: TipBlogPosta): Promise<BlogPostDto[]>;
}
