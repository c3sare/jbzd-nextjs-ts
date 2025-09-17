import { notFound } from "next/navigation";
import getConversations from "@/actions/chat/getConversations";
import UserSearchForm from "./components/UserSearchForm";
import { getSession } from "@/actions/getSession";
import ConversationHistory from "./components/ConversationHistory";

const MessagesLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const session = await getSession();

  if (!session?.user?.id) return notFound();

  const conversations = await getConversations();

  if (!conversations) return notFound();

  return (
    <div className="flex w-full mt-[46px] flex-col md:flex-row">
      <aside
        className="py-[25px] w-full md:w-[350px] flex justify-end"
        id="conversationSidebar"
      >
        <div className="mx-2 md:ml-0 md:mr-[30px] flex w-full md:w-auto md:flex-[0_0_300px] flex-col">
          <div className="mb-[25px]">
            <div className="z-999 fixed hidden bottom-0 left-0 right-0 top-0 overflow-hidden"></div>
            <div>
              <header className="text-white font-bold mb-[10px]">
                Rozpocznij rozmowę:
              </header>
              <UserSearchForm />
            </div>
          </div>
          <div className="mb-[25px]">
            <div>
              <header className="text-white font-bold mb-[10px]">
                Historia wiadomości:
              </header>
              <div>
                <ConversationHistory
                  initialHistory={conversations}
                  userId={session.user.id}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex w-full md:w-[calc(100%-350px)] bg-[#313131] py-[25px]">
        <div className="max-w-[660px] md:mx-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MessagesLayout;
