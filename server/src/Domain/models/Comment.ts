export class Comment {
  public constructor(
    public commentId: number = 0,
    public blogPostId: number = 0,
    public userId: number = 0,
    public commentText: string = "",
    public dateCreated: Date = new Date(1944, 6, 6)
  ) {}
}
