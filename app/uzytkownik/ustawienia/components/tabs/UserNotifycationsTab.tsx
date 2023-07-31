import ZodForm from "@/app/components/forms/ZodForm";
import Heading from "../Heading";
import useZodForm from "@/app/hooks/useZodForm";
import UserNotificationsSchema, {
  UserNotificationsType,
} from "@/app/formSchemas/UserNotificationsSchema";
import LabelCheckbox from "../forms/UserNotifycationsForms/components/LabelCheckbox";
import Button from "@/app/components/sidebar/components/forms/components/Button";

const UserNotyficationsTab = () => {
  const { zodFormComponentProps, watch } = useZodForm<UserNotificationsType>({
    zodSchema: UserNotificationsSchema,
    pushFormDataEndpoint: "/api/user/settings/notifications",
  });

  return (
    <>
      <Heading>Ustawienia notyfikacji</Heading>
      <ZodForm {...zodFormComponentProps}>
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
    </>
  );
};

export default UserNotyficationsTab;
