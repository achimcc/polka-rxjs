import { useDispatch } from "../reducers/actions";
import { useSelector } from "../store/store";
import UploadFile from "./UploadFile";
import InputValue from "./InputValue";

const Deploy = () => {
  const dispatch = useDispatch();
  const onDeploy = () => dispatch({ type: "Deploy" });
  const { isAbiUploaded, isApiConnected } = useSelector((store) => store.ui);
  const isReadyToDeploy = isApiConnected && isAbiUploaded;

  return (
    <>
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
