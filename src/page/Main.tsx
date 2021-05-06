import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FaFileContract } from "react-icons/fa";
import { FiPlayCircle } from "react-icons/fi";

import ContractPage from "./ContractPage";
import ExecutePage from "./ExecutePage";

const main = () => {
  return (
    <>
      <Router>
        <section className="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
          <aside className="sm:h-full sm:w-16 w-full h-12 bg-gray-800 text-gray-200">
            <nav>
              <ul className="text-center flex flex-row sm:flex-col w-full">
                <li
                  className="h-14 border-b border-gray-900 hidden sm:block"
                  title="Home"
                >
                  <Link
                    to="/"
                    className="h-full w-full hover:bg-gray-700 block p-3"
                  >
                    <img
                      className="object-contain h-full w-full"
                      src="https://avatars1.githubusercontent.com/u/6157842?v=4"
                      alt="open-source"
                    />
                  </Link>
                </li>
                <li
                  className="sm:border-b border-gray-900 flex-1 sm:w-full"
                  title="Contracts"
                >
                  <Link
                    to="/"
                    className="h-full w-full hover:bg-gray-700 block p-3"
                  >
                    <FaFileContract />
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
                    <FiPlayCircle />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
            <nav className="border-b bg-white px-6 py-2 flex items-center min-w-0 h-14">
              <h1 className="font-semibold text-lg">Smart Contract App</h1>
            </nav>
            <section className="flex-1 pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0">
              <div className="flex flex-col lg:flex-row h-full w-full">
                <div className="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
                  <Switch>
                    <Route exact path="/" component={ContractPage} />
                    <Route path="/execute/:address" component={ExecutePage} />
                  </Switch>
                </div>
              </div>
            </section>
            <footer className="px-6 py-3 border-t flex w-full items-end">
              <p className="text-gray-600">Made by achim@parity</p>
              <div className="flex-1" />
              <button className="shadow-md ml-auto border rounded-full ml-2 w-14 h-14 text-center leading-none text-green-200 bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                <i className="fas fa-question fill-current" />
              </button>
            </footer>
          </main>
        </section>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n  @import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");\n\nbody {\n  font-family: "Nunito", sans-serif;\n}\n\nmain {\n  font-size: clamp(0.9rem, 3vw, 1rem);\n}\n\n#page-icon img {\n  -webkit-animation: cssfilter 3s infinite;\n}\n\n\n@-webkit-keyframes cssfilter {\n  0%, 100%  {  \n    filter: invert(75%) drop-shadow(0px 0px 2px blue) \n  }\n  \n  50% { \n    filter: invert(0%) drop-shadow(0px 0px 1px teal); \n  }\n}\n',
          }}
        />
      </Router>
    </>
  );
};

export default main;
