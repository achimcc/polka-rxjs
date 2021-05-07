import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Menu from "../components/Menu";
import ContractPage from "./ContractPage";
import ExecutePage from "./ExecutePage";

const main = () => {
  return (
    <>
      <Router>
        <section className="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
          <aside className="sm:h-full sm:w-16 w-full h-12 bg-gray-800 text-gray-200">
            <Menu />
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
