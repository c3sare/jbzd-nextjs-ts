import Badge from "./components/Badge";
import { Category, Post, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArticleTime from "./components/ArticleTime";
import { FaComment } from "react-icons/fa";

type PostProps = {
  post: Post & {
    author: User;
    category: Category;
    comments: number;
    rock: number;
    silver: number;
    gold: number;
  };
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [badge, setBadge] = useState({
    rock: post.rock,
    silver: post.silver,
    gold: post.gold,
    comments: post.comments,
  });

  return (
    <article>
      <Link href={`/uzytkownik/${post.author.username!}`}>
        <Image
          src={post.author.image || "/images/avatar/default.jpg"}
          alt={post.author.username!}
          width={40}
          height={40}
        />
      </Link>
      <div>
        <h3>
          <Link href="/">{post.title}</Link>
          <div className="flex gap-2">
            <Badge name="rock" title="Kamienna dzida" count={badge.rock} />
            <Badge name="silver" title="Srebrna dzida" count={badge.silver} />
            <Badge name="gold" title="Złota dzida" count={badge.gold} />
          </div>
        </h3>
      </div>
      <div>
        <div className="flex gap-[5px] overflow-hidden max-w-full ml-1 text-[12px]">
          <Link href={`/${post.category.slug}`}>{post.category.name}</Link>
          <span className="text-[#777]">
            <ArticleTime addTime={post.addTime as unknown as string} />
          </span>
        </div>
        <div>
          <div className="text-white text-[12px] font-normal relative text-right">
            <FaComment className="text-[#777]" />
            <span>{badge.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
