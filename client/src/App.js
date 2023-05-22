import { Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Emailverify from "./Pages/EmailVerify";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordReset from "./Pages/PasswordReset";
import AboutUs from "./Pages/AboutUs";
import Privacypolicy from "./Pages/Privacypolicy";
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
import Doctors from "./Pages/AdminPanel/Doctors";
import UpdateDoctor from "./Pages/AdminPanel/UpdateDoctor";
import AddReview from "./Pages/Reviews/AddReview";
import AllReviews from "./Pages/AdminPanel/AllReviews";
import UpdateReview from "./Pages/AdminPanel/UpdateReviews";
import Applications from "./Pages/AdminPanel/Applications";
import UpdateApplication from "./Pages/AdminPanel/UpdateApplication";

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/aboutUs" component={AboutUs} />
                <Route exact path="/privacypolicy" component={Privacypolicy} />
                <Route exact path="/reviews" component={Reviews} />
                <Route exact path="/users/:id/verify/:token" component={Emailverify} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/password-reset/:id/:token" component={PasswordReset} />
                <Route exact path="/adminpanel" component={AdminPanel} />
                <Route exact path="/room" component={Room} />
                <Route exact path="/updateUser/:id" component={UpdatUser} />
                <Route exact path="/postUser" component={PostUser} />
                <Route exact path="/apply" component={ApplyDoctor} />
                <Route exact path="/postDoctor" component={PostDoctor} />
                <Route exact path="/doctors" component={Doctor} />
                <Route exact path="/detailDoctor/:id" component={DetailDoctor} />
                <Route exact path="/appoint" component={Cart} />
                <Route exact path="/updateCategory/:id" component={UpdateCategory} />
                <Route exact path="/postCategory" component={PostCategory} />
                <Route exact path="/category" component={Category} />
                <Route exact path="/alldoctors" component={Doctors} />
                <Route exact path="/updateDoctor/:id" component={UpdateDoctor} />
                <Route exact path="/addReview" component={AddReview} />
                <Route exact path="/allReviews" component={AllReviews} />
                <Route exact path="/updateReview/:id" component={UpdateReview} />
                <Route exact path="/applications" component={Applications} />
                <Route exact path="/updateApplication/:id" component={UpdateApplication} />
            </Switch>

        </>
    );

};


export default App;
