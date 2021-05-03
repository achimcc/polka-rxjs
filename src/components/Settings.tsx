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
      <div className="p-2 bg-white border-gray-200 text-right">
        {isDeploying ? (
          <button onClick={onCancelDeploy}>Cancel</button>
        ) : (
          <button onClick={onDeploy}>Deploy</button>
        )}
      </div>
    </>
  );
};

export default Settings;
