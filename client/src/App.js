import { Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Emailverify from "./Pages/EmailVerify";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordReset from "./Pages/PasswordReset";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Reviews from "./Pages/Reviews";
import AdminPanel from "./Pages/AdminPanel";
import Room from "./Pages/Room";
import UpdatUser from "./Pages/AdminPanel/UpdateUser";
import PostUser from "./Pages/AdminPanel/PostUser";
import ApplyDoctor from "./Pages/ApplyDoctor";
import PostDoctor from "./Pages/AdminPanel/PostDoctor";
import Doctor from "./Pages/Doctor/Doctor";
import DetailDoctor from "./Pages/Doctor/DeatilDoctor";
import Cart from "./Pages/Cart/Cart";
import UpdateCategory from "./Pages/AdminPanel/UpdateCategory";
import PostCategory from "./Pages/AdminPanel/PostCategory";
import Category from "./Pages/AdminPanel/Category";

function App() {
	const user = localStorage.getItem("token");

	return ( 
        <>
        <Switch>
            {user && <Route exact path="/" component={Main } />}
			<Route exact path="/signup" component={Signup } />
			<Route exact path="/login" component={Login } />
            <Route exact path="/aboutUs" component={AboutUs } />
            <Route exact path="/contact" component={Contact } />
            <Route exact path="/reviews" component={Reviews } />
            <Route exact path="/users/:id/verify/:token" component={Emailverify } />
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/password-reset/:id/:token" component={PasswordReset}/>
            <Route exact path="/adminpanel" component={AdminPanel}/>
            <Route exact path="/room" component={Room}/>
            <Route exact path="/updateUser/:id" component={UpdatUser}/>
            <Route exact path="/postUser" component={PostUser}/>
            <Route exact path="/apply" component={ApplyDoctor}/>
            <Route exact path="/postDoctor" component={PostDoctor}/>
            <Route exact path= "/doctors" component={Doctor}/>
            <Route exact path="/detailDoctor/:id" component={DetailDoctor}/>
            <Route exact path="/appoint" component={Cart}/>
            <Route exact path="/updateCategory/:id" component={UpdateCategory}/>
            <Route exact path="/postCategory" component={PostCategory}/>
            <Route exact path="/category" component={Category}/>
        </Switch>
        
        </>
    );
	
};


export default App;
