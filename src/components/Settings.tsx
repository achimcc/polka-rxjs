import { useDispatch } from "../reducers/actions";
import InputValue from "./InputValue";

interface Props {
  isReadyToDeploy: boolean;
}

const Settings = ({ isReadyToDeploy }: Props) => {
  const dispatch = useDispatch();
  const onDeploy = () => dispatch({ type: "Deploy" });
  return (
    <>
      <InputValue type={"Gas"} />
      <InputValue type={"Endowment"} />
      <button disabled={!isReadyToDeploy} onClick={onDeploy}>
        Deploy
      </button>
    </>
  );
};

export default Settings;
