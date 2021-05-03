import { Provider } from "react-redux";
import store from "./store/store";
import Deploy from "./components/Contract";
import StyledForm from "./styles";

function App() {
  return (
    <StyledForm>
      <Provider store={store}>
        <div className="App">
          <header className="App-header"></header>
          <Deploy />
        </div>
      </Provider>
    </StyledForm>
  );
}

export default App;
