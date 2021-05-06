import { Link } from "react-router-dom";
import { UIContract } from "../types";

interface Props {
  contract: UIContract;
}

const Contract = ({ contract }: Props) => {
  return (
    <div className="w-full flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{contract.name}</p>
      <p className="w-full text-grey-darkest">{contract.address}</p>
      <Link to={`/execute/${contract.address}`}>
        <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
          Execute
        </button>
      </Link>
    </div>
  );
};

export default Contract;
