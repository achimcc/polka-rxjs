import { Link } from "react-router-dom";
import { useDispatch } from "../../store/store";
import { Instance } from "../../types";

interface Props {
  instance: Instance;
}

const ContractInstance = ({ instance }: Props) => {
  const dispatch = useDispatch();
  const onForget = () =>
    dispatch({
      type: "ForgetInstance",
      payload: { address: instance.address },
    });
  return (
    <>
      {" "}
      <div key={instance.id} className="w-full flex mb-4 items-center">
        <p className="w-full text-grey-darkest">{instance.id}</p>
        <p className="w-full text-grey-darkest">{instance.address}</p>
        <button
          onClick={onForget}
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
        >
          Forget
        </button>
        <Link to={`/call/${instance.address}`}>
          <button className="w-full m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Execute
          </button>
        </Link>
      </div>
    </>
  );
};

export default ContractInstance;
