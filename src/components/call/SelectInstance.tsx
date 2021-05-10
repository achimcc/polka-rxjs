import { useState, useEffect, useCallback } from "react";
import { useSelector } from "../../store/store";

interface Props {
  id?: string;
  onChange: (id: string) => void;
}
const SelectInstance = ({ id, onChange }: Props) => {
  const { contracts } = useSelector((store) => store.ui);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const _onChange = useCallback(
    (id: string) => {
      setSelectedId(id);
      onChange(id);
    },
    [setSelectedId, onChange]
  );
  useEffect(() => {
    if (id) _onChange(id);
    else if (contracts && contracts.length > 0) _onChange(contracts[0].id);
  }, [selectedId, _onChange, id, contracts]);
  return (
    <>
      Instance to Call:
      <select
        className="flex-no-shrink p-2 ml-2 border-2 rounded"
        onChange={(e) => setSelectedId(e.target.value)}
        name="method"
        id="methods"
        value={selectedId}
      >
        {contracts.map((contract) => (
          <option key={contract.id} value={contract.id}>
            {contract.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectInstance;
