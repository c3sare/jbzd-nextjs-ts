"use client";

import type { Category } from "@prisma/client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import CreatePostForm from "./forms/CreatePostForm";
import PostsDateFilterForm from "./forms/PostsDateFilterForm";
import PostsTypeFilterForm from "./forms/PostsTypeFilterForm";
import IconButton from "./IconButton";

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { RiCalendarEventFill } from "@react-icons/all-files/ri/RiCalendarEventFill";
import { BiFilter } from "@react-icons/all-files/bi/BiFilter";
import { toast } from "react-hot-toast";

type PostsPageHeaderProps = {
  isPremium: boolean;
  categories: (Category & {
    children: Category[];
  })[];
  isLoggedIn: boolean;
  children?: React.ReactNode;
};

const PostsPageHeader: React.FC<PostsPageHeaderProps> = ({
  isPremium,
  categories,
  isLoggedIn,
  children,
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
      <div className="md:ml-[45px] max-w-[600px] flex flex-wrap justify-between">
        <div className="flex gap-[10px_5px] flex-wrap sm:flex-nowrap">
          <IconButton
            startIcon={<AiOutlinePlus />}
            variant="secondary"
            onClick={() => {
              if (isLoggedIn) handleSetForm(1);
              else toast.error("Musisz się zalogować!");
            }}
          >
            Dodaj
          </IconButton>
          <IconButton
            startIcon={<RiCalendarEventFill />}
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
        {children && (
          <div className="flex gap-[10px_5px] flex-wrap sm:flex-nowrap">
            {children}
          </div>
        )}
      </div>
      <div className="full-w relative mb-4 md:ml-[45px]">
        {componentsToSwitch[currentForm]}
      </div>
    </>
  );
};

export default PostsPageHeader;
