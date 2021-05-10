import React from "react";
import { useDispatch } from "../store/store";
import { useModal } from "../components/Modal/useModal";
import Instantiate from "../components/Instantiate/Instantiate";
import Contracts from "../components/Contracts";

const ContractPage = React.memo(() => {
  const dispatch = useDispatch();

  const { show, RenderModal } = useModal(); // we could also spread 'hide' here, if we somehow needed it outside of the modal
  const onInstantiate = () => {
    dispatch({ type: "Instantiate" });
    show();
  };
  return (
    <div>
      <div className="w-full">
        <div className="w-full text-right">
          <button
            className="p-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold border border-blue-700 rounded right-0"
            onClick={onInstantiate}
          >
            Instantiate Contract!
          </button>
        </div>
        <RenderModal>
          <Instantiate />
        </RenderModal>
      </div>
      <div id="modal-root" />
      <div className="w-full mt-5">
        <Contracts />
      </div>
    </div>
  );
});

export default ContractPage;
