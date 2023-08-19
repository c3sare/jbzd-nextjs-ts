"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbCalendarEvent } from "react-icons/tb";
import { BiFilter } from "react-icons/bi";
import IconButton from "./IconButton";
import CreatePostForm from "./forms/CreatePostForm";
import PostsDateFilterForm from "./forms/PostsDateFilterForm";
import PostsTypeFilterForm from "./forms/PostsTypeFilterForm";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

type PostsPageHeaderProps = {
  isPremium: boolean;
  categories: (Category & {
    children: Category[];
  })[];
};

const PostsPageHeader: React.FC<PostsPageHeaderProps> = ({
  isPremium,
  categories,
}) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const [currentForm, setCurrentForm] = useState<number>(0);

  useEffect(() => {
    setCurrentForm(0);
  }, [params, pathname]);

  const closeForms = () => setCurrentForm(0);

  const componentsToSwitch = [
    null,
    <CreatePostForm key={1} onClose={closeForms} categories={categories} />,
    <PostsDateFilterForm key={2} onClose={closeForms} />,
    <PostsTypeFilterForm isPremium={isPremium} key={3} onClose={closeForms} />,
  ];

  const handleSetForm = (index: number) => {
    setCurrentForm(currentForm === index ? 0 : index);
  };

  return (
    <>
      <div className="max-w-[600px] flex gap-[10px_5px] flex-wrap sm:flex-nowrap">
        <IconButton
          startIcon={<AiOutlinePlus />}
          variant="secondary"
          onClick={() => handleSetForm(1)}
        >
          Dodaj dzidę
        </IconButton>
        <IconButton
          startIcon={<TbCalendarEvent />}
          onClick={() => handleSetForm(2)}
          active={currentForm === 2}
        >
          Top+
        </IconButton>
        <IconButton
          startIcon={<BiFilter />}
          onClick={() => handleSetForm(3)}
          active={currentForm === 3}
        >
          Filtruj
        </IconButton>
      </div>
      <div className="full-w relative">{componentsToSwitch[currentForm]}</div>
    </>
  );
};

export default PostsPageHeader;
