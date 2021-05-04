import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi } from "@polkadot/api-contract";
import { RootState } from "../reducers/rootReducer";
import BN from "bn.js";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.ofType("Deploy").pipe(
    map(() => {
      const api = store.value.contract.api as ApiRx;
      const abi = store.value.contract.abi as Abi;
      const wasm = store.value.contract.wasm as Uint8Array;
      const { Gas, Endowment } = store.value.ui;
      const gas = new BN(Gas);
      const endowment = new BN(Endowment);
      const code = new CodeRx(api, abi, wasm);
      const blueprint = code.tx["default"]({
        gasLimit: gas,
        value: endowment,
        salt: null,
      });
      return blueprint;
    }),
    mergeMap((blueprint) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      return blueprint.signAsync(alice, { nonce: -1, tip: new BN(0) });
    }),
    takeUntil(action$.ofType("CancelDeploy")),
    mergeMap((blueprint) => blueprint.send()),
    map((response) => {
      console.log("DeployMessage: ", response);
      return { type: "DeployMessage", payload: response };
    })
  );

export default deploy;
