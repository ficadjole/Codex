import { BlogPostItem } from "../models/BlogPostItem";

export interface IBlogPostItemRepository {
  addBlogPostItem(
    blogPostId: number,
    itemId: number
  ): Promise<BlogPostItem>;

  deleteBlogPostItem(
    blogPostId: number,
    itemId: number
  ): Promise<boolean>;

  deleteAllItemsFromBlog(blogPostId: number): Promise<boolean>;

  getByIds(blogPostId: number, itemId: number): Promise<BlogPostItem>;

  getAllByBlogPostId(blogPostId: number): Promise<BlogPostItem[]>;
}
