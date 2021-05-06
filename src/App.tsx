import { Provider } from "react-redux";
import store from "./store/store";
import Main from "./page/Main";

function App() {
  return (
    <Provider store={store}>
      <div className="App w-9/12">
        <header className="App-header"></header>
        <Main />
      </div>
    </Provider>
  );
}

export default App;
