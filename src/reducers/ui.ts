import { Action } from "./actions";
import { obtainMessage } from "../utils/convertResults";
import { ContractStatus, UIMessage, UIContract } from "../types";
import { produce } from "immer";

export interface Instantiate {
  deployMessages: Array<UIMessage>;
  contractStatus: ContractStatus;
  Gas: string;
  Endowment: string;
  Address: string | undefined;
  contractName: string;
}

export interface UiState {
  instantiate: Instantiate;
  contracts: Array<UIContract>;
}

const initialState: UiState = {
  instantiate: {
    contractStatus: "Endpoint",
    deployMessages: [],
    Gas: "200000000000",
    Endowment: "1000000000000000",
    Address: "ws://127.0.0.1:9944",
    contractName: "",
  },
  contracts: [],
};

const contractReducer = (
  state: UiState = initialState,
  action: Action
): UiState =>
  produce(state, (draft: UiState) => {
    switch (action.type) {
      case "Connected": {
        draft.instantiate.contractStatus = "Upload";

        break;
      }
      case "UploadContractSuccess": {
        const { name } = action.payload;
        draft.instantiate.contractName = name;
        draft.instantiate.contractStatus = "Settings";
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
      case "DeployMessage": {
        const { result, status, address } = action.payload;
        const message = obtainMessage(result);
        draft.instantiate.deployMessages.push(message);
        draft.instantiate.contractStatus = status;
        if (status === "Deployed" && address) {
          draft.contracts.push({
            name: state.instantiate.contractName,
            address,
          });
        }
        break;
      }
      case "Gas": {
        draft.instantiate.Gas = action.payload;
        break;
      }
      case "Endowment": {
        draft.instantiate.Endowment = action.payload;
        break;
      }
      default:
        break;
    }
  });

export default contractReducer;
