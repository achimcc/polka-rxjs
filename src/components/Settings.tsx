import { useDispatch } from "../reducers/actions";
import InputValue from "./InputValue";

interface Props {
  isDeploying: boolean;
}

const Settings = ({ isDeploying }: Props) => {
  const dispatch = useDispatch();
  const onDeploy = () => dispatch({ type: "Deploy" });
  return (
    <>
      <InputValue type={"Gas"} />
      <InputValue type={"Endowment"} />
      <div className="p-2 bg-white border-gray-200 text-right">
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={onDeploy}
        >
          Deploy
        </button>
      </div>
    </>
  );
};

export default Settings;
