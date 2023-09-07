"use client";

import Badge from "./components/Badge";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import ArticleTime from "./components/ArticleTime";
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import MemImage from "./components/memContainers/MemImage";
import MemText from "./components/memContainers/MemText";
import MemYoutube from "./components/memContainers/MemYoutube";
import MemVideo from "./components/memContainers/MemVideo";
import PostActions from "./components/PostActions";
import { PostType } from "../types/PostType";
import PostAuthorInfo from "./components/PostAuthorInfo";
import TagList from "./components/TagList";
import Categories from "./components/Categories";

type PostProps = {
  post: PostType;
  isPostPage?: boolean;
  author?: PostType["author"];
  setSpears: (count: number) => void;
  setAuthorMethod: (id: string, method: "FOLLOW" | "BLOCK") => void;
};

const Post: React.FC<PostProps> = ({
  post,
  isPostPage,
  setSpears,
  setAuthorMethod,
  author,
}) => {
  const [badge, setBadge] = useState({
    ROCK: post.rock,
    SILVER: post.silver,
    GOLD: post.gold,
  });

  const postLink = `/obr/${post.id}/${post.slug}`;

  const setBadgeCount = useCallback(
    (type: "ROCK" | "SILVER" | "GOLD", count: number) => {
      setBadge((prev) => {
        const newState = { ...prev };
        newState[type] = count;
        return newState;
      });
    },
    []
  );

  const setAuthorMethodWithId = useCallback(
    (method: "FOLLOW" | "BLOCK") => {
      setAuthorMethod(author!.id!, method);
    },
    [author, setAuthorMethod]
  );

  return (
    <article className="flex items-start flex-col md:flex-row relative mx-auto md:mx-0 mb-[40px] w-full max-w-[655px] min-h-[307px]">
      <Link
        className="max-w-[40px] hidden md:block"
        href={post.author ? `/uzytkownik/${post.author.username}` : "#"}
      >
        <Image
          src={post.author?.image || "/images/avatars/default.jpg"}
          alt={post.author?.username || "Avatar"}
          width={40}
          height={40}
        />
      </Link>
      <div className="flex-1 mx-auto md:ml-[5px] relative w-full max-w-[600px]">
        <h3 className="bg-[#1f1f1f] p-[4px_8px] m-[0_0_4px] break-words relative flex items-center justify-between">
          <Link
            className="text-white text-[17px] overflow-hidden block mb-[5px] font-bold"
            href={postLink}
          >
            {post.title}
          </Link>
          <div className="ml-auto">
            <Badge name="rock" title="Kamienna dzida" count={badge.ROCK} />
            <Badge name="silver" title="Srebrna dzida" count={badge.SILVER} />
            <Badge name="gold" title="Złota dzida" count={badge.GOLD} />
          </div>
        </h3>
        <div className="p-[4px_8px] bg-[#1f1f1f] text-[12px] text-[#777] flex justify-between items-center w-full">
          <div className="flex gap-[5px] text-white max-w-full ml-1 text-[12px] flex-wrap">
            <Categories category={post.category} />
            {author && (
              <PostAuthorInfo
                author={author}
                setSpears={setSpears}
                setAuthorMethod={setAuthorMethodWithId}
              />
            )}
            <span className="text-[#777] pl-[2px]">
              <ArticleTime addTime={post.addTime} />
            </span>
          </div>
          <div>
            <div className="text-white text-[12px] relative flex items-center gap-1">
              <FaComment className="text-[#777] text-[16px]" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
        {isPostPage && <TagList tags={post.tags} />}
        <div className="flex flex-col w-full gap-1">
          {post.memContainers.map((mem, index) => {
            switch (mem.type) {
              case "IMAGE":
                return (
                  <MemImage
                    postLink={postLink}
                    key={index}
                    src={mem.data}
                    title={post.title}
                  />
                );
              case "GIF":
                return <MemVideo key={index} src={mem.data} gif />;
              case "TEXT":
                return (
                  <MemText postLink={postLink} key={index} html={mem.data} />
                );
              case "VIDEO":
                return <MemVideo key={index} src={mem.data} />;
              case "YOUTUBE":
                return <MemYoutube key={index} videoId={mem.data} />;
            }
          })}
        </div>
      </div>
      <PostActions
        post={post}
        postLink={postLink}
        pluses={post.pluses}
        setBadgeCount={setBadgeCount}
        isPostPage={isPostPage}
      />
    </article>
  );
};

export default memo(Post);
