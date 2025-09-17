"use client";

import useZodForm from "@/hooks/useZodForm";
import LabelCheckbox from "@/components/LabelCheckbox";
import Button from "@/components/Button";
import RadioSelect from "@/components/forms/RadioSelect";
import clsx from "clsx";
import BigButton from "./BigButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import type { getPremium } from "@/actions/getPremium";
import UserPremiumSchema from "@/validators/UserSettings/UserPremiumSchema";

type UserPremiumFormProps = {
  data: Awaited<ReturnType<typeof getPremium>>;
};

const UserPremiumForm: React.FC<UserPremiumFormProps> = ({
  data: { isPremium, premium },
}) => {
  const router = useRouter();
  const form = useZodForm({
    schema: UserPremiumSchema,
    defaultValues: premium!,
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/user/settings/premium", data)
      .then((res) => res.data)
      .then(() => {
        toast.success("Pomyślnie zaaktualizowano!");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      });
  });

  return (
    <div className="max-w-[540px] mx-auto">
      <h1 className="text-[30px] mb-[35px] font-bold">
        Opcje <span className="text-[#b4d132]">Premium</span>
      </h1>
      <div className="max-w-[360px] mx-auto relative">
        {!isPremium && (
          <div className="absolute top-0 left-0 z-10 w-full h-full">
            <BigButton
              href="/premium"
              className="absolute top-[140px] left-[50%] translate-x-[-50%]"
            >
              Kup premium
            </BigButton>
          </div>
        )}
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className={clsx(!isPremium && "blur-sm")}>
            <RadioSelect
              label="Wybór liczby obrazków na stronę:"
              id="picsCountOnPage"
              options={[
                {
                  label: "8",
                  value: 8,
                },
                {
                  label: "16",
                  value: 16,
                },
                {
                  label: "32",
                  value: 32,
                },
              ]}
              valueAsNumber
            />
            <LabelCheckbox
              id="adminPostsOff"
              label="Wyłączenie postów administracji"
            />
            <LabelCheckbox
              id="commentsPicsGifsOff"
              label="Wyłączenie obrazków/gifów z komentarzy"
            />
            <LabelCheckbox
              id="hideNegativeComments"
              label="Ukrywanie zminusowanych komenatrzy"
            />
            <LabelCheckbox id="hideAds" label="Wyłącz reklamy" />
            <LabelCheckbox
              id="hideProfile"
              label="Ukrycie profilu (nie można do niego wejść)"
            />
            <LabelCheckbox
              id="hidePremiumIcon"
              label="Ukrycie ikonki premium przy nicku (działa z opóźnieniem kilku minutowym!)"
            />
            <LabelCheckbox
              id="hideLowReputationComments"
              label="Ukrywanie komenatrzy użytkowników o niskiej reputacji"
            />
            <Button type="submit">Zapisz</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UserPremiumForm;
