import { useDispatch } from "../reducers/actions";
import InputValue from "./InputValue";

interface Props {
  isDeploying: boolean;
}

const Settings = ({ isDeploying }: Props) => {
  const dispatch = useDispatch();
  const onDeploy = () => dispatch({ type: "Deploy" });
  const onCancelDeploy = () => dispatch({ type: "CancelDeploy" });
  return (
    <>
      <InputValue type={"Gas"} />
      <InputValue type={"Endowment"} />
      {isDeploying ? (
        <button onClick={onCancelDeploy}>Cancel</button>
      ) : (
        <button onClick={onDeploy}>Deploy</button>
      )}
    </>
  );
};

export default Settings;
