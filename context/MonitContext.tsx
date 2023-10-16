"use client";

import React, { PropsWithChildren, useState } from "react";
import Modal from "@/app/components/Modal";

type MonitOptionsProps = {
  open: boolean;
  isClosing: boolean;
  title: string;
  text: string;
  onClose: (prevState?: any) => void;
  onClick: () => void;
};

type CreateMonitFunctionType = {
  create: (title: string, text: string, onClick: () => void) => void;
  close: () => void;
} | null;

export const MonitProvider = React.createContext<CreateMonitFunctionType>(null);

export const MonitContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [monitOptions, setMonitOptions] = useState<MonitOptionsProps>({
    open: false,
    isClosing: false,
    title: "",
    text: "",
    onClose: () => {},
    onClick: () => {},
  });

  const onClose = () => {
    setMonitOptions((prevState: MonitOptionsProps) => {
      const newState = { ...prevState };
      newState.isClosing = true;

      return newState;
    });
    setTimeout(() => {
      setMonitOptions((prevState) => {
        const newState = { ...prevState };
        newState.open = false;
        newState.isClosing = false;

        return newState;
      });
    }, 600);
  };

  const createMonit = (title: string, text: string, onClick: () => void) => {
    setMonitOptions({
      open: true,
      title,
      isClosing: false,
      text,
      onClick,
      onClose,
    });
  };

  return (
    <MonitProvider.Provider value={{ create: createMonit, close: onClose }}>
      {children}
      {monitOptions.open && (
        <Modal
          isClosing={monitOptions.isClosing}
          title={monitOptions.title}
          text={monitOptions.text}
          onClick={monitOptions.onClick}
          onClose={monitOptions.onClose}
        />
      )}
    </MonitProvider.Provider>
  );
};
