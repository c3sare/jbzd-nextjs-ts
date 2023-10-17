"use client";

import ZodForm from "@/components/forms/ZodForm";
import useZodForm from "@/hooks/useZodForm";
import UserNotificationsSchema, {
  UserNotificationsType,
} from "@/validators/UserSettings/UserNotificationsSchema";
import Button from "@/components/Button";
import LabelCheckbox from "@/components/LabelCheckbox";
import Heading from "../../components/Heading";

type NotifySettingsProps = {
  data: UserNotificationsType;
};

const NotifySettings: React.FC<NotifySettingsProps> = ({ data }) => {
  const { zodFormComponentProps, watch, isLoading } =
    useZodForm<UserNotificationsType>({
      zodSchema: UserNotificationsSchema,
      pushFormDataEndpoint: "/api/user/settings/notifications",
      defaultFormValues: data,
    });

  return (
    <ZodForm {...zodFormComponentProps} className="mx-auto max-w-[360px]">
      <Heading>Ustawienia notyfikacji</Heading>
      <LabelCheckbox
        watch={watch}
        id="newOrders"
        label="Powiadomienia o nowych odznakach"
      />
      <LabelCheckbox
        watch={watch}
        id="newMarks"
        label="Powiadomienia o oznaczeniach"
      />
      <LabelCheckbox
        watch={watch}
        id="commentsOnHomePage"
        label="Powiadomienia o komentarzach na głównej"
      />
      <LabelCheckbox
        watch={watch}
        id="newComments"
        label="Powiadomienia o nowych komentarzach"
      />
      <Button type="submit">Zapisz</Button>
    </ZodForm>
  );
};

export default NotifySettings;
