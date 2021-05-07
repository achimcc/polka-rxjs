import { useDispatch } from "../store/store";
import { useSelector } from "../store/store";

interface props {
  type: "Gas" | "Endowment" | "Address";
}

const InputValue = ({ type }: props) => {
  const dispatch = useDispatch();
  const { [type]: current } = useSelector((store) => store.ui.instantiate);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.target.value;
    dispatch({ type, payload });
  };

  return (
    <>
      <div className="flex">
        <span className="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
          {type}
        </span>
        <input
          name={`field_${type}`}
          className="border border-2 rounded-r px-4 py-2 w-full"
          type="text"
          placeholder={type}
          value={current}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputValue;
