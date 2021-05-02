import { combineReducers } from "redux";
import contractReducer from "./contract";
import { ContractState } from "./contract";
import uiReducer from "./ui";
import { UiState } from "./ui";

const rootReducer = combineReducers({
  contract: contractReducer,
  ui: uiReducer,
});

export interface RootState {
  contract: ContractState;
  ui: UiState;
}

export default rootReducer;
