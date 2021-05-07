import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Main from "./page/Main";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App w-9/12">
          <header className="App-header"></header>
          <Main />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
