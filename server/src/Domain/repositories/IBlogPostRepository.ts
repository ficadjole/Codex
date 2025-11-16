import { TipBlogPosta } from "../enums/TipBlogPosta";
import { BlogPost } from "../models/BlogPost";

export interface IBlogPostRepository {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost>;
  getBlogPostsPoTipu(tip: TipBlogPosta): Promise<BlogPost[]>;
  createBlogPost(blogPost: any): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: any): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<boolean>;
}
