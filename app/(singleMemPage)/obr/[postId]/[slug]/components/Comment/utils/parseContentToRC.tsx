import {
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import parse from "html-react-parser";
import Link from "next/link";
import Quote from "../components/Quote";

const options: HTMLReactParserOptions = {
  replace: (node: any) => {
    if (node.attribs && node.name === "a") {
      const props = attributesToProps(node.attribs);
      return (
        <Link href="/" className="italic text-[#777]" {...props}>
          {domToReact(node.children, options)}
        </Link>
      );
    }
    if (node.name === "q") {
      return <Quote>{domToReact(node.children, options)}</Quote>;
    }
  },
};

export default function parseContentToRC(content: string) {
  const userNamePattern = /@\[[A-Za-z1-9\-\_]*\]/g;
  const quotePattern =
    /\[quote\][\w\d\s\.,!@#$%^&\*()`~?/><'";:|\\}{\[\]+-_]*\[\/quote\]/g;
  const elements: { textElement: string; nodeElement: string }[] = [];
  content = content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  const nicknames = content.match(userNamePattern);
  const quotes = content.match(quotePattern);
  quotes?.forEach((item) => {
    const startIndex = item.indexOf("[quote]") + 7;
    const endIndex = item.lastIndexOf("[/quote]");
    const quoteText = item.slice(startIndex, endIndex);
    elements.push({
      textElement: item,
      nodeElement: `<q>${quoteText}</q>`,
    });
  });
  nicknames?.forEach((item) => {
    const nick = item.slice(item.indexOf("@[") + 2, item.indexOf("]"));
    elements.push({
      textElement: item,
      nodeElement: `<a href="/uzytkownik/${nick}">@${nick}</a>`,
    });
  });
  let newText = content;
  elements.forEach((item) => {
    newText = newText.replace(item.textElement, item.nodeElement);
  });

  return parse(newText, options);
}
