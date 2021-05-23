import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import AddItem from './AddItem'
import MenuItem from './MenuItem'
import EditItem from './EditItem'
import Dashboard from './Dashboard'
import Navbars from './Navbars'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import MyProfile from './MyProfile'

function App() {
  return (
    <Container className="flex justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" >
        <Router>
          <AuthProvider>
            <Navbars />
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <PrivateRoute path='/create-item' component={AddItem} />
              <PrivateRoute path='/edit-item/:id' component={EditItem} />
              <PrivateRoute exact path='/manage/menu-item' component={MenuItem} />
              <PrivateRoute exact path='/manage/my-profile' component={MyProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App;
