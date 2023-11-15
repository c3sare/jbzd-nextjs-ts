import parseToReact, {
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import UserLink from "./transformComponents/UserLink";
import TagLink from "./transformComponents/TagLink";
import Quote from "./transformComponents/Quote";
import ImageLightBox from "./transformComponents/ImageLightBox";

const options: HTMLReactParserOptions = {
  replace: (node: any) => {
    if (node.attribs && node.name === "a") {
      const props = attributesToProps(node.attribs);
      if (props.id === "user" && props.href)
        return (
          <UserLink {...props}>{domToReact(node.children, options)}</UserLink>
        );
      else if (props.id === "tag" && props.href)
        return (
          <TagLink {...props}>{domToReact(node.children, options)}</TagLink>
        );
    }
    if (node.name === "img" && node.attribs) {
      const props = attributesToProps(node.attribs);
      if (!props.src) return null;
      return (
        <ImageLightBox
          src={props.src as string}
          alt={(props.alt as string) || "obrazek"}
        />
      );
    }
    if (node.name === "q") {
      return <Quote>{domToReact(node.children, options)}</Quote>;
    }
  },
};

export default function htmlToReact(str: string) {
  return parseToReact(str, options);
}
