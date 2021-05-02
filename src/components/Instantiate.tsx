import { useDispatch } from "../reducers/actions";

const Instantiate = () => {
  const dispatch = useDispatch();
  const onInstantiate = () => dispatch({ type: "Connect" });
  return (
    <>
      <button onClick={onInstantiate}>Instantiate</button>
    </>
  );
};

export default Instantiate;
