export class CommentDto {
  public constructor(
    public commentId: number = 0,
    public commentText: string = "",
    public dateCreated: Date = new Date(),
    public author?: {
      userId: number;
      username: string;
    }
  ) {}
}
