import { useSelector } from "../store/store";
import Contract from "../components/execute/Contract";

const ExecutePage = () => {
  const { contracts } = useSelector((store) => store.ui);
  return (
    <>
      {contracts.map((contract) => (
        <Contract contract={contract} />
      ))}
    </>
  );
};

export default ExecutePage;
