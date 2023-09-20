import AddMessageForm from "./components/AddMessageForm";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";

const ConversationPage = () => {
  return (
    <div>
      <ChatHeader />
      <div>
        <div className="text-white mb-[20px]">
          <section className="m-auto relative h-[calc(100vh_-_430px)] max-w-[calc(100%_+_20px)] overflow-hidden touch-auto">
            <Message />
          </section>
        </div>
        <div className="relative">
          <AddMessageForm />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
