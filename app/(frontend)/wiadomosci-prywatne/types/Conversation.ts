import { Message, Conversation as ConversationType } from "@prisma/client";
import UserType from "./UserType";

export default interface Conversation extends ConversationType {
  users: UserType[];
  messages: Message[];
}
