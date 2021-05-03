import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";
import Deploy from "./Deploy";

const Contract = () => {
  const { contractStatus, deployMessages } = useSelector((store) => store.ui);
  const messages = deployMessages.map((message) => message.status.type);
  const progress = {
    Endpoint: 0,
    Upload: 25,
    Settings: 50,
    Deploying: 60,
    Deployed: 100,
  };
  return (
    <>
      <Progress progress={progress[contractStatus]} />
      {contractStatus === "Endpoint" && <Connect />}
      {contractStatus === "Upload" && <UploadFile />}
      {contractStatus === "Settings" && <Settings />}
      {contractStatus === "Deploying" && (
        <Deploy messages={messages} isDeploying />
      )}
      {contractStatus === "Deployed" && <Deploy messages={messages} />}
    </>
  );
};

export default Contract;
