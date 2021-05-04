import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Observable, from } from "rxjs";
import { RootState } from "../reducers/rootReducer";
import { hexToU8a, isHex, u8aToString } from "@polkadot/util";

const BYTE_STR_0 = "0".charCodeAt(0);
const BYTE_STR_X = "x".charCodeAt(0);
const STR_NL = "\n";
const NOOP = (): void => undefined;

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

const uploadContract: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.ofType("UploadContract").pipe(
    mergeMap((action) => {
      //     const promise = (action.payload as File).text();
      const file = action.payload as File;
      const promise = new Promise<{ data: Uint8Array; name: string }>(
        (resolve) => {
          const reader = new FileReader();
          reader.onabort = NOOP;
          reader.onerror = NOOP;
          reader.onload = ({ target }: ProgressEvent<FileReader>): void => {
            if (target && target.result) {
              const name = file.name;
              const data = convertResult(target.result as ArrayBuffer);
              resolve({ data, name });
            }
          };
          reader.readAsArrayBuffer(file);
        }
      );
      return from(promise);
    }),
    map(({ data, name }) => {
      const json = u8aToString(data);
      const api = (store as any).value.contract.api as ApiRx;
      const abi = new Abi(json, api.registry.getChainProperties());
      const wasm = abi.project.source.wasm;
      return { type: "UploadContractSuccess", payload: { abi, wasm, name } };
    })
  );

export default uploadContract;
