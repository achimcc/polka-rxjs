import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { actions } from "../reducers/contractSlice";

interface props {
  type: "Gas" | "Endowment";
}

const InputValue = ({ type }: props) => {
  const dispatch = useDispatch();
  const { [type]: current } = useSelector((store: RootState) => store.contract);
  const onChange = ({ e: { target: value } }: any) => {
    const action =
      type === "Gas" ? actions.setGas(value) : actions.setEndowment(value);
    dispatch(action);
  };
  return (
    <>
      <input onChange={onChange} value={current} placeholder={type} />
    </>
  );
};

export default InputValue;
