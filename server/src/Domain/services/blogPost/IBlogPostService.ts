import { BlogPostDetailsDto } from "../../DTOs/blogPost/BlogPostDetailsDto";
import { BlogPostDto } from "../../DTOs/blogPost/BlogPostListDto";
import { BlogPostType } from "../../enums/BlogPostType";
import { BlogPost } from "../../models/BlogPost";

export interface IBlogPostService {
  addBlogPost(newBlogPost: BlogPost): Promise<BlogPostDetailsDto>;

  updateBlogPost(updatedBlogPost: BlogPost): Promise<BlogPostDetailsDto>;

  deleteBlogPost(blogPostId: number): Promise<boolean>;

  getAllBlogPosts(): Promise<BlogPostDto[]>;

  getBlogPostById(blogPostId: number): Promise<BlogPostDetailsDto>;

  getBlogPostsByType(postType: BlogPostType): Promise<BlogPostDto[]>;
}
