import { Provider } from "react-redux";
import store from "./store/store";
import Instantiate from "./components/Instantiate";
import Deploy from "./components/Deploy";
import StyledForm from "./styles";

function App() {
  return (
    <StyledForm>
      <Provider store={store}>
        <div className="App">
          <header className="App-header"></header>
          <Instantiate />
          <Deploy />
        </div>
      </Provider>
    </StyledForm>
  );
}

export default App;
