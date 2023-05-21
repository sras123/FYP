import {useState,useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    console.log("token from user api",token)
    const[isLogged, setIsLogged] = useState(false)
    const[isAdmin, setIsAdmin] = useState(false)
    const [appoint, setAppointment] = useState([])
    const [totalAppointment,setTotalAppointment] = useState(0)
    useEffect(()=>{
        console.log("from user api",token)
        if(token){
            const getUser = async()=>{
                try{
                    const res = await axios.get("http://localhost:8080/getUserInfo",{
                        headers:{
                            "Content-Type" : "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    console.log("response>>",res)
                    setIsLogged(true)
                    res.data.role === "admin" ? setIsAdmin(true): setIsAdmin(false)
                    setAppointment(res.data.cart)
                    setTotalAppointment(res.data.cart.length)

                }catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    const addAppointment = async(doctor) =>{
        console.log("from add appointment",doctor)
        if(!isLogged) return alert("Please login to cotinue appointing a doctor")

        const check = appoint.every(doc =>{
            return doc._id !== doctor._id
        })
        console.log("check",check)
        if(check){
            console.log("appointment>>>>>>>>",[...appoint, {...doctor, available: 1}])
            setAppointment([...appoint, {...doctor, available: 1}])
            await axios.patch('http://localhost:8080/addAppointment', {cart: [...appoint, {...doctor, available: 1}]}, {
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization": `Bearer ${token}`
                    }
            })
            window.location.reload()

        }else{
            alert("The doctor has been appointed for you.")
        }
        console.log("appointment after if else",appoint)
    }

    const removeAppointment = async id =>{
        console.log(id)
        if(window.confirm("Do you want to delete appointment with this doctor?")){
          console.log("appoint",appoint)
          const newArr = appoint.filter((data)=>{
            console.log(data._id)
            return data._id !== id;
          })
          await axios.patch('http://localhost:8080/deleteAppointment', {cart: [...newArr]}, {
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization": `Bearer ${token}`
                    }
            })
          setAppointment(newArr)
          console.log("after",appoint)
    
        }
      }
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    appoint: [appoint, setAppointment],
    addAppointment: addAppointment,
    removeAppointment:removeAppointment,
    totalAppointment :[totalAppointment,setTotalAppointment]
  }
}

export default UserAPI