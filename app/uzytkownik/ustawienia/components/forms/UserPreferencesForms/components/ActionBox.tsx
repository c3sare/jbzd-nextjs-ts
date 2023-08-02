import ActionItem from "./ActionItem";
import SubHeader from "./SubHeader";

type ActionBoxProps<T> = {
  title: string;
  items: T[];
  deleteEndpoint: string;
  objectKey: keyof T;
  nameKey: string;
  hashBeforeName?: boolean;
};

function ActionBox<T>({
  items,
  title,
  deleteEndpoint,
  objectKey,
  nameKey,
  hashBeforeName,
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
            />
          ))}
        </div>
      </>
    )
  );
}

export default ActionBox;
