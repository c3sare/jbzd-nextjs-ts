"use client";

import { GiPerspectiveDiceSixFacesFour } from "@react-icons/all-files/gi/GiPerspectiveDiceSixFacesFour";
import MobileMenuLinkButton from "./MobileMenuLinkButton";
import { getRandomPost } from "@/app/actions/getRandomPost";
import { useRouter } from "next/navigation";

const MobileMenuRandomPostButton = () => {
  const router = useRouter();

  return (
    <MobileMenuLinkButton
      icon={GiPerspectiveDiceSixFacesFour}
      onClick={async () => {
        const post = await getRandomPost();

        if (post) router.push(`/obr/${post.id}/${post.slug}`);
      }}
    >
      Losowe
    </MobileMenuLinkButton>
  );
};

export default MobileMenuRandomPostButton;
