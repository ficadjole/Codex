import { BlogPostDetailsDto } from "../../Domain/DTOs/blogPost/BlogPostDetailsDto";
import { BlogPostDto } from "../../Domain/DTOs/blogPost/BlogPostListDto";
import { BlogPostType } from "../../Domain/enums/BlogPostType";
import { BlogPost } from "../../Domain/models/BlogPost";
import { IItemRepository } from "../../Domain/repositories/IItemRepository";
import { IBlogPostRepository } from "../../Domain/repositories/IBlogPostRepository";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IBlogPostService } from "../../Domain/services/blogPost/IBlogPostService";
import { IBlogPostItemRepository } from "../../Domain/repositories/IBlogPostItemRepository";
import { ItemDto } from "../../Domain/DTOs/article/ItemDto";

export class BlogPostService implements IBlogPostService {
  constructor(
    private blogPostRepository: IBlogPostRepository,
    private blogPostItemRepository: IBlogPostItemRepository,
    private itemRepository: IItemRepository,
    private userRepository: IUserRepository
  ) {}

  async addBlogPost(newBlogPost: BlogPost): Promise<BlogPostDetailsDto> {
    const createdBlogPost = await this.blogPostRepository.createBlogPost(
      newBlogPost
    );

    if (createdBlogPost.blogPostId === 0) return new BlogPostDetailsDto();

    // Add entries in the linking table
    for (let i = 0; i < newBlogPost.itemIds.length; i++) {
      const link = await this.blogPostItemRepository.addBlogPostItem(
        createdBlogPost.blogPostId,
        newBlogPost.itemIds[i]
      );

      if (link.itemId === 0 || link.blogPostId === 0) {
        return new BlogPostDetailsDto();
      }
    }

    return this.mapToDTO(createdBlogPost, newBlogPost.itemIds);
  }

  async updateBlogPost(
    updatedBlogPost: BlogPost
  ): Promise<BlogPostDetailsDto> {
    const existingBlogPost = await this.blogPostRepository.getBlogPostById(
      updatedBlogPost.blogPostId
    );

    if (existingBlogPost.blogPostId === 0) return new BlogPostDetailsDto();

    const blogPostUpdated = await this.blogPostRepository.updateBlogPost(
      existingBlogPost.blogPostId,
      updatedBlogPost
    );

    if (blogPostUpdated.blogPostId === 0) return new BlogPostDetailsDto();

    // Delete all existing links and update
    await this.blogPostItemRepository.deleteAllItemsFromBlog(
      existingBlogPost.blogPostId
    );

    for (let i = 0; i < updatedBlogPost.itemIds.length; i++) {
      const link = await this.blogPostItemRepository.addBlogPostItem(
        updatedBlogPost.blogPostId,
        updatedBlogPost.itemIds[i]
      );

      if (link.itemId === 0 || link.blogPostId === 0) {
        return new BlogPostDetailsDto();
      }
    }

    return this.mapToDTO(blogPostUpdated, updatedBlogPost.itemIds);
  }

  async deleteBlogPost(blogPostId: number): Promise<boolean> {
    const existingBlogPost = await this.blogPostRepository.getBlogPostById(
      blogPostId
    );

    if (existingBlogPost.blogPostId === 0) return false;

    return this.blogPostRepository.deleteBlogPost(blogPostId);
  }

  async getAllBlogPosts(): Promise<BlogPostDto[]> {
    const allBlogPosts: BlogPost[] =
      await this.blogPostRepository.getAllBlogPosts();

    return allBlogPosts.map(
      (blogPost) =>
        new BlogPostDto(
          blogPost.blogPostId,
          blogPost.title,
          blogPost.imgUrl,
          blogPost.content,
          blogPost.postType,
          blogPost.publishDate
        )
    );
  }

  async getBlogPostById(blogPostId: number): Promise<BlogPostDetailsDto> {
    const existingBlogPost = await this.blogPostRepository.getBlogPostById(
      blogPostId
    );

    if (existingBlogPost.blogPostId === 0) return new BlogPostDetailsDto();

    const blogPostItems =
      await this.blogPostItemRepository.getAllByBlogPostId(blogPostId);

    const itemIds: number[] = blogPostItems.map((item) => item.itemId);

    return this.mapToDTO(existingBlogPost, itemIds);
  }

  async getBlogPostsByType(postType: BlogPostType): Promise<BlogPostDto[]> {
    const postsByType: BlogPost[] =
      await this.blogPostRepository.getBlogPostsByType(postType);

    return postsByType.map(
      (blogPost) =>
        new BlogPostDto(
          blogPost.blogPostId,
          blogPost.title,
          blogPost.imgUrl,
          blogPost.content,
          blogPost.postType,
          blogPost.publishDate
        )
    );
  }

  private async mapToDTO(
    blogPost: BlogPost,
    itemIds: number[]
  ): Promise<BlogPostDetailsDto> {
    const author = await this.userRepository.getById(blogPost.userId);

    const items: ItemDto[] = [];

    for (let i = 0; i < itemIds.length; i++) {
      const item = await this.itemRepository.getById(itemIds[i]);

      if (item.itemId !== 0) {
        items.push(
          new ItemDto(
            item.itemId,
            item.name,
            item.price,
            item.imageUrl,
            item.type,
            item.createdAt
          )
        );
      }
    }

    return new BlogPostDetailsDto(
      blogPost.blogPostId,
      blogPost.title,
      blogPost.imgUrl,
      blogPost.content,
      blogPost.postType,
      blogPost.publishDate,
      items,
      {
        authorId: author.userId,
        firstName: author.firstName,
        lastName: author.lastName,
      }
    );
  }
}
