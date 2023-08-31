import { FaFlag } from "@react-icons/all-files/fa/FaFlag";
import PostActionLinkButton from "./PostActionLinkButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

type ReportPostButtonProps = {
  accepted: boolean;
  isLoggedIn: boolean;
  isOwnPost: boolean;
  postId: string;
};

const ReportPostButton: React.FC<ReportPostButtonProps> = ({
  accepted,
  isLoggedIn,
  isOwnPost,
  postId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (accepted || !isLoggedIn || isOwnPost) return null;

  const handleReportPost = () => {
    setIsLoading(true);
    axios
      .post(`/api/post/report/${postId}`)
      .then(() => {
        toast.success("Dziękujemy za zgłoszenie!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy zgłaszaniu!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PostActionLinkButton onClick={handleReportPost} disabled={isLoading}>
      <FaFlag />
    </PostActionLinkButton>
  );
};

export default ReportPostButton;
