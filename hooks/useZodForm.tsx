import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UseFormProps, useForm } from "react-hook-form";
import { TypeOf, ZodSchema, z } from "zod";

type ZodFormHookProps<Z extends ZodSchema> = {
  schema: Z;
} & Omit<UseFormProps<TypeOf<Z>>, "resolver">;

export default function useZodForm<Z extends ZodSchema>({
  schema,
  ...rest
}: ZodFormHookProps<Z>) {
  const formHook = useForm<z.infer<typeof schema>>({
    ...rest,
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  return { ...formHook, isLoading, setIsLoading, isError, setIsError };
}
