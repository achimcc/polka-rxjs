import { combineReducers } from "redux";
import contractReducer from "../reducers/contract";
import { ContractState } from "../reducers/contract";
import uiReducer from "../reducers/ui";
import { UiState } from "../reducers/ui";

const rootReducer = combineReducers({
  contract: contractReducer,
  ui: uiReducer,
});

export interface RootState {
  contract: ContractState;
  ui: UiState;
}

export default rootReducer;
