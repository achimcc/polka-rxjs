import { NavLink } from "react-router-dom";
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
            <NavLink
              to="/"
              className="h-full w-full hover:bg-gray-700 block p-3"
            >
              <img
                className="object-contain h-full w-full"
                src="https://avatars1.githubusercontent.com/u/6157842?v=4"
                alt="open-source"
              />
            </NavLink>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1  sm:w-full"
            title="Contracts"
          >
            <NavLink
              to="/"
              exact
              className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3"
              activeClassName="bg-green-800"
            >
              <div>
                <FaFileContract className="inline-block" />
              </div>
            </NavLink>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1 sm:w-full"
            title="Execute"
          >
            <NavLink
              to="/execute"
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
