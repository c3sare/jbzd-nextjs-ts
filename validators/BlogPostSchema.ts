import { z } from "zod";

const BlogPostSchema = z.object({
  message: z
    .string({
      invalid_type_error: "Nieprawidłowo uzupełnione pole!",
      required_error: "Pole opis jest wymagane.",
    })
    .trim()
    .max(500, "Wpis jest za długi!")
    .min(1, "Pole opis jest wymagane."),
  adultContent: z.boolean(),
});

export default BlogPostSchema;
