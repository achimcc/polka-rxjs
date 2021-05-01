import { Provider } from "react-redux";
import store from "./store/store";
import Instantiate from "./components/Instantiate";
import Deploy from "./components/Deploy";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header"></header>
        <Instantiate />
        <Deploy />
      </div>
    </Provider>
  );
}

export default App;
