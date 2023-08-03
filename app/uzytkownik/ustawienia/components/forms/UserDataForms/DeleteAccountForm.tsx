import Modal from "@/app/components/Modal";
import Heading from "../../Heading";

const DeleteAccountForm = () => {
  return (
    <>
      <Heading>Usuwanie konta:</Heading>
      <div className="text-center mt-[25px]">
        <p>
          Jeżeli chcesz usunąć swoje konto kliknij{" "}
          <button className="text-[#c03e3f]">tutaj</button>
        </p>
      </div>
      {/* <Modal
        title="Potwierdzenie"
        text="Na pewno chcesz usunąć swoje konto?"
        onClick={() => {}}
        onClose={() => {}}
      /> */}
    </>
  );
};

export default DeleteAccountForm;
