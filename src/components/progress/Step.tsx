interface Props {
  children?: any;
  label: string;
}

const Step = ({ children, label }: Props) => {
  return (
    <div className="w-1/4">
      <div className="relative mb-2">
        {children}
        <div className="text-xs text-center md:text-base">{label}</div>
      </div>
    </div>
  );
};

export default Step;
