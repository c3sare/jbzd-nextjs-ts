"use client";

import useZodForm from "@/hooks/useZodForm";
import UserNotificationsSchema, {
  UserNotificationsType,
} from "@/validators/UserSettings/UserNotificationsSchema";
import Button from "@/components/Button";
import LabelCheckbox from "@/components/LabelCheckbox";
import Heading from "../../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

type NotifySettingsProps = {
  data: UserNotificationsType;
};

const NotifySettings: React.FC<NotifySettingsProps> = ({ data }) => {
  const router = useRouter();
  const form = useZodForm({
    schema: UserNotificationsSchema,
    defaultValues: data,
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/user/settings/notifications", data)
      .then((res) => res.data)
      .then(() => {
        toast.success("Pomyślnie zmieniono!");
        router.refresh();
      });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="mx-auto max-w-[360px]">
        <Heading>Ustawienia notyfikacji</Heading>
        <LabelCheckbox
          id="newOrders"
          label="Powiadomienia o nowych odznakach"
        />
        <LabelCheckbox id="newMarks" label="Powiadomienia o oznaczeniach" />
        <LabelCheckbox
          id="commentsOnHomePage"
          label="Powiadomienia o komentarzach na głównej"
        />
        <LabelCheckbox
          id="newComments"
          label="Powiadomienia o nowych komentarzach"
        />
        <Button type="submit">Zapisz</Button>
      </form>
    </FormProvider>
  );
};

export default NotifySettings;
