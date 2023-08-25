import { differenceInMinutes } from "date-fns";
import { useMemo } from "react";

type ArticleTimeProps = {
  addTime: Date;
};

const ArticleTime: React.FC<ArticleTimeProps> = ({ addTime }) => {
  const value = useMemo(
    () => differenceInMinutes(new Date(), addTime),
    [addTime]
  );

  if (value > 60 * 24 * 7 * 4) {
    return `${Math.round(value / (60 * 24 * 7 * 4))} mies.`;
  } else if (value > 60 * 24 * 7 && value <= 60 * 24 * 7 * 4) {
    return `${Math.round(value / (60 * 24 * 7))} tyg.`;
  } else if (value > 60 * 24 && value < 60 * 24 * 7) {
    return `${Math.round(value / (60 * 24))} dni.`;
  } else if (value >= 60) {
    return `${Math.round(value / 60)} godz.`;
  } else {
    return `${value} min.`;
  }
};

export default ArticleTime;
