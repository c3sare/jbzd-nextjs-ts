"use client";

import { useEffect, useState } from "react";
import Conversation from "../types/Conversation";
import ConversationHistoryElement from "../rozmowa/[conversationId]/components/ConversationHistoryElement";
import { pusherClient } from "@/app/libs/pusher";
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

    pusherClient.bind("chatHistory:update", handleUpdateHistory);

    return () => {
      pusherClient.unbind("chatHistory:update");
      router.refresh();
    };
  }, [router]);

  return (
    <section className="max-w-[calc(100%_-_20px)] h-[calc(100vh_-_370px)] relative m-auto">
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
