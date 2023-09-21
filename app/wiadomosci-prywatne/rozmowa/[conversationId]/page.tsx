import getMessages from "@/app/actions/chat/getMessages";
import AddMessageForm from "./components/AddMessageForm";
import ChatHeader from "./components/ChatHeader";
import { redirect } from "next/navigation";
import { getSession } from "@/app/actions/getSession";
import ChatBody from "./components/ChatBody";

type ConversationPageProps = {
  params: {
    conversationId: string;
  };
};

const ConversationPage: React.FC<ConversationPageProps> = async ({
  params: { conversationId },
}) => {
  const session = await getSession();
  const conversation = await getMessages(conversationId);

  if (!conversation || !session?.user?.id)
    return redirect("/wiadomosci-prywatne");

  const messages = conversation.messages;

  return (
    <div>
      <ChatHeader
        conversationId={conversation.id}
        lastMessageAt={conversation.lastMessageAt}
        user={conversation.users[0]}
      />
      <div>
        <ChatBody
          initialMessages={messages}
          userId={session.user.id}
          conversationId={conversationId}
        />
        <div className="relative">
          <AddMessageForm conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
