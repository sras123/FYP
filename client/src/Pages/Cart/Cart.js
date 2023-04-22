import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserAPI from '../../api/UserAPI';

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
        userAPI : UserAPI(token)
    }

    const [appoint, setAppoint] = state.userAPI.appoint
    const [tok] = state.token
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
    
    const addAppointment = async(appoint)=>{
        await axios.patch('http://localhost:8080/addAppointment',{appoint},{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${tok}`
        })
    }
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

      const removeAppointment = id =>{
        if(window.confirm("Do you want to delete appointment with this doctor?")){
          appoint.forEach((doc, index)=>{
            if(doc._id === id){
              appoint.splice(index,1)
            }
          })
    
          setAppoint([...appoint])
          addAppointment(appoint)
        }
      }
    
      if(appoint.length === 0){
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Appointment Empty</h2>
      }
  return (
    <div>
    {
      appoint.map(doctor => (
        <div className="detail cart" key={doctor._id}>
        <img src={doctor.images.url} alt=""/>
        <div className="box-detail">
            <h2>{doctor.title}</h2>
            <h3>{doctor.name}</h3>
            <h3> ${doctor.price * doctor.available}</h3>
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
    </div>
  </div>
   
  )
}

export default Cart