import { Action } from './actions';

export interface UiState {
	isApiConnected: boolean;
	isWasmUploaded: boolean;
	isAbiUploaded: boolean;
}

const initialState: UiState = {
	isApiConnected: false,
	isWasmUploaded: false,
	isAbiUploaded: false,
};

const contractReducer = (
	state: UiState = initialState,
	action: Action
): UiState => {
	switch (action.type) {
		case 'Connected': {
			console.log('Connected!');
			return { ...state, isApiConnected: true };
		}
		case 'UploadWasmSuccess': {
			return { ...state, isWasmUploaded: true };
		}
		case 'UploadAbiSuccess': {
			console.log('success abi!');
			return { ...state, isAbiUploaded: true };
		}
		default:
			return state;
	}
};

export default contractReducer;
