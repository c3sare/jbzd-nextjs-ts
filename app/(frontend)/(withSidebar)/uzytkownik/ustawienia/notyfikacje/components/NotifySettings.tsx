"use client";

import ZodForm from "@/components/forms/ZodForm";
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

type NotifySettingsProps = {
  data: UserNotificationsType;
};

const NotifySettings: React.FC<NotifySettingsProps> = ({ data }) => {
  const router = useRouter();
  const formHook = useZodForm({
    schema: UserNotificationsSchema,
    defaultValues: data,
  });

  const { handleSubmit, setIsLoading } = formHook;

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    axios
      .post("/api/user/settings/notifications", data)
      .then((res) => res.data)
      .then(() => {
        toast.success("Pomyślnie zmieniono!");
        router.refresh();
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <ZodForm
      formHook={formHook}
      onSubmit={onSubmit}
      className="mx-auto max-w-[360px]"
    >
      <Heading>Ustawienia notyfikacji</Heading>
      <LabelCheckbox id="newOrders" label="Powiadomienia o nowych odznakach" />
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
    </ZodForm>
  );
};

export default NotifySettings;
