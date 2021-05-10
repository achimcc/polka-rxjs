import { useState } from "react";
import { useParams } from "react-router-dom";
import Call from "../components/call/Call";
import CallResults from "../components/call/CallResults";
import SelectInstance from "../components/call/SelectInstance";

interface RouteParams {
  id?: string;
}

const ExecutePage = () => {
  const { id } = useParams<RouteParams>();
  const [selectedId, setSelectedId] = useState<string | undefined>(id);
  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-3.5">
        <SelectInstance id={selectedId} onChange={setSelectedId} />{" "}
      </div>
      <div className="h-100 w-full flex items-center justify-start bg-teal-lightest font-sans my-3.5">
        {selectedId && <Call id={selectedId} />}
      </div>
      <div className="h-100 w-full ">
        <CallResults />
      </div>
    </>
  );
};
export default ExecutePage;
