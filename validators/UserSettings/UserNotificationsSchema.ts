import { z } from "zod";

const UserNotificationsSchema = z.object({
  newOrders: z.boolean().refine((data) => typeof data === "boolean"),
  newMarks: z.boolean().refine((data) => typeof data === "boolean"),
  commentsOnHomePage: z.boolean().refine((data) => typeof data === "boolean"),
  newComments: z.boolean().refine((data) => typeof data === "boolean"),
});

export default UserNotificationsSchema;

export type UserNotificationsType = z.infer<typeof UserNotificationsSchema>;
