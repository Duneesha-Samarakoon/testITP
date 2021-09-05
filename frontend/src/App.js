import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/index.css";

import Header from "./components/Header/Header";

import Home from "./components/Home/index";

import Exam from "./components/Exam/index";
import ExamDetails from "./components/Exam/ExamDetails";
import MarkDetails from "./components/Exam/MarksDetails";

import Finance from "./components/Finance/index";

const App = () => {
  return (
    <Router>
      <div className="container-fluid m-0 p-0" style={{ userSelect: "none" }}>
        <div className="row m-0 p-0">
          <div className="col-md-2 m-0 p-0">
            <Header />
          </div>
          <div className="col-md-10 m-0 p-0">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route exact path="/exam">
                <Exam />
              </Route>
              <Route path="/exam/examdetails">
                <ExamDetails />
              </Route>
              <Route path="/exam/markdetails">
                <MarkDetails />
              </Route>
              <Route exact path="/finance">
                <Finance />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
