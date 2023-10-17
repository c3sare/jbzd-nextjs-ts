"use client";

import StaticLayout from "../components/StaticLayout";
import Form from "@/components/forms/ZodForm";
import Input from "@/components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import ContactSchema from "@/validators/ContactSchema";
import Button from "@/components/Button";
import useZodForm from "@/hooks/useZodForm";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  accept: false,
};

const ContactPage = () => {
  const formHook = useZodForm({
    defaultValues,
    schema: ContactSchema,
  });

  const clearForm = () => formHook.reset(defaultValues);

  const { handleSubmit, setIsLoading } = formHook;

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    axios
      .post("/api/report-form", data)
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
  });

  return (
    <StaticLayout title="Kontakt">
      <p>Masz jakiś problem? Skontaktuj się z nami!</p>
      <Form
        formHook={formHook}
        onSubmit={onSubmit}
        className="max-w-[300px] mx-auto"
      >
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
