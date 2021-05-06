import { useParams } from "react-router-dom";
import Call from "../components/Call";

interface RouteParams {
  address: string;
}

const ExecutePage = () => {
  const { address } = useParams<RouteParams>();
  return (
    <>
      <Call address={address} />
    </>
  );
};
export default ExecutePage;
