"use client";

import { useBlogContext } from "@/app/(frontend)/(blog)/_context/BlogContext";
import Box from "../Box";
import EmptyBoxElement from "../EmptyBoxElement";
import TagLink from "../../TagLink";
import TagListEditElement from "./TagListEditElement";
import { useState } from "react";
import { deleteTagAction } from "./_actions/deleteTagAction";

type BlockedTagListProps = {
  editable?: boolean;
};

const BlockedTagList: React.FC<BlockedTagListProps> = ({ editable }) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const {
    data: { actionedTags },
    method: { actionedTag },
  } = useBlogContext();

  const blockedTags = actionedTags.filter((item) => item.method === "BLOCK");

  const handleDeleteAction = async (id: string) => {
    setIsLoading(true);
    const data = await deleteTagAction(id);
    actionedTag.remove(data.id);
    setIsLoading(false);
  };

  return (
    <Box title="Czarna lista tagów">
      {blockedTags.length === 0 && (
        <EmptyBoxElement>Brak tagów odrzuconych</EmptyBoxElement>
      )}
      {blockedTags.map((action) =>
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

export default BlockedTagList;
