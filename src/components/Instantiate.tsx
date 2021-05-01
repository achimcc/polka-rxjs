import { useDispatch } from "react-redux";
import { actions } from "../reducers/contractSlice";

const Instantiate = () => {
  const dispatch = useDispatch();
  const onInstantiate = () => dispatch(actions.connect());
  return (
    <>
      <button onClick={onInstantiate}>Instantiate</button>
    </>
  );
};

export default Instantiate;
