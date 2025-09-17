import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import * as z from "zod";

type PropsType<TFormValues extends FieldValues> = Omit<
  UseFormProps<TFormValues>,
  "resolver"
> & {
  schema: z.ZodType<TFormValues, TFormValues>;
};

const useZodForm = <TFormValues extends FieldValues>({
  schema,
  ...props
}: PropsType<TFormValues>) => {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    ...props,
  });

  const { isDirty, isLoading, isSubmitting, isValidating } = form.formState;

  const disabledSubmit = useMemo(
    () => !isDirty || isLoading || isSubmitting || isValidating,
    [isDirty, isLoading, isSubmitting, isValidating]
  );

  return { ...form, disabledSubmit };
};

export default useZodForm;
