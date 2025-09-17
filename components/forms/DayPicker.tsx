import { FieldValues, Path } from "react-hook-form";
import { pl } from "date-fns/locale";
import { DayPicker as DatePicker } from "react-day-picker";
import "@/styles/DayPicker.css";
import useZodFormContext from "@/hooks/useZodFormContext";

type DayPickerProps = {
  id: Path<FieldValues>;
  minDate?: Date;
  maxDate?: Date;
  title?: string;
};

const DayPicker: React.FC<DayPickerProps> = ({
  id,
  minDate,
  maxDate,
  title,
}) => {
  const { watch, setValue, register } = useZodFormContext();
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
