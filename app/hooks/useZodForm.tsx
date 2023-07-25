import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PropsWithChildren, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReset,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import LoadingBox from "../components/LoadingBox";
import ErrorBox from "../components/forms/ErrorBox";
import React from "react";

type UseZodFormProps<T extends FieldValues> = {
  zodSchema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
  initialFormDataEndpoint?: string;
  pushFormDataEndpoint: string;
  pushFormDataMethod?: "POST" | "PUT" | "PATCH";
} & Omit<UseFormProps<T>, "defaultValues" | "resolver">;

const storedData: any = {};

function useZodForm<T extends FieldValues>({
  zodSchema,
  initialFormDataEndpoint,
  pushFormDataEndpoint,
  pushFormDataMethod,
  ...rest
}: UseZodFormProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(
    Boolean(
      storedData[initialFormDataEndpoint as string]
        ? false
        : initialFormDataEndpoint
    )
  );
  const [isError, setIsError] = useState<boolean>(false);

  async function getInitialFormData(reset?: UseFormReset<T>) {
    if (storedData[initialFormDataEndpoint as string]) {
      if (reset) {
        return reset(storedData[initialFormDataEndpoint as string]);
      } else {
        return storedData[initialFormDataEndpoint as string];
      }
    }

    if (!isLoading) setIsLoading(true);
    if (isError) setIsError(false);
    try {
      const req = await axios.get(initialFormDataEndpoint || "");
      storedData[initialFormDataEndpoint as string] = req.data;
      if (reset) reset(req.data);
      setIsLoading(false);
      if (!reset) return req.data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err as Error);
        toast.error("Wystąpił problem przy pobieraniu danych!");
        setIsLoading(false);
        setIsError(true);
      }
    }
  }

  const {
    watch,
    getValues,
    getFieldState,
    setError,
    clearErrors,
    setValue,
    trigger,
    formState,
    resetField,
    reset,
    handleSubmit,
    unregister,
    control,
    register,
    setFocus,
  } = useForm<T>({
    resolver: zodResolver(zodSchema),
    defaultValues: initialFormDataEndpoint
      ? () => getInitialFormData()
      : undefined,
    ...rest,
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    setIsLoading(true);
    axios({
      method: pushFormDataMethod || "POST",
      url: pushFormDataEndpoint,
      data,
    })
      .then((data) => {
        if (data.status === 200) {
          toast.success("Dane zostały zaaktualizowane!");
          if (initialFormDataEndpoint) {
            storedData[initialFormDataEndpoint as string] = data.data;
          }
        } else {
          toast.error("Wystąpił nieoczekiwany błąd!");
        }
      })
      .catch((err) => {
        toast.error("Wystąpił nieoczekiwany błąd!");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const Form: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const addProps = {
              register,
              errors: formState.errors,
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
              return React.cloneElement(child, { ...child.props, ...addProps });
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
        {isError && <ErrorBox onClick={() => getInitialFormData(reset)} />}
      </form>
    );
  };

  return {
    watch,
    getValues,
    getFieldState,
    setError,
    clearErrors,
    setValue,
    trigger,
    formState,
    resetField,
    reset,
    handleSubmit,
    unregister,
    control,
    register,
    setFocus,
    isLoading,
    Form,
  };
}

export default useZodForm;
