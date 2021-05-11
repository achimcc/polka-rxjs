import { Action } from "./actions";
import { obtainMessage } from "../utils/convertResults";
import {
  ContractStatus,
  UIMessage,
  UIContract,
  ConnectStatus,
  Instance,
} from "../types";
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
  instances: Array<Instance>;
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
  instances: [],
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

          const instance: Instance = {
            id: state.instantiate.id,
            address,
          };
          draft.instances.push(instance);
        }
        break;
      }
      case "CallResult": {
        draft.callResults.push(action.payload);
        break;
      }
      case "ClearCallResults": {
        draft.callResults = [];
        break;
      }
      case "ForgetContract": {
        const { id } = action.payload;
        draft.contracts = state.contracts.filter((c) => c.id !== id);
        break;
      }
      case "ForgetInstance": {
        const { address } = action.payload;
        draft.instances = state.instances.filter((i) => i.address !== address);
        break;
      }
      default:
        break;
    }
  });

export default contractReducer;
