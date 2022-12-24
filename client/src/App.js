import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import EmailVerify from "./Pages/EmailVerify";

function App() {
	const user = localStorage.getItem("token");

	return (
        <>
            <BrowserRouter>
            <Switch>
            <Route path='/login'>
                <Login/>
            </Route>

            <Route path='/signup'>
                <Signup/>
            </Route>

            <Route path='/users/:id/verify/:token'>
            <EmailVerify/>
            </Route>


            {user &&
            <Route path='/'>
            <Main/>
            </Route>
            }

            </Switch>
            </BrowserRouter>
            </>
    )
	
}


export default App;
