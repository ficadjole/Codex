import { BlogPostType } from "../enums/BlogPostType";

export class BlogPost {
  constructor(
    public blogPostId: number = 0,
    public title: string = "",
    public imgUrl: string = "",
    public content: string = "",
    public postType: BlogPostType = BlogPostType.announcement,
    public publishDate: Date = new Date(),
    public userId: number = 0,
    public itemIds: number[] = []
  ) {}
}
