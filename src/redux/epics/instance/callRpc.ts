import { Epic } from "redux-observable";
import { map, mergeMap, takeUntil, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import BN from "bn.js";
import { Keyring } from "@polkadot/api";
import { Abi, ContractRx } from "@polkadot/api-contract";
import { ContractCallOutcome } from "@polkadot/api-contract/types";
import { AnyJson } from "@polkadot/types/types";
import { RootState } from "../../reducers";
import actions from "../../actions";
import { Dependencies } from "../../types";

const callRpc: Epic<any, any, RootState, Dependencies> = (
  action$,
  store,
  { getApi }
): Observable<any> =>
  action$.pipe(
    filter(actions.instance.callRpc.match),
    map(({ payload }) => {
      const { hash } =
        store.value.contracts.instances.find(
          (i) => i.address === payload.address
        ) || {};
      const { json } =
        store.value.contracts.contracts.find((c) => c.hash === hash) || {};
      return { ...payload, hash, json };
    }),
    filter(({ hash, json }) => !!hash && !!json),
    mergeMap(({ address, method, json }) => {
      const api = getApi();
      const abi = new Abi(json as AnyJson, api.registry.getChainProperties());
      const contract = new ContractRx(api, abi, address);
      const gas = new BN("800000000");
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const adds = alice.address;
      const call = contract.query[method](adds, { gasLimit: gas });
      return call;
    }),
    takeUntil(action$.pipe(filter(actions.instance.cancelCall.match))),
    map((response) => (response as unknown) as ContractCallOutcome),
    map((response) => {
      const message = {
        text: `RPC Call output: ${response.output}`,
        isError: false,
      };
      return actions.instance.instanceResponse(message);
    })
  );

export default callRpc;
