import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserAPI from '../../api/UserAPI';
import KhaltiCheckout from "khalti-checkout-web";
import Helmet from "helmet";
import { KhaltiButton } from './KhaltiButton';

function Cart() {
    const [token, setToken] = useState(false)
    const refreshToken = async()=>{
        const res = await axios.get('http://localhost:8080/login')
        setToken(res.token)
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])

    const state = {
        token : [token, setToken],
        userAPI : UserAPI(localStorage.getItem('token'))
    }

    const [appoint, setAppoint] = state.userAPI.appoint
    const removeAppointment = state.userAPI.removeAppointment
    const [tok] = localStorage.getItem('token')
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const getTotal = () =>{
            const total = appoint.reduce((prev, doc)=>{
                return prev + (doc.price * doc.available)
            },0)

            setTotal(total)
        }
        getTotal()
    },[appoint])
    
  
    const increment = (id)=>{
        appoint.forEach(doc=>{
          if(doc._id === id){
            doc.available += 1
          }
        })
        setAppoint([...appoint])
      }
    
      const decrement= (id)=>{
        appoint.forEach(doc=>{
          if(doc._id === id){
            doc.available === 1 ? doc.available = 1 : doc.available -= 1
          }
        })
        setAppoint([...appoint])
      }

   

      if(appoint.length === 0){
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Appointment Empty</h2>
      }
  return (
    <>
    <div>
    {
      appoint.map(doctor => (
        <div className="detail cart" key={doctor._id}>
         <img src={doctor.images.url} alt=""/> 
        <div className="box-detail">
            <h2>{doctor.title}</h2>
            <h3>{doctor.name}</h3>
            <h3> Rs. {doctor.price * doctor.available}</h3>
          <p>{doctor.description}</p>
          <p>{doctor.content}</p>
          <p>Available: {doctor.available}</p>
          <div className='amount'>
            <button onClick={()=>decrement(doctor._id)}> - </button>
            <span>{doctor.available}</span>
            <button onClick={()=> increment(doctor._id)}> + </button>
          </div>

          <div className='delete' onClick={() => removeAppointment(doctor._id)}>X</div>
        </div>
      </div>
      ))
    }
    <div className='total'>
      <h3>Total: $ {total}</h3>
    <button id='payment-button' onClick={KhaltiButton}>Khalti checkout</button>
    </div>
  </div>
  <Helmet>
  <script src={`${process.env.PUBLIC_URL}/js/Button.js`}  type="text/javascript"></script>
  </Helmet>

  </>
  )
}

export default Cart