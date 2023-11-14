"use client";

import { useBlogContext } from "@/app/(frontend)/(blog)/_context/BlogContext";
import Box from "../Box";
import EmptyBoxElement from "../EmptyBoxElement";
import TagLink from "../../TagLink";
import axios from "axios";
import { useState } from "react";
import TagListEditElement from "./TagListEditElement";
import toast from "react-hot-toast";

type FollowedTagListProps = {
  editable?: boolean;
};

const FollowedTagList: React.FC<FollowedTagListProps> = ({ editable }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    data: { actionedTags },
    method: { actionedTag },
  } = useBlogContext();

  const followedTags = actionedTags.filter((item) => item.method === "FOLLOW");

  const handleDeleteAction = (id: string) => {
    setIsLoading(true);
    axios
      .delete(`/api/blog/tag/action/${id}`)
      .then((res) => res.data)
      .then((data) => {
        actionedTag.remove(data.id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box title="Obserwowane tagi">
      {followedTags.length === 0 && (
        <EmptyBoxElement>Brak tagów obserwowanych</EmptyBoxElement>
      )}
      {followedTags.map((action) =>
        editable ? (
          <TagListEditElement
            key={action.tag.id}
            name={action.tag.name}
            slug={action.tag.slug}
            onClick={() => handleDeleteAction(action.id)}
            disabled={isLoading}
          />
        ) : (
          <TagLink
            key={action.tag.id}
            name={action.tag.name}
            slug={action.tag.slug}
            count={action.tag._count.posts}
          />
        )
      )}
    </Box>
  );
};

export default FollowedTagList;
