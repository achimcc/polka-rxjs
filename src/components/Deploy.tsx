import { useDispatch } from "../reducers/actions";
import Cancel from "./Cancel";
import Message from "./Message";

interface Props {
  messages: Array<string>;
  isDeploying?: boolean;
}

const Deploy = ({ messages, isDeploying }: Props) => {
  const dispatch = useDispatch();
  const onCancelDeploy = () => dispatch({ type: "CancelDeploy" });
  return (
    <>
      {messages.map((message) => (
        <Message key={message} text={message} />
      ))}
      <div className="p-2 bg-white border-gray-200 text-right">
        {isDeploying && <Cancel onClick={onCancelDeploy}>Cancel</Cancel>}
      </div>
    </>
  );
};

export default Deploy;
