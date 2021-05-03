import { useDispatch } from "../reducers/actions";
import InputValue from "./InputValue";

const Instantiate = () => {
  const dispatch = useDispatch();
  const onInstantiate = () => dispatch({ type: "Connect" });
  return (
    <>
      <InputValue type="Address" />
      <button onClick={onInstantiate}>Connect</button>
    </>
  );
};

export default Instantiate;
