import { useDispatch } from "../../reducers/actions";
import InputValue from "../InputValue";

const Instantiate = () => {
  const dispatch = useDispatch();
  const onInstantiate = () => dispatch({ type: "Connect" });
  return (
    <div className="">
      <div className="w-full">
        <InputValue type="Address" />
      </div>
      <div className="p-2 bg-white border-gray-200 text-right">
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={onInstantiate}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Instantiate;
