import { z } from "zod";

const UserPremiumSchema = z.object({
  picsCountOnPage: z
    .number()
    .int()
    .refine((data) => [8, 16, 32].includes(data)),
  adminPostsOff: z.boolean().refine((data) => typeof data === "boolean"),
  commentsPicsGifsOff: z.boolean().refine((data) => typeof data === "boolean"),
  hideNegativeComments: z.boolean().refine((data) => typeof data === "boolean"),
  hideAds: z.boolean().refine((data) => typeof data === "boolean"),
  hideProfile: z.boolean().refine((data) => typeof data === "boolean"),
  hidePremiumIcon: z.boolean().refine((data) => typeof data === "boolean"),
  hideLowReputationComments: z
    .boolean()
    .refine((data) => typeof data === "boolean"),
});

export default UserPremiumSchema;

export type UserPremiumType = z.infer<typeof UserPremiumSchema>;
