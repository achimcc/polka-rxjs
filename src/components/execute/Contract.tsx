import { Link } from "react-router-dom";
import { UIContract } from "../../types";

interface Props {
  contract: UIContract;
}

const Contract = ({ contract }: Props) => {
  return (
    <>
      {" "}
      <div key={contract.id} className="w-full flex mb-4 items-center">
        <p className="w-full text-grey-darkest">{contract.name}</p>
        <p className="w-full text-grey-darkest">{contract.id}</p>
        <Link to={`/call/${contract.id}`}>
          <button className="w-full m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Execute
          </button>
        </Link>
      </div>
    </>
  );
};

export default Contract;
