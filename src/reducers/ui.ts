import { Action } from "./actions";

export interface UiState {
  deployMessages: Array<string>;
  contractStatus: "Endpoint" | "Upload" | "Settings" | "Deployed" | "Deploying";
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
      const deployMessages = [
        ...state.deployMessages,
        action.payload.status.type,
      ];
      const isDeployed = action.payload.status.isFinalized;
      const contractStatus = isDeployed ? "Deployed" : "Deploying";
      return { ...state, deployMessages, contractStatus };
    }
    case "Gas": {
      console.log("SetGas!");
      return { ...state, Gas: action.payload };
    }
    case "Endowment": {
      console.log("SetEndowment!");
      return { ...state, Endowment: action.payload };
    }
    default:
      return state;
  }
};

export default contractReducer;
