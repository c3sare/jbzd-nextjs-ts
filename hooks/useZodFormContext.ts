import { ZodFormHookReturn } from "@/components/forms/ZodForm";
import { FieldValues, useFormContext } from "react-hook-form";

export default function useZodFormContext<T extends FieldValues>() {
  return useFormContext() as unknown as ZodFormHookReturn<T>;
}
