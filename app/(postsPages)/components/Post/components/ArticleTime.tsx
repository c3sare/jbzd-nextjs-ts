import { parseISO, differenceInMinutes } from "date-fns";

type ArticleTimeProps = {
  addTime: string;
};

const ArticleTime: React.FC<ArticleTimeProps> = ({ addTime }) => {
  const postTime = parseISO(addTime);
  const currentTime = new Date();

  const value = differenceInMinutes(postTime, currentTime);

  if (value > 60 * 24 * 7 * 30) {
    return `${value} mies.`;
  } else if (value > 60 * 24 * 7) {
    return `${value} tyg.`;
  } else if (value > 60 * 24) {
    return `${value} dni.`;
  } else if (value > 60) {
    return `${value} godz.`;
  } else {
    return `${value} min.`;
  }
};

export default ArticleTime;
