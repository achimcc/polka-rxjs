import { Provider } from "react-redux";
import store from "./store/store";
import Contracts from "./components/Contracts";
import StyledForm from "./styles";

function App() {
  return (
    <StyledForm>
      <Provider store={store}>
        <div className="App">
          <header className="App-header"></header>
          <Contracts />
        </div>
      </Provider>
    </StyledForm>
  );
}

export default App;
