import Employee from "./Components/Employee";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AddEmployee from "./Components/AddEmployee";
import Update from "./Components/Update";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/Employee">
            <Employee />
          </Route>
          <Route path="/Employee/Add">
            <AddEmployee />
          </Route>
          <Route path="/Employee/Update/*">
            <Update />
          </Route>
          <Route exact path="/*">
            <Employee />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
