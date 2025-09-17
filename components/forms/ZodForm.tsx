import React, {
  DOMAttributes,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from "react";
import ErrorBox from "./ErrorBox";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export type ZodFormHookReturn<T extends FieldValues> = UseFormReturn<T> & {
  isError: boolean;
  isLoading: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type FormProps<T extends FieldValues> = {
  formHook: ZodFormHookReturn<T>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
} & HTMLAttributes<HTMLFormElement> &
  Omit<DOMAttributes<HTMLFormElement>, "onSubmit">;

function Form<T extends FieldValues>({
  formHook,
  className,
  onSubmit,
  children,
}: FormProps<T>) {
  const router = useRouter();
  return (
    <FormProvider {...formHook}>
      <form onSubmit={onSubmit} className={clsx("relative", className)}>
        {children}
        {formHook.isError && (
          <ErrorBox
            onClick={() => {
              formHook.setIsError(false);
              formHook.setIsLoading(true);
              router.refresh();
            }}
          />
        )}
      </form>
    </FormProvider>
  );
}

export default Form;
