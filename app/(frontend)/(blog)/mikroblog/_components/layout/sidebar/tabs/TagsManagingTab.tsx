import Box from "../authorized/Box";
import EmptyBoxElement from "../authorized/EmptyBoxElement";

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
