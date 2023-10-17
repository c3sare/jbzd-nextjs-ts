import StaticLayout from "../components/StaticLayout";

const FaqPage = () => {
  const paragraphClassName = "mt-0 mb-[10px]";

  return (
    <StaticLayout title="FAQ">
      <p className={paragraphClassName}>
        <strong>
          <span>Kolory nicków</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span style={{ color: "rgb(255, 255, 255)" }}>Biały</span>
        </strong>
        <span>
          {" "}
          oznacza nowego użytkownika posiadającego konto poniżej miesiąca
        </span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span style={{ color: "rgb(56, 118, 29)" }}>Zielony</span>
        </strong>
        <span> oznacza użytkownika posiadającego konto powyżej miesiąca</span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span style={{ color: "rgb(255, 0, 0)" }}>Czerwony</span>
        </strong>
        <span>
          {" "}
          oznacza użytkownika który konto ma powyżej 6 miesięcy oraz minimum
          jednego mema na głównej
        </span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span style={{ color: "rgb(183, 183, 183)" }}>Szary</span>
        </strong>
        <span>
          {" "}
          oznacza użytkownika który w komentarzach ma więcej minusów niż plusów
        </span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span style={{ color: "rgb(255, 255, 0)" }}>Złoty</span>
        </strong>
        <span>
          {" "}
          nick otrzymuje top 100 użytkowników, według poniższych parametrów:
        </span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <span>[liczba plusów pod memami z ostatnich 90 dni x 5]&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span>+</span>
        </strong>
        <span>&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <span>
          [liczba plusów pod komentarzami z ostatnich 90 dni x 2]&nbsp;
        </span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span>+</span>
        </strong>
        <span>&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <span>[złota odznaka z ostatnich 90 dni x 20]&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span>+</span>
        </strong>
        <span>&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <span>[srebrna x 8]&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span>+</span>
        </strong>
        <span>&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <span>[kamienna x 2]&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <strong>
          <span>-</span>
        </strong>
        <span>&nbsp;</span>
      </p>
      <p className={paragraphClassName}>
        <span>[liczba minusów pod komentarzami x2]</span>
      </p>
      <p>
        <br />
      </p>
      <p className={paragraphClassName}>
        <span>
          Zliczanie punktów odbywa się raz na tydzień, a zmiana kolorów nicków
          odbywa się raz dziennie.
        </span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <strong>
          <span>Obserwowane działy i użytkownicy</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        <span>
          Każdy dział lub subdział można dodać do obserwowanych. W sekcji
          obserwowane wyświetlają się wszystkie treści (w poczekalni nie ma
          treści, które zostały przeniesione na stronę główną).
        </span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <strong>
          <span>Wyciszanie działów</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        <span>
          Każdy dział lub subdział można wyciszyć. Po wyciszeniu
          działu/subdziału wszystkie treści zostają ukryte. Treść z wyciszonego
          subdziału widoczna jest jedynie w przypadku przeniesienia jej na
          stronę główną.
        </span>
      </p>
      <p className={paragraphClassName}>
        <span>
          Dzięki wyciszaniu można np. wykluczyć politykę lub sport z poczekalni,
          można również obserwować cały dział np.{" "}
        </span>
        <strong>
          <span>Rozrywka</span>
        </strong>
        <span>, ale wyciszyć z niego i nie otrzymywać treści z subdziału </span>
        <strong>
          <span>Rozrywka -&gt; Planszówki.</span>
        </strong>
        <span>&nbsp;</span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <strong>
          <span>Dostęp do działów</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        <span>Zalogowany użytkownik otrzymuje pełne dostępy po tygodniu.</span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <strong>
          <span>Odzyskiwanie konta założonego przez facebook</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        <span>
          Z racji nagłego zablokowania naszej aplikacji facebook developer nie
          ma możliwości logowania się via facebook. Podając adres e-mail
          przypisany do swojego konta facebook można przejść procedurę
          odzyskiwania hasła via mail i logować się tradycyjne.&nbsp;
        </span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <strong>
          <span>Premium za dodawanie treści</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        <span>
          Użytkownik którego dzida lub komentarz trafiły na główną otrzymuje
          automatycznie tydzień konta premium.
        </span>
      </p>
      <p>&nbsp;</p>
      <p className={paragraphClassName}>
        <strong>
          <span>Oznaczanie użytkowników w komentarzach</span>
        </strong>
      </p>
      <p className={paragraphClassName}>
        Aby wywołać w komentarzu autora dzidy należy wpisać: @op <br />
        Aby wywołać innego użytkownika w komentarzu należy wpisać: @[nickname]
      </p>
    </StaticLayout>
  );
};

export default FaqPage;
