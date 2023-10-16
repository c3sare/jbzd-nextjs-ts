"use client";

import Conversation from "@/app/wiadomosci-prywatne/types/Conversation";
import AddMessageForm from "./AddMessageForm";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import { useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusher";

type ChatPageProps = {
  conversation: Conversation;
  userId: string;
};

const ChatPage: React.FC<ChatPageProps> = ({ conversation, userId }) => {
  const [blockedId, setBlockedId] = useState<string | null>(
    conversation.userBlockedId || null
  );

  console.log(blockedId);

  useEffect(() => {
    const handleBlockConversationTrigger = ({
      conversationId: convId,
      userBlockedId: userId,
    }: {
      conversationId: string;
      userBlockedId: string | null;
    }) => {
      if (conversation.id === convId) setBlockedId(userId);
    };

    pusherClient.bind("conversation:block", handleBlockConversationTrigger);

    return () => {
      pusherClient.unbind("conversation:block", handleBlockConversationTrigger);
    };
  }, [conversation.id]);

  return (
    <div className="mx-2">
      <ChatHeader
        conversationId={conversation.id}
        lastMessageAt={conversation.lastMessageAt}
        user={conversation.users[0]}
        userId={userId}
        userBlockedId={blockedId}
      />
      <div>
        <ChatBody
          initialMessages={conversation.messages}
          userId={userId}
          conversationId={conversation.id}
        />
        <div className="relative">
          <AddMessageForm
            conversationId={conversation.id}
            isBlockedConversation={Boolean(blockedId)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
