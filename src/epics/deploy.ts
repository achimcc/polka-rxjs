import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi } from "@polkadot/api-contract";
import type { AnyJson } from "@polkadot/types/types";

export const deploy = (action$: ActionsObservable<Action>, state$: any) =>
  action$.ofType("Deploy").pipe(
    mergeMap((action) => {
      const abi = new Abi((state$ as any).value.contract.abi as AnyJson);
      console.log("abi: ", abi);
      const api = (state$ as any).value.contract.api as ApiRx;
      const wasm = (state$ as any).value.contract.wasm as Uint8Array;
      console.log("wasm: ", wasm);
      const code = new CodeRx(api, abi, wasm);
      const contract = code.createContract(0, { gasLimit: 0, value: 0 }, []);
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      return contract.signAndSend(alice);
    }),
    map((response) => {
      console.log("DeployMessage: ", response);
      return { type: "DeployMessage", payload: response };
    })
  );
