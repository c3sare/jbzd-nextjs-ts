import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";

export default function useZodFormContext<T extends FieldValues>() {
  return useFormContext() as unknown as UseFormReturn<T>;
}
