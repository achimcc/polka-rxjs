import { ActionsObservable } from 'redux-observable';
import { Action } from '../reducers/actions';
import { filter, map, mergeMap } from 'rxjs/operators';
import { compactAddLength, isWasm } from '@polkadot/util';
import { UploadChangeParam } from 'antd/lib/upload';
import { hexToU8a, isHex, u8aToString } from '@polkadot/util';
import { from } from 'rxjs';

const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);
const STR_NL = '\n';

function convertResult(result: ArrayBuffer): Uint8Array {
	const data = new Uint8Array(result);
	// this converts the input (if detected as hex), via the hex conversion route
	if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
		let hex = u8aToString(data);
		while (hex[hex.length - 1] === STR_NL) {
			hex = hex.substr(0, hex.length - 1);
		}
		if (isHex(hex)) {
			return hexToU8a(hex);
		}
	}
	return data;
}

export const uploadWasm = (action$: ActionsObservable<Action>, state$: any) =>
	action$.ofType('UploadWasm').pipe(
		mergeMap(action => {
			const promise = (action.payload as UploadChangeParam).file.originFileObj.arrayBuffer();
			return from(promise);
		}),
		map(arrayBuffer => convertResult(arrayBuffer as ArrayBuffer)),
		filter(file => isWasm(file)),
		map(wasm => compactAddLength(wasm)),
		map(wasm => ({ type: 'UploadWasmSuccess', payload: wasm }))
	);
