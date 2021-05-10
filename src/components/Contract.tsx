import { Link } from "react-router-dom";
import { UIContract } from "../types";
import { useDispatch } from "../store/store";

interface Props {
  contract: UIContract;
}

const Contract = ({ contract: { name, address } }: Props) => {
  const dispatch = useDispatch();
  const onForget = () =>
    dispatch({ type: "ForgetContract", payload: { address } });
  return (
    <div className="w-full flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{name}</p>
      <p className="w-full text-grey-darkest">{address}</p>
      <button
        onClick={onForget}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
      >
        Forget
      </button>
      <Link to={`/execute/${address}`}>
        <button className="w-full m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Execute
        </button>
      </Link>
    </div>
  );
};

export default Contract;
