import FormComoponent from "./containers/Form";
import Admin from "./containers/Admin";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={FormComoponent} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
