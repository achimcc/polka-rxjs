import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { ConnectStatus } from "../../types";

interface Props {
  status: ConnectStatus;
}

const ConnectIcon = ({ status }: Props) => {
  const {
    contract: { api },
  } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    const isConnected = api && api.isConnected;
    if (!isConnected) dispatch({ type: "Disconnected" });
  }, [api, dispatch]);
  const connectColor = {
    Unconnected: "bg-yellow-500",
    Connected: "bg-green-500",
    Error: "bg-red-500",
  };
  return (
    <>
      <div
        className={`rounded-full h-5 w-5 ${connectColor[status]} inline-block`}
      />
    </>
  );
};

export default ConnectIcon;
