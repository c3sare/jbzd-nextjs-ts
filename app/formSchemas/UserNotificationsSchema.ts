import { z } from "zod";

const UserNotificationsSchema = z.object({
  newOrders: z.boolean(),
  newMarks: z.boolean(),
  commentsOnHomePage: z.boolean(),
  newComments: z.boolean(),
});

export default UserNotificationsSchema;

export type UserNotificationsType = z.infer<typeof UserNotificationsSchema>;
