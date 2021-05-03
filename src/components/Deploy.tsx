import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";

const Deploy = () => {
  const { contractStatus } = useSelector((store) => store.ui);
  const progress =
    contractStatus === "Endpoint"
      ? 0
      : contractStatus === "Upload"
      ? 25
      : contractStatus === "Settings"
      ? 50
      : 75;

  return (
    <>
      <Progress progress={progress} />
      {contractStatus === "Endpoint" && <Connect />}
      {contractStatus === "Upload" && <UploadFile />}
      {contractStatus === "Settings" && <Settings isReadyToDeploy />}
    </>
  );
};

export default Deploy;
