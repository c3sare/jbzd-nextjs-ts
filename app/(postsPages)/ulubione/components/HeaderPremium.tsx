import ButtonSwitchTab from "@/app/uzytkownik/[username]/components/ButtonSwitchTab";

const HeaderPremium: React.FC<{ isPremium: boolean }> = async ({
  isPremium,
}) => {
  return (
    isPremium && (
      <div className="w-full flex justify-center items-center gap-1 mb-[25px] mx-auto md:mx-0 md:pl-[45px] max-w-[655px]">
        <ButtonSwitchTab href={`/ulubione`}>Memy</ButtonSwitchTab>
        <ButtonSwitchTab href={`/ulubione/komentarze`}>
          Komentarze
        </ButtonSwitchTab>
      </div>
    )
  );
};

export default HeaderPremium;
