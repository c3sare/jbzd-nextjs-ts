import ActionItem from "./ActionItem";
import SubHeader from "./SubHeader";

type ActionBoxProps<T> = {
  title: string;
  items: T[];
  deleteEndpoint: string;
  handleDelete: (id: string) => void;
  objectKey: keyof T;
  nameKey: string;
};

function ActionBox<T>({
  items,
  title,
  deleteEndpoint,
  handleDelete,
  objectKey,
  nameKey,
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
              title={"#" + item[objectKey][nameKey]}
              deleteFunction={handleDelete}
            />
          ))}
        </div>
      </>
    )
  );
}

export default ActionBox;
