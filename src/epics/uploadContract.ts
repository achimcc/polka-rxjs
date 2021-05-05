import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Observable, from } from "rxjs";
import { RootState } from "../reducers/rootReducer";
import { u8aToString } from "@polkadot/util";
import { NOOP, convertResult } from "../utils/convertValues";

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
      const messages = abi.messages;
      console.log("messages: ", messages);
      return { type: "UploadContractSuccess", payload: { abi, wasm, name } };
    })
  );

export default uploadContract;
