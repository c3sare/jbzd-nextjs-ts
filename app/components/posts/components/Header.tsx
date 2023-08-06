"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbCalendarEvent } from "react-icons/tb";
import { BiFilter } from "react-icons/bi";
import IconButton from "./IconButton";
import CreatePostForm from "./forms/CreatePostForm";
import PostsDateFilterForm from "./forms/PostsDateFilterForm";
import PostsTypeFilterForm from "./forms/PostsTypeFilterForm";
import { useState } from "react";

const Header = () => {
  const [currentForm, setCurrentForm] = useState<number>(0);

  const componentsToSwitch = [
    null,
    <CreatePostForm key={1} />,
    <PostsDateFilterForm key={2} />,
    <PostsTypeFilterForm key={3} />,
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

export default Header;
