"use client";

import { useEffect, useState } from "react";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import PasswordRemindForm from "./forms/PasswordRemindForm";
import { useSession } from "next-auth/react";

const SidebarForms = () => {
  const session = useSession();
  const [indexOfCurrentForm, setIndexOfCurrentForm] = useState(0);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Jesteś zalogowany!");
    }
  }, [session]);

  const forms = [
    {
      name: "Zaloguj się",
      component: LoginForm,
    },
    {
      name: "Zarejestuj się",
      component: RegisterForm,
    },
    {
      name: "Przypomnij hasło",
      component: PasswordRemindForm,
    },
  ];

  const formSwitchButtons = forms.map((form, index) => {
    return (
      index !== indexOfCurrentForm && (
        <button
          key={form.name}
          onClick={() => setIndexOfCurrentForm(index)}
          className="first:text-[#777] last:text-white text-[13px]"
        >
          {form.name}
        </button>
      )
    );
  });

  const CurrentForm = forms[indexOfCurrentForm].component;

  const currentFormIndexIsOdd = indexOfCurrentForm % 2 === 1;

  const orderedButtons = currentFormIndexIsOdd
    ? formSwitchButtons
    : formSwitchButtons.reverse();

  return (
    <div className="p-[15px]">
      <div className="max-w-[290px] mx-auto my-0 text-white text-[14px] block py-[15px]">
        <CurrentForm setIndexOfCurrentForm={setIndexOfCurrentForm}>
          <div className="flex items-center justify-between mt-[10px] mb-[30px]">
            {orderedButtons}
          </div>
        </CurrentForm>
      </div>
    </div>
  );
};

export default SidebarForms;
