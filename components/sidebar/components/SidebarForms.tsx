"use client";

import { useState } from "react";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import PasswordRemindForms from "./forms/PasswordRemindForms";

const SidebarForms = () => {
  const [indexOfCurrentForm, setIndexOfCurrentForm] = useState(0);

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
      component: PasswordRemindForms,
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
