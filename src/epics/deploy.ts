import { ActionsObservable, Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi } from "@polkadot/api-contract";
import convertValues from "../utils/convertValues";
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
      const testgas = 155852802980;
      const [, gasBN] = convertValues(Gas);
      const [, endowmentBN] = convertValues(Endowment);
      console.log("convert: ", gasBN, endowmentBN);
      const testendow = 1300889614901161;
      const code = new CodeRx(api, abi, wasm);
      const blueprint = code.tx.new(
        { gasLimit: testgas, value: testendow, salt: null },
        []
      );
      return blueprint;
    }),
    mergeMap((blueprint) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      console.log("alice: ", alice);
      return blueprint.signAndSend(alice, { tip: 0 });
    }),
    map((response) => {
      console.log("DeployMessage: ", JSON.stringify(response));
      return { type: "DeployMessage", payload: response };
    })
  );

export default deploy;
