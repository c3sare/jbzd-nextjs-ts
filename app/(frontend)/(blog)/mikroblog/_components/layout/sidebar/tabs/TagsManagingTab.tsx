import Box from "../Box";
import EmptyBoxElement from "../EmptyBoxElement";

const TagsManagingTab: React.FC = () => {
  return (
    <>
      <Box title="Obserwowane tagi:">
        <EmptyBoxElement />
      </Box>
      <Box title="Czarna lista tagów:">
        <EmptyBoxElement />
      </Box>
    </>
  );
};

export default TagsManagingTab;
