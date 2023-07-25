import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReset,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UseZodFormProps<T extends FieldValues> = {
  zodSchema: z.ZodType<any, any, any>;
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

  const zodFormComponentProps = {
    isLoading,
    isError,
    getInitialFormData,
    handleSubmit,
    onSubmit,
    register,
    errors: formState.errors,
    setValue,
    watch,
    reset,
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
    zodFormComponentProps,
  };
}

export default useZodForm;
