"use client";

import Badge from "./components/Badge";
import { PostStats } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArticleTime from "./components/ArticleTime";
import { FaComment } from "react-icons/fa";
import MemImage from "./components/memContainers/MemImage";
import MemText from "./components/memContainers/MemText";
import MemYoutube from "./components/memContainers/MemYoutube";
import MemVideo from "./components/memContainers/MemVideo";
import PostActions from "./components/PostActions";
import { PostType } from "../types/PostType";

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [badge, setBadge] = useState({
    rock: post.rock,
    silver: post.silver,
    gold: post.gold,
    comments: post.comments,
  });

  const postLink = `/obr/${post.id}/${post.slug}`;

  return (
    <article className="flex items-start flex-col md:flex-row relative mx-auto md:mx-0 mb-[40px] max-w-[655px]">
      <Link
        className="max-w-[40px] hidden md:block"
        href={post.author ? `/uzytkownik/${post.author.username}` : "#"}
      >
        <Image
          src={post.author?.image || "/images/avatar/default.jpg"}
          alt={post.author?.username || "Avatar"}
          width={40}
          height={40}
        />
      </Link>
      <div className="flex-1 mx-auto md:ml-[5px] relative max-w-[600px]">
        <h3 className="bg-[#1f1f1f] p-[4px_8px] m-[0_0_4px] break-words relative flex items-center justify-between">
          <Link
            className="text-white text-[17px] overflow-hidden block mb-[5px] font-bold"
            href={postLink}
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
          {post.memContainers.map((mem, index) => {
            switch (mem.type) {
              case "IMAGE":
                if (mem.data.endsWith(".mp4"))
                  return <MemVideo key={index} src={mem.data} gif />;
                else
                  return (
                    <MemImage
                      postLink={postLink}
                      key={index}
                      src={mem.data}
                      title={post.title}
                    />
                  );
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
      <PostActions post={post} postLink={postLink} pluses={post.pluses} />
    </article>
  );
};

export default Post;
