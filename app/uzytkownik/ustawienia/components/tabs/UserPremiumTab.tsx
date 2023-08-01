import ZodForm from "@/app/components/forms/ZodForm";
import UserPremiumSchema, {
  UserPremiumType,
} from "@/app/formSchemas/UserPremiumSchema";
import useZodForm from "@/app/hooks/useZodForm";
import LabelCheckbox from "../forms/UserNotifycationsForms/components/LabelCheckbox";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import RadioSelect from "@/app/components/forms/RadioSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import BigButton from "../forms/BigButton";

const cache: {
  [key: string]: any;
} = {};

const UserPremiumTab = () => {
  const endpointPremiumData = "/api/user/settings/premium";
  const [isPremium, setIsPremium] = useState<boolean>(
    Boolean(cache[endpointPremiumData]?.isPremium || false)
  );
  const {
    zodFormComponentProps,
    watch,
    register,
    setIsLoading,
    reset,
    setValue,
  } = useZodForm<UserPremiumType>({
    zodSchema: UserPremiumSchema,
    pushFormDataEndpoint: "/api/user/settings/premium",
    successDataFetchCallback: (data) => {
      if (data?.data.premium)
        cache[endpointPremiumData].premium = data.data.premium;
    },
    defaultFormValues: cache[endpointPremiumData]?.premium || {
      hideAds: true,
      picsCountOnPage: 8,
    },
  });

  useEffect(() => {
    if (!cache[endpointPremiumData]) {
      setIsLoading(true);
      axios
        .get(endpointPremiumData)
        .then((res) => {
          cache[endpointPremiumData] = res.data;
          if (res.data.isPremium) {
            setIsPremium(true);
            reset(res.data.premium);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Wystąpił problem przy pobieraniu danych!");
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[540px] mx-auto">
      <h1 className="text-[30px] mb-[35px] font-bold">
        Opcje <span className="text-[#b4d132]">Premium</span>
      </h1>
      <div className="max-w-[360px] mx-auto relative">
        {!isPremium && (
          <div className="w-full h-full z-10 absolute top-0 left-0">
            <BigButton
              href="/premium"
              className="absolute top-[140px] left-[50%] translate-x-[-50%]"
            >
              Kup premium
            </BigButton>
          </div>
        )}
        <ZodForm
          {...zodFormComponentProps}
          className={clsx(!isPremium && "blur")}
        >
          <RadioSelect
            register={register}
            watch={watch}
            setValue={setValue}
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
            watch={watch}
            id="adminPostsOff"
            label="Wyłączenie postów administracji"
          />
          <LabelCheckbox
            watch={watch}
            id="commentsPicsGifsOff"
            label="Wyłączenie obrazków/gifów z komentarzy"
          />
          <LabelCheckbox
            watch={watch}
            id="hideNegativeComments"
            label="Ukrywanie zminusowanych komenatrzy"
          />
          <LabelCheckbox watch={watch} id="hideAds" label="Wyłącz reklamy" />
          <LabelCheckbox
            watch={watch}
            id="hideProfile"
            label="Ukrycie profilu (nie można do niego wejść)"
          />
          <LabelCheckbox
            watch={watch}
            id="hidePremiumIcon"
            label="Ukrycie ikonki premium przy nicku (działa z opóźnieniem kilku minutowym!)"
          />
          <LabelCheckbox
            watch={watch}
            id="hideLowReputationComments"
            label="Ukrywanie komenatrzy użytkowników o niskiej reputacji"
          />
          <Button type="submit">Zapisz</Button>
        </ZodForm>
      </div>
    </div>
  );
};

export default UserPremiumTab;
