import { useDispatch } from "../reducers/actions";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UploadAbi from "./UploadContract";
import InputValue from "./InputValue";

const Deploy = () => {
  const dispatch = useDispatch();
  const onDeploy = () => dispatch({ type: "Deploy" });
  const { isAbiUploaded, isApiConnected } = useSelector(
    (store: RootState) => store.ui
  );
  const isReadyToDeploy = isApiConnected && isAbiUploaded;
  return (
    <>
      <UploadAbi />
      <InputValue type={"Gas"} />
      <InputValue type={"Endowment"} />
      <Button disabled={!isReadyToDeploy} onClick={onDeploy}>
        Deploy
      </Button>
    </>
  );
};

export default Deploy;
