"use client";

import { getRandomPost } from "@/actions/serverActions/getRandomPost";
import MenuButton from "../../MenuButton";
import { useRouter } from "next/navigation";

const RandomPostButton = () => {
  const router = useRouter();

  return (
    <MenuButton
      className="lg:flex"
      onClick={async () => {
        const post = await getRandomPost();

        if (post) router.push(`/obr/${post.id}/${post.slug}`);
      }}
    >
      Losowe
    </MenuButton>
  );
};

export default RandomPostButton;
