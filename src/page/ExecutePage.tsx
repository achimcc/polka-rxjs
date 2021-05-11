import { useSelector } from "../store/store";
import Contract from "../components/execute/Contract";

const ExecutePage = () => {
  const { contracts } = useSelector((store) => store.ui);
  return (
    <>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        {contracts.map((contract) => (
          <Contract contract={contract} />
        ))}
      </div>
    </>
  );
};

export default ExecutePage;
