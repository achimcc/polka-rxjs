import { useParams } from "react-router-dom";
import Call from "../components/Call";
import CallResults from "../components/CallResults";

interface RouteParams {
  address: string;
}

const ExecutePage = () => {
  const { address } = useParams<RouteParams>();
  return (
    <>
      <Call address={address} />
      <CallResults />
    </>
  );
};
export default ExecutePage;
