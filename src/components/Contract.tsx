import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";

const Contract = () => {
  const { contractStatus } = useSelector((store) => store.ui);
  const progress =
    contractStatus === "Endpoint"
      ? 0
      : contractStatus === "Upload"
      ? 25
      : contractStatus === "Settings"
      ? 50
      : contractStatus === "Deploying"
      ? 75
      : 100;
  return (
    <>
      <Progress progress={progress} />
      {contractStatus === "Endpoint" && <Connect />}
      {contractStatus === "Upload" && <UploadFile />}
      {(contractStatus === "Settings" || contractStatus === "Deploying") && (
        <Settings isDeploying={contractStatus === "Deploying"} />
      )}
    </>
  );
};

export default Contract;
