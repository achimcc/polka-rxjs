import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";
import Deploy from "./Deploy";
import { JsxEmit } from "typescript";

const Contract = () => {
  const { contractStatus, deployMessages, contractName } = useSelector(
    (store) => store.ui
  );
  const progress = {
    Endpoint: 0,
    Upload: 25,
    Settings: 50,
    Deploying: 60,
    Deployed: 100,
  };
  const statusComponent = {
    Endpoint: Connect,
    Upload: UploadFile,
    Settings: () => Settings({ name: contractName }),
    Deploying: () => Deploy({ messages: deployMessages, isDeploying: true }),
    Deployed: () => Deploy({ messages: deployMessages, isDeploying: false }),
  };

  const Status = statusComponent[contractStatus];

  return (
    <>
      <Progress progress={progress[contractStatus]} />
      <Status />
    </>
  );
};

export default Contract;
