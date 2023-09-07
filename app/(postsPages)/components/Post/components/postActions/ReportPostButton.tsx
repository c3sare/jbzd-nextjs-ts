import { FaFlag } from "@react-icons/all-files/fa/FaFlag";
import PostActionLinkButton from "./PostActionLinkButton";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import createPostReport from "../../actions/createPostReport";

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

  const handleReportPost = useCallback(async () => {
    setIsLoading(true);
    // /api/post/report/${postId}
    const res = await createPostReport(postId);
    if (typeof res?.reported === "boolean") {
      if (res.reported) {
        toast.success("Dziękuję za zgłoszenie!");
      } else {
        toast.error("Już zgłosiłeś ten kontent!");
      }
    } else {
      toast.error("Wystąpił problem przy zgłaszaniu!");
    }
    setIsLoading(false);
  }, [postId]);

  if (accepted || !isLoggedIn || isOwnPost) return null;

  return (
    <PostActionLinkButton onClick={handleReportPost} disabled={isLoading}>
      {isLoading ? (
        <BiLoaderAlt className="animate-spin text-[26px] mx-auto" />
      ) : (
        <FaFlag />
      )}
    </PostActionLinkButton>
  );
};

export default ReportPostButton;
