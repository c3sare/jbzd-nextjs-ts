"use client";

import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { pusherClient } from "@/app/libs/pusher";
import { useRouter } from "next/navigation";
import Scrollbars from "react-custom-scrollbars-2";
import axios from "axios";

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
  const bottomRef = useRef<Scrollbars>(null);

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

        return [...current, message];
      });

      router.refresh();
    };

    const updateMessageHandler = (newMessage: any) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
      router.refresh();
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId, router]);

  useEffect(() => {
    bottomRef?.current?.scrollToBottom();
  }, [messages]);

  return (
    <div className="text-white mb-[20px]">
      <div className="m-auto relative h-[calc(100vh_-_430px)] max-w-[calc(100%_+_20px)] touch-auto">
        <Scrollbars style={{ width: "100%", height: "100%" }} ref={bottomRef}>
          {messages.map((message) => (
            <Message key={message.id} message={message} userId={userId} />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default ChatBody;
