"use client";

import { useContext, useEffect } from "react";
import ActionButton from "./ActionButton";
import { MonitProvider } from "@/app/context/MonitContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/app/libs/pusher";

type UserChatActionsProps = {
  conversationId: string;
  userBlockedId: string | null;
  userId: string;
};

const UserChatActions: React.FC<UserChatActionsProps> = ({
  conversationId,
  userBlockedId,
  userId,
}) => {
  const router = useRouter();
  const monit = useContext(MonitProvider);

  useEffect(() => {
    const handleIsDeletedConversation = (id: string) => {
      if (conversationId === id) router.push("/wiadomosci-prywatne");
    };

    pusherClient.bind("conversation:delete", handleIsDeletedConversation);

    return () => {
      pusherClient.unbind("conversation:delete", handleIsDeletedConversation);
    };
  }, [conversationId, router]);

  const handleBlockConversation = () => {
    monit!.create("Potwierdzenie", "Na pewno chcesz zablokować wątek?", () => {
      axios
        .post(`/api/conversation/${conversationId}/block`)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => monit!.close());
    });
  };

  const handleDeleteConversation = () => {
    monit!.create("Potwierdzenie", "Na pewno chcesz usunąć wątek?", () => {
      axios
        .delete(`/api/conversation/${conversationId}`)
        .then(() => {
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => monit!.close());
    });
  };

  return (
    <div>
      {(!userBlockedId || userBlockedId === userId) && (
        <ActionButton onClick={handleBlockConversation}>
          {userBlockedId === userId ? "Odblokuj" : "Zablokuj"}
        </ActionButton>
      )}
      <ActionButton onClick={handleDeleteConversation}>
        Usuń konwersację
      </ActionButton>
    </div>
  );
};

export default UserChatActions;
