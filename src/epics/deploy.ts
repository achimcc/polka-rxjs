import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi } from "@polkadot/api-contract";
import { RootState } from "../reducers/rootReducer";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.ofType("Deploy").pipe(
    map(() => {
      const api = store.value.contract.api as ApiRx;
      const abi = store.value.contract.abi as Abi;
      const wasm = abi.project.source.wasm;
      const { Gas, Endowment } = store.value.ui;
      const code = new CodeRx(api, abi, wasm);
      const blueprint = code.tx.new(
        { gasLimit: Gas, value: Endowment, salt: null },
        []
      );
      return blueprint;
    }),
    mergeMap((blueprint) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      return blueprint.signAndSend(alice, { tip: 0 });
    }),
    map((response) => {
      console.log("DeployMessage: ", response);
      return { type: "DeployMessage", payload: response };
    })
  );

export default deploy;
