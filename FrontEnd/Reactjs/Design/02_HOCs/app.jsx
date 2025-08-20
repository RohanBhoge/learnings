import { Route } from "react-router-dom";
import wrappedComponent from "./wrappedComponent";

const App = () => {
  return (
    <div>
      <Route
        path="/"
        element={<wrappedComponent first={"this.props.first"} />}
      />
    </div>
  );
};

export default App;
