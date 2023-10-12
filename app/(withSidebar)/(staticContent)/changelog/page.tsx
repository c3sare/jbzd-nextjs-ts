import StaticLayout from "../components/StaticLayout";

const ChangeLogPage = () => {
  const ulClassNames = "list-disc my-[1em] pl-[40px]";

  const h4ClassNames = "font-bold my-[1.33em]";

  return (
    <StaticLayout title="Changelog">
      <h4 className={h4ClassNames}>20.07.2023</h4>
      <ul className={ulClassNames}>
        <li>Przywrócono dział {`"pytanie"`}</li>
        <li>
          Dodano wywoływanie autora dzidy w komentarzu poprzez wpisanie @op
        </li>
      </ul>

      <h4 className={h4ClassNames}>12.07.2023</h4>
      <ul className={ulClassNames}>
        <li>
          Dodano opcję wyciszenia działu/subdziału. Użytkownik może wyłączyć
          treści z wybranego działu, treści wyciszone pojawiać będą się jedynie
          na stronie głównej, nie będą wyświetlane w poczekalni i obserwowanych
          działach.
        </li>
      </ul>

      <h4 className={h4ClassNames}>17.06.2023</h4>
      <ul className={ulClassNames}>
        <li>
          Połączyliśmy działy i kategorie (była różnica w strukturze). Od teraz
          wszystko w sekcji {`"Działy"`} to faktycznie działy, które można
          obserwować.
        </li>
        <li>
          W sekcji {`"obserwowane"`} znajdują się zarówno treści z poczekalni,
          jak i ze strony głównej.
        </li>
        <li>
          Dodając treść najważniejsze jest teraz dodanie działu i opcjonalnie
          (jeśli jest taka możliwość) subdziału. Nie wymagamy dodawania tagów.
        </li>
        <li>Usprawniliśmy system zgłaszania niewłaściwych treści.</li>
        <li>
          Z racji zmiany w działach, zmianie uległa belka z danymi nad treścią.
        </li>
        <li>Kolejną zmianą będzie budowa podstrony z rankingami.</li>
      </ul>

      <h4 className={h4ClassNames}>06.01.2023</h4>
      <ul className={ulClassNames}>
        <li>Usunięcie wypierdalajek</li>
        <li>Backend pod wprowadzenie zmian w działach</li>
      </ul>

      <h4 className={h4ClassNames}>22.09.2022</h4>
      <ul className={ulClassNames}>
        <li>
          Możliwość obserwowania działów i użytkowników. Wkrótce nastąpi
          przekształcenie kategorii w działy (połączenie) oraz zostaną dodane
          nowe.
        </li>
      </ul>

      <h4 className={h4ClassNames}>16.08.2022</h4>
      <ul className={ulClassNames}>
        <li>
          Nowa dodawajka treści w wersji beta, prosimy o zgłaszanie ewentualnych
          błędów
        </li>
      </ul>

      <h4 className={h4ClassNames}>26.06.2022</h4>
      <ul className={ulClassNames}>
        <li>
          Można przyznać tylko jedną odznakę tego samego typu na daną tresć
        </li>
      </ul>

      <h4 className={h4ClassNames}>06.06.2022</h4>
      <ul className={ulClassNames}>
        <li>Zmiana zapisu daty dodania - skrócenie</li>
        <li>Przestawienie odznaki {`"wypierdalajka"`} jako pierwszą z lewej</li>
        <li>Zwiększenie limitu wagi video do 150 mb</li>
        <li>
          Dla kont premium dodano w opcji filtracji treści możliwość wpisania
          frazy
        </li>
      </ul>

      <h4 className={h4ClassNames}>02.06.2022</h4>
      <ul className={ulClassNames}>
        <li>
          Przywrócenie działów dla osób bez premium, prośba o wsparcie finansowe
          będzie dobrowolna
        </li>
        <li>Podwojenie premium dla osób które zakupiły premium przed zmianą</li>
        <li>
          Dział {`"premium"`} do zagospodarowania przez użytkowników premium
        </li>
      </ul>

      <h4 className={h4ClassNames}>28.05.2022</h4>
      <ul className={ulClassNames}>
        <li>
          Nowa odznaka na prośbę użytkowników - wypierdalaj - kosztuje 420
          monet, a zabiera z konta obdarowanego 69 monet. Beta, do sprawdzenia
          czy się sprawdza.
        </li>
        <li>
          W miejscu dawnej dodawajki treści i sortowania po plusach z 12 i 24h
          dodaliśmy większy zakres dat dla top, dodaliśmy też filtrację treści
          po jej rodzaju. Wprowadzona zmiana obecna będzie w działach
          zamkniętych, w poczekalni oraz na głównej (zastąpi sekcję top).
        </li>
        <li>
          Codziennie na konto użytkowników premium wpływa dodatkowo 100 monet a
          na konta zwykłych użytkowników 20 monet
        </li>
      </ul>

      <h4 className={h4ClassNames}>24.05.2022</h4>
      <ul className={ulClassNames}>
        <li>Możliwość ukrycia gwiazdki premium przy nicku.</li>
        <li>
          Opcja dla premium pozwalająca na automatyczne ukrywanie komentarzy{" "}
          {`"szarych"`}. Działa analogicznie jak dodanie na czarną listę
          użytkownika.
        </li>
        <li>Poprawka dla tabów w ustawieniach użytkownika.</li>
      </ul>

      <h4 className={h4ClassNames}>23.05.2022</h4>
      <ul className={ulClassNames}>
        <li>Możliwość zarządzania notyfikacjami z poziomu ustawień.</li>
        <li>
          System gamifikacji oparty na monetach i odznakach - zalogowani
          użytkownicy zbierają monety wymienialne na odznaki, które można
          przyznać dla dowolnej treści lub komentarza.
        </li>
      </ul>

      <h4 className={h4ClassNames}>11.05.2022</h4>
      <ul className={ulClassNames}>
        <li>
          Komentarze użytkownika dodanego na czarną listę są ukrywane, jeśli pod
          jego komentarzem toczy się dyskusja to wyświetlona zostaje taka
          informacja wraz z liczbą odpowiedzi.
        </li>
        <li>
          Poprawa wyświetlania zdjęć/gifów w komentarzach - autoodtwarzanie
          gifów, obrazek wyświetla się cały, ale w zmniejszonej proporcji
        </li>
      </ul>

      <h4 className={h4ClassNames}>08.05.2022</h4>
      <ul className={ulClassNames}>
        <li>Zwiększenie liczby możliwych do wpisania tagów z 4 do 10</li>
        <li>Premium na 3 dni za komentarz przypięty na główną</li>
        <li>Wyszukiwarka obrazków uwzględnia od teraz tagi</li>
        <li>
          Przy włączonym video gdy zescrollujemy stronę niżej, player
          automatycznie się zatrzymuje
        </li>
      </ul>

      <h4 className={h4ClassNames}>05.05.2022</h4>
      <ul className={ulClassNames}>
        <li>Zmiana playera video</li>
        <li>Nowy header</li>
        <li>
          Wyszukiwarka obrazków, użytkowników i tagów w fazie beta (wpisujcie
          tytuły by zwiększyć jej skuteczność)
        </li>
        <li>
          Narzędzie administracyjne do uzupełniania fraz dla wyszukiwarki pod
          dzidami
        </li>
        <li>
          Obniżenie ceny {`"jbzd premium"`} oraz zmiana podstrony zakupu premium
        </li>
        <li>Dodanie płatności via PaySafeCard</li>
        <li>Poprawienie sekcji ulubione dla użytkowników premium</li>
        <li>
          Możliwość dodawania komentarzy do ulubionych dla użytkowników premium
        </li>
        <li>
          Zmiana formy banowania użytkownika - ban jedynie na aktywność
          użytkownika (user nie może plusować, dodawać treści, komentarzy,
          zgłaszać), a nie na całe konto (użytkownik może dalej korzystać z
          dzidy jako zalogowany, korzystać z sekcji ulubione, przeglądać
          zamknięte działy)
        </li>
        <li>
          Przygotowania pod stworzenie aplikacji jbzd z pełną funkcjonalnością w
          formie .apk dostępnego poza sklepem i bez reklam dla użytkowników
          premium
        </li>
        <li>
          Przedłużenie premium użytkownikom, którzy aktualnie je posiadają x3
        </li>
        <li>Uporządkowanie panelu rejestracji i logowania</li>
        <li>
          W wiadomościach prywatnych widoczne są kolory nicków oraz daty
          wysłania wiadomości (były tylko godziny)
        </li>
        <li>Poprawa plusowania</li>
        <li>Nowy styl wyświetlania tekstów w dzidach</li>
        <li>Zarządzanie czarnymi listami z poziomu ustawień</li>
        <li>
          Szybki dostęp do skróconego profilu po jednym kliknięciu na nick
        </li>
        <li>Skrócenie odstępów między dodawaniem treści do 5 minut</li>
      </ul>
    </StaticLayout>
  );
};

export default ChangeLogPage;
