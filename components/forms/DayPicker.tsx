import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import pl from "date-fns/locale/pl";
import { DayPicker as DatePicker } from "react-day-picker";
import "@/styles/DayPicker.css";

type DayPickerProps = {
  register: UseFormRegister<FieldValues>;
  id: Path<FieldValues>;
  minDate?: Date;
  maxDate?: Date;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  title?: string;
};

const DayPicker: React.FC<DayPickerProps> = ({
  register,
  id,
  minDate,
  maxDate,
  watch,
  setValue,
  title,
}) => {
  const value = watch(id);

  const { name } = register(id, { required: true });

  const onSelect = (val: Date | undefined) => {
    if (val) setValue(id, val);
  };

  return (
    <div className="max-w-full">
      {title && (
        <header className="mb-[10px] text-center text-[12px]">{title}</header>
      )}
      <DatePicker
        onSelect={onSelect}
        id={name}
        selected={value}
        locale={pl}
        mode="single"
        toDate={maxDate}
        fromDate={minDate}
      />
    </div>
  );
};

export default DayPicker;
