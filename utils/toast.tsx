import clsx from "clsx";
import { Toast, toast } from "react-hot-toast";

type NotifyComponent = {
  children?: React.ReactNode;
  className?: string;
  t: Toast;
};

const NotifyComponent: React.FC<NotifyComponent> = ({
  children,
  t,
  className,
}) => (
  <div className="block overflow-hidden max-w-xs m-0 p-0">
    <div
      className={clsx(
        "text-[12px] p-[10px] m-[0_5px_5px] text-white border-l-[5px]",
        className ? className : "bg-sky-400 border-l-sky-600"
      )}
    >
      <div>{children}</div>
    </div>
  </div>
);

const info = (msg: string) => {
  toast.custom((t) => <NotifyComponent t={t}>{msg}</NotifyComponent>);
};

const error = (msg: string) => {
  toast.custom((t) => (
    <NotifyComponent t={t} className="bg-red-500 border-l-red-700">
      {msg}
    </NotifyComponent>
  ));
};

export default { info, error };
