"use client";

import Badge from "./components/Badge";
import { Category, Post, Tag, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArticleTime from "./components/ArticleTime";
import { FaComment } from "react-icons/fa";
import MemImage from "./components/memContainers/MemImage";
import MemText from "./components/memContainers/MemText";

type PostProps = {
  post: Post & {
    author: User;
    category: Category;
    tags: Tag[];
    _count: { comments: number };
  };
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [badge, setBadge] = useState({
    rock: 0,
    silver: 0,
    gold: 0,
    comments: post._count.comments,
  });

  return (
    <article className="flex items-start relative mb-[40px] w-full">
      <Link
        className="max-w-[40px] block"
        href={`/uzytkownik/${post.author.username!}`}
      >
        <Image
          src={post.author.image || "/images/avatar/default.jpg"}
          alt={post.author.username!}
          width={40}
          height={40}
        />
      </Link>
      <div className="flex-1 ml-[5px] relative">
        <h3 className="bg-[#1f1f1f] p-[4px_8px] m-[0_0_4px] break-words relative flex flex-col">
          <Link
            className="text-white text-[17px] overflow-hidden block mb-[5px]"
            href="/"
          >
            {post.title}
          </Link>
          <div className="ml-auto">
            <Badge name="rock" title="Kamienna dzida" count={badge.rock} />
            <Badge name="silver" title="Srebrna dzida" count={badge.silver} />
            <Badge name="gold" title="Złota dzida" count={badge.gold} />
          </div>
        </h3>
        <div className="p-[4px_8px] bg-[#1f1f1f] text-[12px] text-[#777] flex justify-between items-center">
          <div className="flex gap-[5px] text-white overflow-hidden max-w-full ml-1 text-[12px]">
            <Link href={`/${post.category.slug}`}>{post.category.name}</Link>
            <span className="text-[#777]">
              <ArticleTime addTime={post.addTime} />
            </span>
          </div>
          <div>
            <div className="text-white text-[12px] relative flex items-center gap-1">
              <FaComment className="text-[#777] text-[16px]" />
              <span>{badge.comments}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {post.memContainers.map((mem) => {
            switch (mem.type) {
              case "IMAGE":
                return <MemImage src={mem.data} title={post.title} />;
              case "TEXT":
                return <MemText html={mem.data} />;
            }
          })}
        </div>
      </div>
    </article>
  );
};

export default Post;
