import {
  ArrayPath,
  Control,
  FieldArray,
  FieldValues,
  useFieldArray,
} from "react-hook-form";

import { useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AnswerItem from "./AnswerItem";
import useZodFormContext from "@/hooks/useZodFormContext";
import ErrorBox from "./ErrorBox";

type AnswersSectionProps<T extends FieldValues> = {
  control: Control<T>;
};

const AnswersSection = <T extends FieldValues>({
  control,
}: AnswersSectionProps<T>) => {
  const {
    formState: { errors },
  } = useZodFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "answers" as ArrayPath<T>,
  });
  const answerInitialRef = useRef<HTMLInputElement>(null);

  const handleAddToAnswers = () => {
    if (answerInitialRef.current) {
      const value = answerInitialRef.current.value;
      if (!value || value.length < 2) return;

      append({ value } as FieldArray<T>);
      answerInitialRef.current.value = "";
    }
  };

  const error = errors.answers?.root?.message;

  return (
    <div className="py-[25px] mb-[10px]">
      <label className="text-[12px] block text-white mb-[10px] leading-normal text-normal w-full">
        Odpowiedzi (max: 20):
      </label>
      {error ? <ErrorBox>{error as string}</ErrorBox> : null}
      <div className="w-[calc(100%+20px)] pr-[20px] overflow-hidden overflow-y-auto max-h-[30vh] mb-[4px]">
        <div className="w-full">
          <DndProvider backend={HTML5Backend}>
            {fields.map((field, index) => (
              <AnswerItem
                id={field.id}
                key={field.id}
                index={index}
                remove={remove}
                move={move}
              />
            ))}
          </DndProvider>
        </div>
      </div>
      <div className="w-full flex items-center">
        <input
          className="w-[calc(80%-3px)] h-[34px] ml-[8%] mr-[3px] leading-[48px] bg-black p-[10px] text-white disabled:opacity-30 disabled:cursor-not-allowed placeholder:text-zinc-500 focus:outline-hidden"
          disabled={fields.length >= 20}
          type="text"
          placeholder={`Odpowiedź #${fields.length + 1}`}
          ref={answerInitialRef}
        />
        <button
          onClick={handleAddToAnswers}
          type="button"
          className="w-[calc(12%-3px)] bg-[#c23d3a] text-[12px] mr-0 h-[34px] leading-[34px] text-white text-center inline-block mx-[3px] hover:bg-[#732423] transition-colors duration-200 ease-in-out"
        >
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default AnswersSection;
