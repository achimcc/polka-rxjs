import { Link } from "react-router-dom";
import { FaFileContract } from "react-icons/fa";
import { FiPlayCircle } from "react-icons/fi";

const Menu = () => {
  return (
    <>
      <nav>
        <ul className="text-center flex flex-row justify-center sm:flex-col w-full">
          <li
            className="h-14 border-b border-gray-900 hidden  sm:block"
            title="Home"
          >
            <Link to="/" className="h-full w-full hover:bg-gray-700 block p-3">
              <img
                className="object-contain h-full w-full"
                src="https://avatars1.githubusercontent.com/u/6157842?v=4"
                alt="open-source"
              />
            </Link>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1  sm:w-full"
            title="Contracts"
          >
            <Link to="/" className="h-full w-full hover:bg-gray-700 block p-3">
              <div>
                <FaFileContract className="inline-block" />
              </div>
            </Link>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1 sm:w-full"
            title="Execute"
          >
            <Link
              to="/execute"
              className="h-full w-full hover:bg-gray-700 block p-3"
            >
              <FiPlayCircle className="inline-block" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
