import { Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Emailverify from "./Pages/EmailVerify";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordReset from "./Pages/PasswordReset";
function App() {
	const user = localStorage.getItem("token");

	return ( 
        <>
        <Switch>
            {user && <Route exact path="/" component={Main } />}
			<Route exact path="/signup" component={Signup } />
			<Route exact path="/login" component={Login } />
            <Route exact path="/users/:id/verify/:token" component={Emailverify } />
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/password-reset/:id/:token" component={PasswordReset}/>
        </Switch>
        
        </>
    );
	
};


export default App;
