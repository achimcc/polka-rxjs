import { ISubmittableResult } from "@polkadot/types/types";
import { Action } from "./actions";

export interface UiState {
  deployMessages: Array<ISubmittableResult>;
  contractStatus: "Endpoint" | "Upload" | "Settings" | "Deployed" | "Deploying";
  Gas: string;
  Endowment: string;
  Address: string | undefined;
}

const initialState: UiState = {
  contractStatus: "Endpoint",
  deployMessages: [],
  Gas: "155852802980",
  Endowment: "1300889614901161",
  Address: "ws://127.0.0.1:9944",
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
      return { ...state, contractStatus: "Settings" };
    }
    case "Deploy": {
      return { ...state, contractStatus: "Deploying" };
    }
    case "CancelDeploy": {
      return { ...state, contractStatus: "Endpoint" };
    }
    case "DeployMessage": {
      const deployMessages = [...state.deployMessages, action.payload];
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
