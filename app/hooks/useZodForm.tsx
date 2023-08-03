import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DeepPartial,
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
  clearFormAfterChange?: boolean;
  defaultFormValues?: DeepPartial<T>;
  successDataFetchCallback?: (data?: AxiosResponse<any>) => void;
  customSuccessMessage?: string;
  refreshPageAfterSuccessSubmit?: boolean;
} & Omit<UseFormProps<T>, "defaultValues" | "resolver">;

const storedData: any = {};

function useZodForm<T extends FieldValues>({
  zodSchema,
  initialFormDataEndpoint,
  pushFormDataEndpoint,
  pushFormDataMethod,
  clearFormAfterChange,
  successDataFetchCallback,
  customSuccessMessage,
  defaultFormValues,
  refreshPageAfterSuccessSubmit = true,
  ...rest
}: UseZodFormProps<T>) {
  const router = useRouter();
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
      const request = await axios.get(initialFormDataEndpoint || "");
      const response = request.data;
      storedData[initialFormDataEndpoint as string] = response;
      if (reset) reset(response);
      setIsLoading(false);
      if (!reset) return response;
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
      : defaultFormValues!,
    ...rest,
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    setIsLoading(true);
    axios({
      method: pushFormDataMethod || "POST",
      url: pushFormDataEndpoint,
      data,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            customSuccessMessage || "Dane zostały zaaktualizowane!"
          );
          if (initialFormDataEndpoint)
            storedData[initialFormDataEndpoint as string] = response.data;
          if (successDataFetchCallback) successDataFetchCallback(response);
          if (clearFormAfterChange) reset();
          if (refreshPageAfterSuccessSubmit) router.refresh();
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
    isError,
    isLoading,
    setIsLoading,
    zodFormComponentProps,
  };
}

export default useZodForm;
