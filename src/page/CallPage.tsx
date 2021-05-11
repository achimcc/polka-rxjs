import { useState } from "react";
import { useParams } from "react-router-dom";
import Call from "../components/call/Call";
import CallResults from "../components/call/CallResults";
import SelectInstance from "../components/call/SelectInstance";

interface RouteParams {
  address?: string;
}

const CallPage = () => {
  const { address } = useParams<RouteParams>();
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    address
  );
  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-3.5">
        <SelectInstance
          address={selectedAddress}
          onChange={setSelectedAddress}
        />{" "}
      </div>
      <div className="h-100 w-full flex items-center justify-start bg-teal-lightest font-sans my-3.5">
        {selectedAddress && <Call address={selectedAddress} />}
      </div>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        Results:
        <CallResults />
      </div>
    </>
  );
};
export default CallPage;
