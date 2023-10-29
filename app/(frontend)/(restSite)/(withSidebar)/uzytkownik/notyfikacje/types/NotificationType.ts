export default interface NotificationType {
  id: string;
  addTime: Date;
  type: "BADGE" | "NEW_COMMENT" | "COMMENT_PIN";
  seen: boolean;
  author: {
    username: string | null;
  };
  post: {
    id: string;
    slug: string;
    title: string;
    memContainers: {
      type: string;
      data: string;
    }[];
  };
  commentId: string | null;
}
