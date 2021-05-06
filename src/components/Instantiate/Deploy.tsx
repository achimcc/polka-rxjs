import { useDispatch } from "../../reducers/actions";
import { UIMessage } from "../../types";
import Cancel from "./Cancel";
import Message from "./Message";

interface Props {
  messages: Array<UIMessage>;
  isDeploying?: boolean;
}

const Deploy = ({ messages, isDeploying }: Props) => {
  const dispatch = useDispatch();
  const onCancelDeploy = () => dispatch({ type: "CancelDeploy" });
  return (
    <>
      {messages.map(({ text, isError }) => (
        <Message key={text} text={text} isError={isError} />
      ))}
      <div className="p-2 bg-white border-gray-200 text-right">
        {isDeploying && <Cancel onClick={onCancelDeploy}>Cancel</Cancel>}
      </div>
    </>
  );
};

export default Deploy;
