import React from "react";
import LoadingBox from "../LoadingBox";
import ErrorBox from "./ErrorBox";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type FormProps<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
  getInitialFormData?: (reset?: UseFormReset<T>) => Promise<any>;
  reset: UseFormReset<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
};

function Form<T extends FieldValues>({
  children,
  isLoading,
  isError,
  handleSubmit,
  getInitialFormData,
  onSubmit,
  register,
  errors,
  setValue,
  watch,
  reset,
}: FormProps<T>) {
  return (
    <form onSubmit={handleSubmit!(onSubmit!)} className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const addProps = {
            register,
            errors,
            disabled: isLoading,
          };
          if (child.props?.id) {
            if (child.props?.type === "date") {
              return React.cloneElement(child, {
                ...child.props,
                ...addProps,
                setValue,
                watch,
              });
            }
            return React.cloneElement(child, {
              ...child.props,
              ...addProps,
            });
          } else if (child.props?.type === "submit") {
            return React.cloneElement(child, {
              ...child.props,
              disabled: addProps.disabled,
            });
          }
        }

        return child;
      })}
      {isLoading && <LoadingBox />}
      {isError && (
        <ErrorBox
          onClick={
            getInitialFormData && reset
              ? () => getInitialFormData(reset)
              : () => null
          }
        />
      )}
    </form>
  );
}

export default Form;
