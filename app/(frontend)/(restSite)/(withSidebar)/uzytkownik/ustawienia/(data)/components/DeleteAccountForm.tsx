"use client";

import { useContext } from "react";
import Heading from "../../components/Heading";
import { MonitProvider } from "@/context/MonitContext";
import axios from "axios";
import { useSession } from "next-auth/react";

const DeleteAccountForm = () => {
  const session = useSession();
  const monit = useContext(MonitProvider);

  const deleteAccount = () => {
    axios
      .delete("/api/user/delete/" + session.data!.user!.id)
      .then(() => {
        session.update();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => monit!.close());
  };

  return (
    <>
      <Heading>Usuwanie konta:</Heading>
      <div className="text-center mt-[25px]">
        <p>
          Jeżeli chcesz usunąć swoje konto kliknij{" "}
          <button
            className="text-[#c03e3f]"
            onClick={() =>
              monit!.create!(
                "Usuwanie",
                "Na pewno chcesz usunąć swoje konto?",
                deleteAccount
              )
            }
          >
            tutaj
          </button>
        </p>
      </div>
    </>
  );
};

export default DeleteAccountForm;
