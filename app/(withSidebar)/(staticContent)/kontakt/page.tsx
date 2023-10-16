"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import StaticLayout from "../components/StaticLayout";
import Form from "@/app/components/forms/ZodForm";
import Input from "@/app/components/Input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ContactSchema, { ContactType } from "@/validators/ContactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/app/components/Button";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  accept: false,
};

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formHook = useForm<ContactType>({
    defaultValues,
    resolver: zodResolver(ContactSchema),
  });

  const clearForm = () => formHook.reset(defaultValues);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/report-form")
      .then((res) => res.data)
      .then(() => {
        toast.success("Pomyślnie wysłano zgłoszenie!");
        clearForm();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy wysyłaniu!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const zodFormProps = {
    ...formHook,
    onSubmit,
    isLoading,
    errors: formHook.formState.errors,
    isError: false,
  };

  return (
    <StaticLayout title="Kontakt">
      <p>Masz jakiś problem? Skontaktuj się z nami!</p>
      <Form {...zodFormProps} className="max-w-[300px] mx-auto">
        <Input id="firstName" placeholder="Imię" />
        <Input id="lastName" placeholder="Nazwisko" />
        <Input id="email" placeholder="E-Mail" />
        <Input id="phone" placeholder="Telefon" />
        <Input type="textarea" id="message" placeholder="Wiadomość" />
        <Button type="submit">Wyślij</Button>
      </Form>
    </StaticLayout>
  );
};

export default ContactPage;
