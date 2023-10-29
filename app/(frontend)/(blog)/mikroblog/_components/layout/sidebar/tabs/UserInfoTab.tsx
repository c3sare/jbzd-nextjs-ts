import Box from "../authorized/Box";
import EmptyBoxElement from "../authorized/EmptyBoxElement";
import LinkBoxElement from "../authorized/LinkBoxElement";

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
