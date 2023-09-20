"use client";

import Input from "./Input";
import { useDeferredValue, useEffect, useState } from "react";
import UserListElement from "./aside/UserListElement";
import UserType from "../types/UserType";
import axios from "axios";

const UserSearchForm = () => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const deferredValue = useDeferredValue(input);
  const isListVisible = useDeferredValue(showList);

  useEffect(() => {
    if (deferredValue.length > 1) {
      axios
        .post("/api/user/list", { text: deferredValue })
        .then((res) => res.data)
        .then((data) => setUserList(data));
    } else if (deferredValue === "") {
      setUserList([]);
    }
  }, [deferredValue]);

  return (
    <form autoComplete="off" className="relative">
      <div>
        <Input
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 200)}
          placeholder="Szukaj osoby"
        />
        {isListVisible && userList.length > 0 && (
          <div>
            <div className="w-full left-0 top-full absolute z-[1] bg-[#1f1f1f] text-white text-[12px] border-t border-t-[#313131] rounded-[0_5px_5px_0] shadow-md">
              <ul className="m-0 p-[10px] list-none">
                {userList.map((user) => (
                  <UserListElement key={user.id} user={user} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default UserSearchForm;
