interface Props {
  progress: number;
}

const Bar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
      <div
        className="w-0 bg-green-300 py-1 rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Bar;
