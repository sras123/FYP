import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

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

            <Route exact path='/'>
            <Main/>
            </Route>

            </Switch>
            </BrowserRouter>
            </>
    )
	
}


export default App;
