import Button from "../sidebar/components/forms/components/Button";

type ErrorBoxProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ErrorBox: React.FC<ErrorBoxProps> = ({ onClick }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-[rgba(0,_0_,0_,_0.5)]">
      <p className="pb-4">Wystąpił problem przy pobieraniu danych!</p>
      {onClick && <Button onClick={onClick}>Załaduj ponownie</Button>}
    </div>
  );
};

export default ErrorBox;
