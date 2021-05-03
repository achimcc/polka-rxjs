import { useState } from "react";
import { useDispatch } from "../reducers/actions";
import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import InputValue from "./InputValue";
import Connect from "./Connect";
import Progress from "./progress/Progress";

const Deploy = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const onDeploy = () => dispatch({ type: "Deploy" });
  const { isAbiUploaded, isApiConnected } = useSelector((store) => store.ui);
  const isReadyToDeploy = isApiConnected && isAbiUploaded;

  return (
    <>
      <Progress progress={60} />
      <Connect />
      <UploadFile />
      <InputValue type={"Gas"} />
      <InputValue type={"Endowment"} />
      <button disabled={!isReadyToDeploy} onClick={onDeploy}>
        Deploy
      </button>
    </>
  );
};

export default Deploy;
