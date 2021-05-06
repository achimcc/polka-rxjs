import { Epic } from "redux-observable";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { CodeRx } from "@polkadot/api-contract";
import { CodeSubmittableResult } from "@polkadot/api-contract/base";
import BN from "bn.js";
import { RootState } from "../reducers/rootReducer";
import { Action } from "../reducers/actions";
import { obtainStatus } from "../utils/convertResults";

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
      const constructor = abi
        .findConstructor(0)
        .toU8a([false])
        .toString();
      console.log("@@@const: ", constructor);
      const fromCode = new CodeRx(api, abi, wasm).tx.new(endowment, gas, 0);
      /*  const fromApi = api.tx.contracts.instantiateWithCode(
        endowment,
        gas,
        wasm,
        constructor,
        encodeSalt(null)
      ); */
      return fromCode;
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
      console.log(
        "@@@ result: ",
        (result as CodeSubmittableResult<"rxjs">).contract?.address.toString()
      );
      return {
        type: "DeployMessage",
        payload: { result, status },
      };
    })
  );

export default deploy;
