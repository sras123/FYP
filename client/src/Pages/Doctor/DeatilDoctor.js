import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import DoctorAPI from '../../api/DoctorAPI';
import DoctorItem from './DoctorItem';

function DetailDoctor() {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    const state = {
      doctorsAPI : DoctorAPI()
    }
    const params = useParams()
    const[doctors] = state.doctorsAPI.doctors
    console.log(doctors)
    const [detailDoctor, setDetailDoctor] = useState([])
      useEffect(()=>{
        if(params){
          doctors.forEach(doctor=>{
            console.log(doctor);
          if(doctor._id === params.id) setDetailDoctor(doctor)
            console.log(params)
          })
        }

      },[params, doctors])

      console.log(detailDoctor)
      if(detailDoctor.length === 0) return null;

  return (
    <>
     <style>
			@import url('/css/nav.css');
		</style>
    	<div class="navbar">
			<img src="/images/logo.png" class="logo"></img>
			<ul>
				<li><a href="/aboutUs">About Us</a></li>
			    <li><a href="/contact">Contact</a></li>
			    <li><a href="/reviews">Reviews</a></li>
			    <li><a href="/signup">Signup</a></li>
				<li><a href="/login" onclick={handleLogout}>logout</a></li>
			</ul>
      <div className="cart-icon">
            <span>0</span>
            <Link to="/appoint"><i class="fa-solid fa-user-doctor"></i></Link>
      </div>
		</div>
         <div className="detail">
         <img src={detailDoctor.images.url} alt=""/>
         <div className="box-detail">
           <div className="row">
             <h2>{detailDoctor.title}</h2>
             <h3>{detailDoctor.name}</h3>
             <h6>#id: {detailDoctor.doctor_id}</h6>
             </div>
             <span> ${detailDoctor.price}</span>
           <p>{detailDoctor.description}</p>
           <p>{detailDoctor.content}</p>
           <p>Available: {detailDoctor.available}</p>
           
           
           <Link to="/cart" className="cart">Appoint</Link>
         </div>
       </div>
       
    <div>
     <h2>Other Doctors</h2>
     <div className="doctors">
      {
        doctors.map(doctor=>{
          return doctor.category === detailDoctor.category 
          ? <DoctorItem key={doctor._id} doctor={doctor}/> : null
          
        })
      }
     </div>
    </div>
    </>
  )
}

export default DetailDoctor