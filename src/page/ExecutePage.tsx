import { useParams } from "react-router-dom";

interface RouteParams {
  address: string;
}

const ExecutePage = () => {
  const params = useParams<RouteParams>();
  return <>{params.address}</>;
};
export default ExecutePage;
