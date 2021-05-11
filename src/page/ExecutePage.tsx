import { useSelector } from "../store/store";
import ContractInstance from "../components/execute/ContractInstance";

const ExecutePage = () => {
  const { instances = [] } = useSelector((store) => store.ui);
  return (
    <>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        {instances.map((instance) => (
          <ContractInstance instance={instance} />
        ))}
      </div>
    </>
  );
};

export default ExecutePage;
