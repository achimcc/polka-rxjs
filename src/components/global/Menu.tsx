import { NavLink } from "react-router-dom";
import { FaFileContract } from "react-icons/fa";
import { FiPlayCircle, FiUpload } from "react-icons/fi";
import { useSelector } from "../../store/store";
import ConnectIcon from "./ConnectIcon";

const Menu = () => {
  const { connectStatus: status } = useSelector((store) => store.ui);

  return (
    <>
      <nav>
        <ul className="text-center flex flex-row justify-center sm:flex-col w-full">
          <li
            className="h-14 border-b border-gray-900 hidden flex-1 sm:block"
            title="Home"
          >
            <NavLink
              to="/"
              className="h-full w-full hover:bg-gray-700 block p-3"
            >
              <ConnectIcon status={status} />
            </NavLink>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1  sm:w-full"
            title="Upload Contracts"
          >
            <NavLink
              to="/upload"
              exact
              className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3"
              activeClassName="bg-green-800"
            >
              <div>
                <FiUpload className="inline-block" />
              </div>
            </NavLink>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1 sm:w-full"
            title="Execute Contracts"
          >
            <NavLink
              to="/execute"
              className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3"
              activeClassName="bg-green-800"
            >
              <FaFileContract className="inline-block" />
            </NavLink>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1 sm:w-full"
            title="Execute Contract Functions"
          >
            <NavLink
              to="/call"
              className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3"
              activeClassName="bg-green-800"
            >
              <FiPlayCircle className="inline-block" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
