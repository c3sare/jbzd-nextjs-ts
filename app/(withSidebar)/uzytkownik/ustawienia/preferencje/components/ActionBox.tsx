import { Dispatch, SetStateAction } from "react";
import ActionItem from "./ActionItem";
import SubHeader from "./SubHeader";

export type ActionBoxProps<T> = {
  title: string;
  items: T[];
  deleteEndpoint: string;
  objectKey: keyof T;
  nameKey: string;
  hashBeforeName?: boolean;
  lockBoxes: boolean;
  setLockBoxes: Dispatch<SetStateAction<boolean>>;
};

function ActionBox<T>({
  items,
  title,
  deleteEndpoint,
  objectKey,
  nameKey,
  hashBeforeName,
  lockBoxes,
  setLockBoxes,
}: ActionBoxProps<T>) {
  return (
    items.length > 0 && (
      <>
        <SubHeader>{title}</SubHeader>
        <div className="mb-[25px]">
          {items.map((item: any) => (
            <ActionItem
              key={item.id}
              endpoint={deleteEndpoint}
              id={item.id}
              title={(hashBeforeName ? "#" : "") + item[objectKey][nameKey]}
              lockBoxes={lockBoxes}
              setLockBoxes={setLockBoxes}
            />
          ))}
        </div>
      </>
    )
  );
}

export default ActionBox;
