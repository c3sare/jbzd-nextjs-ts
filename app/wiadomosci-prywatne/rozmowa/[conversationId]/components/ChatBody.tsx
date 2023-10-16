"use client";

import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { pusherClient } from "@/libs/pusher";
import axios from "axios";
import { useRouter } from "next/navigation";

type ChatBodyProps = {
  initialMessages: any[];
  userId: string;
  conversationId: string;
};

const ChatBody: React.FC<ChatBodyProps> = ({
  initialMessages,
  userId,
  conversationId,
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: any) => {
      axios.post(`/api/conversation/${conversationId}/seen`);

      setMessages((current) => {
        if (current.find((item) => item.id === message.id)) {
          return current;
        }

        return [...current, message.messages[0]];
      });
    };

    const updateMessageHandler = (newMessage: any) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage.messages[0];
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("message:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unbind("message:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
      router.refresh();
    };
  }, [conversationId, router]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="text-white mb-[20px]">
      <div className="m-auto relative h-[calc(100vh_-_430px)] max-w-[calc(100%_+_20px)] touch-auto overflow-y-scroll">
        {messages.map((message) => (
          <Message key={message.id} message={message} userId={userId} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatBody;
