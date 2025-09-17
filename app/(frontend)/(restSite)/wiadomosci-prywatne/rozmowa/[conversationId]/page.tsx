import getMessages from "@/actions/chat/getMessages";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/getSession";
import BackToConversationsPage from "./components/BackToConversationsPage";
import ChatPage from "./components/ChatPage";

type ConversationPageProps = {
  params: Promise<{
    conversationId: string;
  }>;
};

const ConversationPage: React.FC<ConversationPageProps> = async ({
  params,
}) => {
  const { conversationId } = await params;
  const session = await getSession();
  const conversation = await getMessages(conversationId);
  if (!conversation || !session?.user?.id)
    return redirect("/wiadomosci-prywatne");

  return (
    <>
      <BackToConversationsPage />
      <ChatPage conversation={conversation} userId={session.user.id} />
    </>
  );
};

export default ConversationPage;
