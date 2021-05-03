import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";

const Deploy = () => {
  const { contractStatus } = useSelector((store) => store.ui);
  const progress =
    contractStatus === "Endpoint"
      ? 25
      : contractStatus === "Upload"
      ? 50
      : contractStatus === "Settings"
      ? 75
      : 100;

  return (
    <>
      <Progress progress={10} />
      {contractStatus === "Endpoint" && <Connect />}
      {contractStatus === "Upload" && <UploadFile />}
      {contractStatus === "Settings" && <Settings isReadyToDeploy />}
    </>
  );
};

export default Deploy;
