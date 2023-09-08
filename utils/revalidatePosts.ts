import { Category, Post, Tag, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

type PostType = Post & {
  tags: Tag[];
  category: Category & {
    parent: Category | null;
  };
  author: User;
};

export default function revalidatePosts(post: PostType) {
  revalidatePath(`/obr/${post.id}/${post.slug}`);
  revalidatePath(`/${post.category.slug}`);
  if (post.category.parent) {
    revalidatePath(`/${post.category.parent.slug}`);
  }
  if (post.accepted) {
    revalidatePath("/");
  } else {
    revalidatePath("/oczekujace");
  }

  revalidatePath("/ulubione");

  revalidatePath(`/${post.author.username}`);

  post.tags.forEach((tag) => {
    revalidatePath(`/tag/${tag.id}/${tag.slug}`);
  });
}
