import { Link } from "react-router-dom";
import { Instance } from "../../types";

interface Props {
  instance: Instance;
}

const ContractInstance = ({ instance }: Props) => {
  return (
    <>
      {" "}
      <div key={instance.id} className="w-full flex mb-4 items-center">
        <p className="w-full text-grey-darkest">{instance.id}</p>
        <p className="w-full text-grey-darkest">{instance.address}</p>
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
