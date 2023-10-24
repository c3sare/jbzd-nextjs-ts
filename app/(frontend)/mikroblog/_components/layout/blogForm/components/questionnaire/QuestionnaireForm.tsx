"use client";

import QuestionInput from "./components/QuestionInput";
import Form from "@/components/forms/ZodForm";
import useZodForm from "@/hooks/useZodForm";
import QuestionnaireSchema from "@/validators/QuestionnaireSchema";
import { z } from "zod";
import AnswersSection from "./components/AnswersSection";

type QuestionnaireFormProps = {
  onClose: () => void;
  currentFormValues?: z.infer<typeof QuestionnaireSchema> | null;
  setData?: ((data: z.infer<typeof QuestionnaireSchema>) => void) | null;
};

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  currentFormValues,
  onClose,
  setData,
}) => {
  const formHook = useZodForm({
    schema: QuestionnaireSchema,
    defaultValues: currentFormValues || {
      question: "",
      answers: [],
    },
  });

  const onSubmit = formHook.handleSubmit((data) => {
    if (setData) {
      setData(data);
      onClose();
    }
  });

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-[rgba(0,_0,_0,_.6)] z-[9999]">
      <div className="w-full">
        <div className="max-w-[750px] p-[25px] w-[98%] rounded-[5px] m-[25px_auto] bg-[#313131] text-white overflow-hidden border-2 border-[#383737]">
          <h2 className="text-center text-[26px] mb-[10px] w-full font-bold">
            Dodaj ankietę
          </h2>
          <Form formHook={formHook} onSubmit={onSubmit}>
            <QuestionInput
              placeholder="Napisz pytanie"
              label="Pytanie:"
              id="question"
            />
            <AnswersSection control={formHook.control} />
            <div className="max-w-[1110px] mx-auto w-full px-[15px]">
              <div className="w-full">
                <label className="relative min-h-[1px] w-full text-white text-[12px] block mb-[10px] max-w-full">
                  Opcje:
                </label>
                <div className="flex justify-center items-center w-full gap-[30px]">
                  <div className="mb-[10px] w-1/2">
                    <select
                      className="h-[34px] text-[14px] px-[10px] bg-black text-white w-full"
                      {...formHook.register("markOption")}
                    >
                      <option value="single">Tryb pojedynczego wyboru</option>
                      <option value="multiple">
                        Tryb wielokrotnego wyboru
                      </option>
                    </select>
                  </div>
                  <div className="mb-[10px] w-1/2">
                    <select
                      className="h-[34px] text-[14px] px-[10px] bg-black w-full text-white"
                      {...formHook.register("availableTime")}
                    >
                      <option value="">Bez terminu</option>
                      <option value="1d">Ważna przez 1 dzień</option>
                      <option value="3d">Ważna przez 3 dni</option>
                      <option value="7d">Ważna przez tydzień</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1f1f1f] mb-[-25px] mx-[-25px] p-[25px] relative flex justify-between">
              <button
                onClick={onClose}
                type="button"
                className="text-white bg-[#6d7578] hover:bg-[#3c4143] border-0 transition-colors duration-200 ease-in-out uppercase text-[14px] px-[30px] py-[10px] inline-block relative min-w-[80px] text-center outline-none appearance-none font-bold"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="text-white bg-[#c23d3a] hover:bg-[#732423] border-0 transition-colors duration-200 ease-in-out uppercase text-[14px] px-[30px] py-[10px] inline-block relative min-w-[80px] text-center outline-none appearance-none font-bold"
              >
                Stwórz
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
