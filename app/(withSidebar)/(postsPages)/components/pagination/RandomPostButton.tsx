"use client";

import { getRandomPost } from "@/app/actions/serverActions/getRandomPost";
import { GiDiceSixFacesTwo } from "@react-icons/all-files/gi/GiDiceSixFacesTwo";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

type RandomPostButtonProps = {
  className?: HTMLAttributes<HTMLButtonElement>["className"];
};

const RandomPostButton: React.FC<RandomPostButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <button
      className={className}
      onClick={async () => {
        const post = await getRandomPost();

        if (post) router.push(`/obr/${post.id}/${post.slug}`);
      }}
    >
      <GiDiceSixFacesTwo />
    </button>
  );
};

export default RandomPostButton;
