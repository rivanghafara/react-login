import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import AddItem from "./AddItem";
import MenuItem from "./MenuItem";
import EditItem from "./EditItem";
import Dashboard from "./Dashboard";
import Navbars from "./Navbars";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "./MyProfile";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return (
    <Container
      className="flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Router>
          <Navbars />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/create-item" component={AddItem} />
            <PrivateRoute path="/edit-item/:id" component={EditItem} />
            <PrivateRoute exact path="/manage/menu-item" component={MenuItem} />
            <PrivateRoute
              exact
              path="/manage/my-profile"
              component={MyProfile}
            />
            <Route exact path="/signup">
              {currentUser ? <Redirect to="/" /> : <Signup />}
            </Route>
            <Route exact path="/login">
              {currentUser ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
