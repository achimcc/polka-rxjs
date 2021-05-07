import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch } from "../store/store";
import { useSelector } from "../store/store";
import { UIContract } from "../types";

interface Props {
  address: string;
}

const ExecutePage = ({ address }: Props) => {
  const dispatch = useDispatch();
  const { methods } = useSelector(
    (store) =>
      store.ui.contracts.find((c) => c.address === address) as UIContract
  );
  const [method, setMethod] = useState<string>();
  const [rpc, setRpc] = useState<boolean>(true);

  useEffect(() => {
    methods && methods.length > 1 && setMethod(methods[0]);
  }, [methods]);

  console.log("rpc: ", rpc);
  const onCall = () =>
    method &&
    dispatch({ type: rpc ? "CallRpc" : "Call", payload: { address, method } });
  return (
    <>
      {" "}
      Method:
      <select
        className="flex-no-shrink p-2 ml-2 border-2 rounded"
        onChange={(e) => setMethod(e.target.value)}
        name="method"
        id="mthods"
      >
        {methods?.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>{" "}
      RPC Call:
      <Switch
        checked={rpc}
        onChange={setRpc}
        className={`${
          rpc ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only">RPC Call</span>
        <span
          className={`${
            rpc ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full`}
        />
      </Switch>
      {"  "}
      <button
        className="p-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold border border-blue-700 rounded right-0"
        onClick={onCall}
      >
        Call!
      </button>
    </>
  );
};
export default ExecutePage;
