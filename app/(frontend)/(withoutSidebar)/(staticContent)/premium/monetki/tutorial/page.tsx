import Image from "next/image";

const CoinsTutorialPage = () => {
  return (
    <div className="text-white my-[50px]">
      <div className="max-w-[695px] w-full text-center mx-auto mb-[50px]">
        <Image
          width={61}
          height={55}
          alt="Monety"
          className="h-auto max-w-full mx-auto"
          src="/images/coins/big_badges.png"
        />
        <div className="sm:text-[41px] text-[36px]">Odznaki</div>
        <p className="text-[16px] sm:text-[18px] sm:px-[15px]">
          Prócz przyznawania plusów możesz obdarować szczególną dzidę lub
          komentarz odznaką: <strong>kamienną, srebrną bądź złotą</strong>
        </p>
      </div>
      <div className="flex w-full max-w-[695px] mx-auto mb-[50px] gap-[5px_0] flex-col">
        <div className="flex-nowrap bg-[#181818] p-[25px] gap-[20px] w-full flex">
          <div className="flex basis-[40px] sm:basis-[80px] text-center justify-center items-center">
            <Image
              width={32}
              height={32}
              alt="Moneta średnia"
              className="h-auto max-w-full"
              src="/images/coins/medium_coin.png"
            />
          </div>
          <div className="basis-[calc(100%_-_40px)] text-[15px] sm:basis-[calc(100%_-_80px)] sm:text-[18px]">
            Ich pula ograniczona jest saldem monet tak, by przyznawane były
            przez ciebie szczególnym treściom które uważasz za warte
            uhonorowania.
          </div>
        </div>
        <div className="flex-nowrap bg-[#181818] p-[25px] gap-[20px] w-full flex">
          <div className="flex basis-[40px] sm:basis-[80px] text-center justify-center items-center">
            <Image
              width={44}
              height={40}
              alt="Plus"
              className="h-auto max-w-full"
              src="/images/coins/medium_add.png"
            />
          </div>
          <div className="basis-[calc(100%_-_40px)] text-[15px] sm:basis-[calc(100%_-_80px)] sm:text-[18px]">
            Użytkownik bez konta premium otrzymuje codziennie na swoje konto{" "}
            <strong>20 monet</strong>, użytkownik premium otrzymuje{" "}
            <strong>100 monet.</strong>
          </div>
        </div>
        <div className="flex-nowrap bg-[#181818] p-[25px] gap-[20px] w-full flex">
          <div className="flex basis-[40px] sm:basis-[80px] text-center justify-center items-center">
            <Image
              width={44}
              height={40}
              alt="Plus"
              className="h-auto max-w-full"
              src="/images/coins/medium_add.png"
            />
          </div>
          <div className="basis-[calc(100%_-_40px)] text-[15px] sm:basis-[calc(100%_-_80px)] sm:text-[18px]">
            Użytkownik bez konta premium otrzymuje co tydzień na swoje konto{" "}
            <strong>200 monet</strong>, użytkownik premium otrzymuje{" "}
            <strong>2600 monet.</strong>
          </div>
        </div>
        <div className="flex-nowrap bg-[#181818] p-[25px] gap-[20px] w-full flex">
          <div className="flex basis-[40px] sm:basis-[80px] text-center justify-center items-center">
            <Image
              width={44}
              height={40}
              alt="Monetki"
              className="h-auto max-w-full"
              src="/images/coins/medium_badges.png"
            />
          </div>
          <div className="basis-[calc(100%_-_40px)] text-[15px] sm:basis-[calc(100%_-_80px)] sm:text-[18px]">
            Przy każdej treści widnieje przycisk przyznania nagrody - kliknij i
            wybierz którą odznakę chciałbyś wysłać. Monety za kupno odznaki
            pobrane zostaną automatycznie.
          </div>
        </div>
      </div>

      <div className="flex gap-[0_25px] min-h-[400px] mx-auto">
        <div className="w-full sm:w-1/3 bg-[#181818] rounded-[10px] p-[30px]">
          <div className="text-center">
            <Image
              width={274}
              height={398}
              alt="Kamienna dzida"
              className="h-auto max-w-full"
              src="/images/coins/big_stone.png"
            />
          </div>
          <div className="text-center text-[30px] py-[10px]">
            Kamienna dzida
          </div>
          <div className="text-center text-[18px] py-[10px]">
            kosztuje 100 monet
          </div>
          <div className="text-center text-[14px] py-[10px]">
            Obdarowany prócz odznaki otrzyma na swoje konto 20 monet.
          </div>
        </div>
        <div className="w-full sm:w-1/3 bg-[#181818] rounded-[10px] p-[30px]">
          <div className="text-center">
            <Image
              width={274}
              height={398}
              alt="Srebrna dzida"
              className="h-auto max-w-full"
              src="/images/coins/big_silver.png"
            />
          </div>
          <div className="text-center text-[30px] py-[10px]">Srebrna dzida</div>
          <div className="text-center text-[18px] py-[10px]">
            kosztuje 400 monet
          </div>
          <div className="text-center text-[14px] py-[10px]">
            Obdarowany prócz odznaki otrzyma na swoje konto 150 monet.
          </div>
        </div>
        <div className="w-full sm:w-1/3 bg-[#181818] rounded-[10px] p-[30px]">
          <div className="text-center">
            <Image
              width={274}
              height={398}
              alt="Złota dzida"
              className="h-auto max-w-full"
              src="/images/coins/big_gold.png"
            />
          </div>
          <div className="text-center text-[30px] py-[10px]">Złota dzida</div>
          <div className="text-center text-[18px] py-[10px]">
            kosztuje 1000 monet
          </div>
          <div className="text-center text-[14px] py-[10px]">
            Obdarowany prócz odznaki otrzyma na swoje konto 500 monet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsTutorialPage;
