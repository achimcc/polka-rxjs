import { Epic } from "redux-observable";
import { Action, isType } from "../reducers/actions";
import { map, mergeMap, filter } from "rxjs/operators";
import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Observable, from } from "rxjs";
import { RootState } from "../store/rootReducer";
import { u8aToString } from "@polkadot/util";
import { NOOP, convertResult } from "../utils/convertValues";

const uploadContract: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("UploadContract")),
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
      console.log("json: ", json);
      const api = (store as any).value.contract.api as ApiRx;
      const abi = new Abi(json, api.registry.getChainProperties());
      const wasm = abi.project.source.wasm;
      console.log("wasm: ", wasm);
      const methods = abi.messages.map(({ identifier }) => identifier);
      const hash = abi.project.hash.toString();
      return {
        type: "UploadContractSuccess",
        payload: { wasm, name, methods, hash, json },
      };
    })
  );

export default uploadContract;
