import { BlogPostType } from "../enums/BlogPostType";
import { BlogPost } from "../models/BlogPost";

export interface IBlogPostRepository {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost>;
  getBlogPostsByType(tip: BlogPostType): Promise<BlogPost[]>;
  createBlogPost(blogPost: any): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: any): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<boolean>;
}
