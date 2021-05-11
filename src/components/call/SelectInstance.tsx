import { useState, useEffect, useCallback } from "react";
import { useSelector } from "../../store/store";

interface Props {
  address?: string;
  onChange: (address: string) => void;
}
const SelectInstance = ({ address, onChange }: Props) => {
  const { instances = [] } = useSelector((store) => store.ui);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    undefined
  );
  const _onChange = useCallback(
    (address: string) => {
      setSelectedAddress(address);
      onChange(address);
    },
    [setSelectedAddress, onChange]
  );
  useEffect(() => {
    if (address) _onChange(address);
    else if (instances && instances.length > 0) _onChange(instances[0].id);
  }, [selectedAddress, _onChange, address, instances]);
  return (
    <>
      Instance to Call:
      <select
        className="flex-no-shrink p-2 ml-2 border-2 rounded"
        onChange={(e) => setSelectedAddress(e.target.value)}
        name="method"
        id="methods"
        value={selectedAddress}
      >
        {instances.map((instance) => (
          <option key={instance.address} value={instance.address}>
            {instance.address}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectInstance;
