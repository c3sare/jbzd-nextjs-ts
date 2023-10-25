"use client";

import { PropsWithChildren, createContext, useState } from "react";

export const TermsContext = createContext({ toggleTerms: () => {} });

const TermsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleTerms = () => setIsVisible(!isVisible);

  return (
    <TermsContext.Provider value={{ toggleTerms }}>
      {children}
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_.6)] z-[9999]">
          <div className="mx-auto max-w-[750px] p-[25px] w-[98%] my-[25px] bg-[#313131] text-white border-2 border-[#383737] overflow-hidden">
            <div>
              <h2 className="text-[26px] m-[0_0_10px] font-bold">Regulamin</h2>
              <div className="pb-[15px]">
                <div className="text-[16px] leading-[1.3em]">
                  <section className="text-[12px]">
                    <div className="h-[40vh] mx-auto relative pr-[20px] bg-transparent">
                      <div className="transition-all ease-in duration-500">
                        <div>
                          1. Dołączając do mikroblogu na stronie JBZDY.NET
                          akceptujesz poniższy regulamin.
                          <br />
                          <br />
                          2. Dodając post pamiętaj, że jeżeli są na nim widoczne
                          dane osobowe kogoś (nawet własne) to powinny zostać
                          zamazane, dotyczy to również zdjęć.
                          <br />
                          <br />
                          3.Każdy post musi być odpowiednio otagowany (w
                          szczególności politykę, anime), pamiętaj, że nie każdy
                          lubi oglądać to co Ty, a dzięki tagom może ukryć
                          posty.
                          <br />
                          <br />
                          4. W avatarze nie wolno umieszczać symboli
                          zabronionych, nagości i innych treści 18 - nie
                          dostosowanie się do regulaminu oznacza ban.
                          <br />
                          <br />
                          5. Pisząc każdy post lub komentarz powinieneś dbać o
                          kulturę wypowiedzi, stosować się do zasad netykiety
                          oraz używać wulgaryzmów tylko w niezbędnych
                          przypadkach.
                          <br />
                          <br />
                          6. Jeżeli znalazłeś błąd na blogu to możesz
                          skontaktować się poprzez fanpage lub napisać post na
                          mikroblogu z tagiem #admin
                          <br />
                          <br />
                          7. Za co można zostać zbanowanym:
                          <br />
                          <br />
                          - Spam
                          <br />
                          - Nadużywanie wulgaryzmów
                          <br />
                          - Organizowanie masowych ataków na inne serwisy (tzw
                          “rajdy”)
                          <br />
                          - Nagminne zgłaszanie postów/osób które nie łamią
                          regulaminu, a po prostu głoszą własną opinię na dany
                          temat
                          <br />
                          - Nawoływanie do “plusowania” na zewnętrznych
                          serwisach
                          <br />
                          - Nawoływanie do nienawiści
                          <br />
                          - Znęcanie się nad zwierzętami, ludźmi etc.
                          <br />
                          - Gore
                          <br />
                          - Loli
                          <br />
                          - Treści pedofilskie
                          <br />
                          - Nie oznaczenie treści dla dorosłych jako 18
                          <br />
                          <br />
                          8. Co oznaczają ikonki przy avatarze:
                          <br />
                          <br />
                          - 1 banan oznacza konto założone nie później niż
                          miesiąc temu
                          <br />
                          - 2 banany oznaczają konto istniejące od minimum
                          jednego miesiąca
                          <br />
                          - 3 banany oznaczają konto użytkownika znajdującego
                          się w top 1000 rankingu aktywności
                          <br />
                          - Włócznia oznacza konto użytkownika znajdującego się
                          w top 200 rankingu aktywności
                          <br />
                          - Małpa oznacza konto admina
                          <br />
                          Aktualnie oznaczanie działa tylko na mikroblogu, w
                          przyszłości do rankingu aktywności dołączone zostaną
                          również obrazki znajdujące się na stronie głównej.
                          <br />
                          <br />
                          Mikroblog działa w wersji beta, co oznacza, że
                          regulamin może ulegać zmianom.
                        </div>
                      </div>
                      <div>
                        <div className="w-[6px] h-full top-0 right-0 opacity-50 absolute transition-all duration-500 ease-in bg-[#1f1f1f]">
                          <div className="h-[13.6577%] top-[0%] bg-[#68696b] width-[6px] cursor-pointer relative transition-all duration-500 ease-in" />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="text-center bg-[#1f1f1f] mx-[-25px] mb-[-25px] p-[25px] relative">
                <button
                  className="text-white bg-[#c23d3a] transition-colors duration-200 ease-in-out uppercase text-[14px] p-[10px_30px] inline-block relative min-w-[80px] text-center outline-none appearance-none font-bold hover:bg-[#732423]"
                  onClick={toggleTerms}
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TermsContext.Provider>
  );
};

export default TermsProvider;
