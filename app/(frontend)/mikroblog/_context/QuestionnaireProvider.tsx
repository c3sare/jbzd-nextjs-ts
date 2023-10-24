"use client";

import QuestionnaireSchema from "@/validators/QuestionnaireSchema";
import { PropsWithChildren, createContext, useState } from "react";
import { z } from "zod";
import QuestionnaireForm from "../_components/layout/blogForm/components/questionnaire/QuestionnaireForm";

type DataType = z.infer<typeof QuestionnaireSchema> | undefined;

type CreateFormProps = {
  data?: DataType;
  setFormData: (data: DataType) => void;
};

type QuestionnaireContextType = {
  createForm: (props: CreateFormProps) => void;
} | null;

export const QuestionnaireContext =
  createContext<QuestionnaireContextType>(null);

type FormSettingsType = {
  isActive: boolean;
  data?: DataType;
  setData?: (data: DataType) => void;
};

const QuestionnaireProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [formSettings, setFormData] = useState<FormSettingsType>({
    isActive: false,
  });

  const handleCloseForm = () => {
    setFormData({
      isActive: false,
    });
  };

  const createForm = (props: CreateFormProps) => {
    setFormData({
      isActive: true,
      data: props.data,
      setData: props.setFormData,
    });
  };

  return (
    <QuestionnaireContext.Provider value={{ createForm }}>
      {children}
      {formSettings.isActive && (
        <QuestionnaireForm
          currentFormValues={formSettings.data}
          setData={formSettings.setData}
          onClose={handleCloseForm}
        />
      )}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireProvider;
