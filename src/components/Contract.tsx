import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import Connect from "./Connect";
import Progress from "./progress/Progress";
import Settings from "./Settings";
import Deploy from "./Deploy";

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
  const StatusComponent = {
    Endpoint: <Connect />,
    Upload: <UploadFile />,
    Settings: <Settings name={contractName} />,
    Deploying: <Deploy messages={deployMessages} isDeploying />,
    Deployed: <Deploy messages={deployMessages} />,
  };

  return (
    <>
      <Progress progress={progress[contractStatus]} />
      {StatusComponent[contractStatus]}
    </>
  );
};

export default Contract;
