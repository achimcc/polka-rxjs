import { Epic } from "redux-observable";
import { Action, isType } from "../reducers/actions";
import { map, filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, WsProvider } from "@polkadot/api";
import { RootState } from "../store/rootReducer";

const connect: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("Connect")),
    switchMap((action) => {
      const { url } = action.payload;
      const provider = new WsProvider(url);
      const instance = new ApiRx({ provider, types: {} });
      return instance.isReady;
    }),
    map((api) => {
      api.on("connected", (s) => {
        console.log("connect: ", s);
      });
      console.log("api message! ", api);
      return { type: "Connected", payload: api };
    })
  );

export default connect;
