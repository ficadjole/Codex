import { BlogPostType } from "../../enums/BlogPostType";
import { ItemDto } from "../artikal/ItemDto";

export class BlogPostDetailsDto {
  constructor(
    public blogPostId: number = 0,
    public title: string = "",
    public imgUrl: string = "",
    public content: string = "",
    public postType: BlogPostType = BlogPostType.announcement,
    public publishDate: Date = new Date(),
    public items: ItemDto[] = [],
    public author?: {
      authorId: number;
      firstName: string;
      lastName: string;
    }
  ) {}
}
