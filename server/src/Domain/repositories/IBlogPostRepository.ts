import { BlogPostType } from "../enums/BlogPostType";
import { BlogPost } from "../models/BlogPost";

export interface IBlogPostRepository {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost>;
  getBlogPostsByType(tip: BlogPostType): Promise<BlogPost[]>;
  createBlogPost(blogPost: BlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: BlogPost): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<boolean>;
}
