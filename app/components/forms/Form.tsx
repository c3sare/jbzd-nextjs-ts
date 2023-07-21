import LoadingBox from "../LoadingBox";
import ErrorBox from "./ErrorBox";

type FormProps = {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isError: boolean;
  children?: React.ReactNode;
};

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  isLoading,
  isError,
}) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      {children}
      {isLoading && <LoadingBox />}
      {isError && <ErrorBox onClick={() => getInitialFormData(reset)} />}
    </form>
  );
};

export default Form;
