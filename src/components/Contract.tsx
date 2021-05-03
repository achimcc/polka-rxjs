import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";
import Deploying from "./Deploy";

const Contract = () => {
  const { contractStatus, deployMessages } = useSelector((store) => store.ui);
  const messages = deployMessages.map((message) => message.status.type);
  const progress =
    contractStatus === "Endpoint"
      ? 0
      : contractStatus === "Upload"
      ? 25
      : contractStatus === "Settings"
      ? 50
      : contractStatus === "Deploying"
      ? 60
      : 100;
  return (
    <>
      <Progress progress={progress} />
      {contractStatus === "Endpoint" && <Connect />}
      {contractStatus === "Upload" && <UploadFile />}
      {contractStatus === "Settings" && <Settings />}
      {contractStatus === "Deploying" && (
        <Deploying messages={messages} isDeploying />
      )}
      {contractStatus === "Deployed" && <Deploying messages={messages} />}
    </>
  );
};

export default Contract;
