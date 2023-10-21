"use client";

import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { IoLink } from "@react-icons/all-files/io5/IoLink";
import { IoMdStar } from "@react-icons/all-files/io/IoMdStar";
import { IoIosEye } from "@react-icons/all-files/io/IoIosEye";
import { IoMdWarning } from "@react-icons/all-files/io/IoMdWarning";

import ActionButton from "./components/post/ActionButton";
import MessageBox from "./components/post/MessageBox";
import AvatarBox from "./components/post/AvatarBox";
import BlogPostHeader from "./components/post/BlogPostHeader";
import Comment from "./components/post/comment/Comment";

const BlogPost = () => {
  return (
    <div className="relative mb-[25px]">
      <AvatarBox username="c3sare" avatar={undefined} />
      <div className="float-left w-full sm:w-[calc(100%_-_70px)] relative">
        <BlogPostHeader username="c3sare" addTime={new Date()} score={0} />
        <div className="clear-both relative p-[15px_15px_25px] bg-[#313131] group">
          <MessageBox images={["/images/blog/1.jpg"]}>
            Ej, w sumie, dlaczego to one nie są sprzedawane na wynos w podobny
            sposób jak kebaby, burrito, czy inne potrawy na bazie tortilli?
            <br />
            No niby tortilla a naleśnik, nie to samo, ale w tym przypadku to
            dość podobna rzecz. <br />
            Przecież to nie taki zły pomysł, farsz może być z wielu rzeczy,
            oprócz mięsa, kapusty i grzybów, to przecież nie raz się widzi, jak
            zamiast tego wpieprzają tam jakiś szpinak, albo jajka i cholera wie
            co jeszcze, to już szeroka lista do menu. <br />
            Jakąś budkę w zatłoczonym miejscu otworzyć to myślę, że by się
            spokojnie sprzedawało, z odpowiednim marketingiem.
          </MessageBox>
          <ul className="transition-opacity sm:opacity-0 ease-in-out duration-200 group-hover:opacity-100">
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton icon={FaReply}>Odpowiedz</ActionButton>
            </li>
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton icon={IoLink}>Link</ActionButton>
            </li>
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton icon={IoMdStar}>Dodaj do ulubionych</ActionButton>
            </li>
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton icon={IoIosEye}>Obserwuj</ActionButton>
            </li>
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton icon={IoMdWarning}>Zgłoś</ActionButton>
            </li>
          </ul>
        </div>
        <div className="pt-[20px] bg-[#313131]">
          <div>
            <ul className="px-[7.5px] w-full">
              <Comment />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
