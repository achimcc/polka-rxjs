import { Action } from "./actions";
import { obtainMessage } from "../utils/convertResults";
import { ContractStatus, UIMessage, UIContract, ConnectStatus } from "../types";
import { produce } from "immer";
import { CodeSubmittableResult } from "@polkadot/api-contract/base";
import { nanoid } from "nanoid";

export interface Instantiate {
  deployMessages: Array<UIMessage>;
  contractStatus: ContractStatus;
  contractName: string;
  id: string;
}
export interface UiState {
  instantiate: Instantiate;
  contracts: Array<UIContract>;
  callResults: Array<UIMessage>;
  connectStatus: ConnectStatus;
  connectUrl: string;
}

const initialState: UiState = {
  instantiate: {
    contractStatus: "Settings",
    deployMessages: [],
    contractName: "",
    id: "",
  },
  contracts: [],
  callResults: [],
  connectStatus: "Unconnected",
  connectUrl: "",
};

const contractReducer = (
  state: UiState = initialState,
  action: Action
): UiState =>
  produce(state, (draft: UiState) => {
    switch (action.type) {
      case "Connected": {
        draft.instantiate.contractStatus = "Upload";
        draft.connectStatus = "Connected";
        break;
      }
      case "Disconnected": {
        draft.connectStatus = "Unconnected";
        break;
      }
      case "UploadContractSuccess": {
        const { name, methods, wasm, json } = action.payload;
        const contract: UIContract = {
          name,
          methods,
          wasm,
          json,
          id: nanoid(9),
        };
        draft.contracts.push(contract);
        break;
      }
      case "Deploy": {
        draft.instantiate.contractStatus = "Deploying";
        break;
      }
      case "CancelDeploy": {
        draft.instantiate.contractStatus = "Endpoint";
        break;
      }
      case "StartInstantiate": {
        draft.instantiate = initialState.instantiate;
        break;
      }
      case "Instantiate": {
        draft.instantiate.id = action.payload.id;
        break;
      }
      case "DeployMessage": {
        const { result, status } = action.payload;
        const message = obtainMessage(result);
        draft.instantiate.deployMessages.push(message);
        draft.instantiate.contractStatus = status;
        if (status === "Deployed") {
          const address =
            (result as CodeSubmittableResult<
              "rxjs"
            >).contract?.address.toString() || "error";
          const index = draft.contracts.findIndex(
            (c) => c.id === draft.instantiate.id
          );
          draft.contracts[index].address = address;
        }
        break;
      }
      case "CallResult": {
        draft.callResults.push(action.payload);
        break;
      }
      case "Address": {
        draft.connectUrl = action.payload;
        break;
      }
      case "ForgetContract": {
        const { id } = action.payload;
        draft.contracts = state.contracts.filter((c) => c.id !== id);
        break;
      }
      default:
        break;
    }
  });

export default contractReducer;
