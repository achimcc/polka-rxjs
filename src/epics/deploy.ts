import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { filter, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of } from "rxjs";
import { ApiRx, Keyring, ApiPromise, WsProvider } from "@polkadot/api";
import {
  CodeRx,
  CodePromise,
  ContractRx,
  BlueprintRx,
} from "@polkadot/api-contract";
import type { AnyJson, ISubmittableResult } from "@polkadot/types/types";
import { SubmittableExtrinsic } from "@polkadot/api/types";

export const deploy = (action$: ActionsObservable<Action>, state$: any) =>
  action$.ofType("Deploy").pipe(
    mergeMap((action) => {
      const abi = (state$ as any).value.contract.abi as AnyJson;
      const api = (state$ as any).value.contract.api as ApiRx;
      const wasm = (state$ as any).value.contract.wasm as Uint8Array;
      const contract = api.tx.contracts.instantiateWithCode(
        (action.payload as any).endowment,
        (action.payload as any).gas,
        wasm,
        JSON.stringify(abi),
        ""
      );
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const test = contract.signAndSend(alice);
      return test;
    }),
    map((tx) => {
      console.log("nextStep: ", tx);
      return { type: "Any", payload: {} };
    })
  );
