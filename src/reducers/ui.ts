import { Action } from "./actions";
import { obtainMessage, obtainStatus } from "../utils/obtainErrorMessage";
import { ContractStatus, UIMessage } from "../types";

export interface UiState {
  deployMessages: Array<UIMessage>;
  contractStatus: ContractStatus;
  Gas: string;
  Endowment: string;
  Address: string | undefined;
  contractName: string;
}

const initialState: UiState = {
  contractStatus: "Endpoint",
  deployMessages: [],
  Gas: "200000000000",
  Endowment: "1000000000000000",
  Address: "ws://127.0.0.1:9944",
  contractName: "",
};

const contractReducer = (
  state: UiState = initialState,
  action: Action
): UiState => {
  switch (action.type) {
    case "Connected": {
      return { ...state, contractStatus: "Upload" };
    }
    case "UploadContractSuccess": {
      const { name: contractName } = action.payload;
      return { ...state, contractStatus: "Settings", contractName };
    }
    case "Deploy": {
      return { ...state, contractStatus: "Deploying" };
    }
    case "CancelDeploy": {
      return { ...state, contractStatus: "Endpoint" };
    }
    case "DeployMessage": {
      const result = action.payload;
      const message = obtainMessage(result);
      const deployMessages = [...state.deployMessages, message];
      const contractStatus = obtainStatus(result);
      return { ...state, deployMessages, contractStatus };
    }
    case "Gas": {
      return { ...state, Gas: action.payload };
    }
    case "Endowment": {
      return { ...state, Endowment: action.payload };
    }
    default:
      return state;
  }
};

export default contractReducer;
