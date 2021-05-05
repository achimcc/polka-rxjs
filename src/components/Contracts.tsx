import React from "react";

import { useModal } from "./modal/useModal";
import Contract from "./Instantiate";

const Contracts = React.memo(() => {
  const { show, RenderModal } = useModal(); // we could also spread 'hide' here, if we somehow needed it outside of the modal

  return (
    <div>
      <div>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={show}
        >
          Instantiate Contract!
        </button>
        <RenderModal>
          <p>
            <Contract />
          </p>
        </RenderModal>
      </div>
      <div id="modal-root" />
    </div>
  );
});

export default Contracts;
