"use client";

import { useEffect, useState } from "react";
import Conversation from "../types/Conversation";
import ConversationHistoryElement from "../rozmowa/[conversationId]/components/ConversationHistoryElement";
import { pusherClient } from "@/libs/pusher";
import { useRouter } from "next/navigation";

type ConversationHistoryProps = {
  initialHistory: Conversation[];
  userId: string;
};

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  initialHistory,
  userId,
}) => {
  const router = useRouter();
  const [history, setHistory] = useState<Conversation[]>(initialHistory);

  useEffect(() => {
    const handleUpdateHistory = (conversation: Conversation) => {
      setHistory((prev) => {
        return [
          conversation,
          ...prev.filter(
            (prevConversation) => prevConversation.id !== conversation.id
          ),
        ];
      });
    };

    const handleDeleteConversation = (id: string) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    };

    pusherClient.bind("message:new", handleUpdateHistory);
    pusherClient.bind("conversation:delete", handleDeleteConversation);

    return () => {
      pusherClient.unbind("message:new", handleUpdateHistory);
      pusherClient.unbind("conversation:delete", handleDeleteConversation);
      router.refresh();
    };
  }, [router]);

  return (
    <section className="max-w-[calc(100%-20px)] h-[calc(100vh-370px)] relative m-auto">
      {history.length === 0 ? (
        <p className="text-[#8f8f8f] text-[12px] italic">
          Nie masz jeszcze żadnych rozmów
        </p>
      ) : (
        history.map((conversation) => (
          <ConversationHistoryElement
            key={conversation.id}
            conversation={conversation}
            userId={userId}
          />
        ))
      )}
    </section>
  );
};

export default ConversationHistory;
