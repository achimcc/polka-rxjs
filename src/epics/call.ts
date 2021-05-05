import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap, takeUntil, catchError } from "rxjs/operators";
import { Observable, EMPTY } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi, ContractRx } from "@polkadot/api-contract";
import { RootState } from "../reducers/rootReducer";
import { Bytes } from "@polkadot/types";
import { randomAsU8a } from "@polkadot/util-crypto";
import { compactAddLength, u8aToU8a } from "@polkadot/util";
import BN from "bn.js";

const EMPTY_SALT = new Uint8Array();

function encodeSalt(
  salt: Uint8Array | string | null = randomAsU8a()
): Uint8Array {
  return salt instanceof Bytes
    ? salt
    : salt && salt.length
    ? compactAddLength(u8aToU8a(salt))
    : EMPTY_SALT;
}

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.ofType("Deploy").pipe(
    map(() => {
      const api = store.value.contract.api as ApiRx;
      const abi = store.value.contract.abi as Abi;
      const contract = new ContractRx(api, abi, "");
      const { Gas, Endowment } = store.value.ui;
      const wasm = abi.project.source.wasm;
      const gas = new BN(Gas);
      const endowment = new BN(Endowment);
      const constructor = abi.findConstructor(0).toU8a([false]);
      const fromApi = api.tx.contracts.instantiateWithCode(
        endowment,
        gas,
        wasm,
        constructor,
        encodeSalt(null)
      );
      return fromApi;
    }),
    mergeMap((instance) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const observable = instance.signAndSend(alice).pipe(
        catchError((error) => {
          console.log("@@@err: ", error);
          return EMPTY;
        })
      );

      return observable;
    }),
    takeUntil(action$.ofType("CancelDeploy")),
    map((response) => {
      console.log("DeployMessage: ", response.toHuman());
      const api = store.value.contract.api as ApiRx;
      const test = api.query.contracts.codeStorage
        .entries()
        .subscribe((res) => {
          console.log("@@entry: ", JSON.stringify(res));
        });
      console.log("contracts: ", test);
      return { type: "DeployMessage", payload: response };
    })
  );

export default deploy;
