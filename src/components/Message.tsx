interface Props {
  text: string;
}
const Message = ({ text }: Props) => (
  <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-700 bg-green-100 border border-green-300 ">
    <div slot="avatar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check-circle w-5 h-5 mx-2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </div>
    <div className="text-xl font-normal  max-w-full flex-initial">{text}</div>
    <div className="flex flex-auto flex-row-reverse"></div>
  </div>
);

export default Message;
