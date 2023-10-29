import Box from "../Box";
import EmptyBoxElement from "../EmptyBoxElement";
import LinkBoxElement from "../LinkBoxElement";

const UserInfoTab: React.FC = () => {
  return (
    <>
      <Box title="Polecane tagi:">
        <LinkBoxElement href="/mikroblog/tag/plech">#plech</LinkBoxElement>
      </Box>
      <Box title="Obserwowane tagi">
        <EmptyBoxElement />
      </Box>
      <Box title="Czarna lista tagów">
        <EmptyBoxElement />
      </Box>
    </>
  );
};

export default UserInfoTab;
