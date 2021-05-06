import { Epic } from "redux-observable";

import { map, mergeMap, takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";

import { Bytes } from "@polkadot/types";
import { randomAsU8a } from "@polkadot/util-crypto";
import { compactAddLength, u8aToU8a } from "@polkadot/util";
import BN from "bn.js";
import { RootState } from "../reducers/rootReducer";
import { Action } from "../reducers/actions";
import { obtainStatus, obtainAddress } from "../utils/convertResults";

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
      const { Gas, Endowment } = store.value.ui.instantiate;
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
      return instance.signAndSend(alice);
    }),
    // takeWhile((response) => !response.dispatchError),
    takeUntil(action$.ofType("CancelDeploy")),
    map((result) => {
      const status = obtainStatus(result);
      const address = obtainAddress(result, store.value.contract.api as ApiRx);
      return { type: "DeployMessage", payload: { result, status, address } };
    })
  );

export default deploy;
