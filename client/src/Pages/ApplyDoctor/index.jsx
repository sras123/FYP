import React, {useState} from "react";
import { Link,useHistory } from "react-router-dom";

import axios from 'axios'
import { toast } from "react-toastify";
 
const ApplyDoctor = () => {
    const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};

    const[psych, setPsych] = useState('');

    const [images, setImages] = useState(true);
    const token = localStorage.getItem("token");
    const handleUpload = async e => {
        e.preventDefault()
        try{
            const file = e.target.files[0]
            
            console.log(file)
            if(!file) return alert("File does not exist.")
            if(file.size>1024*1024)
                return alert("Size too large!!")
            if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp')
                return alert("File format is incorrect.")

            let formData  = new FormData()
            formData.append('file',file)

            const res = await axios.post('http://localhost:8080/upload',formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }   
            });

        console.log(res);
        setImages(res.data)
              
            

        }catch(err){
            alert(err.response.data.msg)
        }
      }

      const handleChangeInput = e =>{
        const {name, value} = e.target
        setPsych({...psych, [name]:value})
      }

      const handleSubmit = async e => {
        e.preventDefault()
        try{
            if(!images) return alert("No image upload")
            await axios.post("http://localhost:8080/psych", {...psych, images})

            setImages(false)
            toast.success("Application sent successfully")

        }catch(err){
            alert(err.response.data.msg)

        }
      }

    return (
        <>
            <style>
                @import url('/css/apply.css');
            </style>

            <div class="navbar">
                <Link to="/" >
                    <img src="/images/logo2.png" class="logo"></img>
                </Link>
                <ul>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/doctors">Doctor</a></li>
                    <li><a href="/room">Room</a></li>
                    <li><a href="/reviews">Reviews</a></li>
                   
                    <li><a href="/login" onClick={handleLogout}>logout</a></li>


                </ul>
            </div>
          
            <form onSubmit={handleSubmit}>
            <div class="container">
                <div class="contact-box">

                    <div class="right">
                        <h2>Apply as Psychiatrist</h2><br />
                        <h3>Give Your Personal Details:</h3>
                        <input type="text" class="field" placeholder="First Name" value={psych.firstName} name="firstName" onChange={handleChangeInput}></input>
                        <input type="text" class="field" placeholder="Last Name" value={psych.lastName} name="lastName" onChange={handleChangeInput}></input>
                        <input type="email" class="field" placeholder="Email" value={psych.email} name="email" onChange={handleChangeInput}></input><br />
                        <h3>Professional Details:</h3>
                        <input type="text" class="field" placeholder="Your Specialization" value={psych.specialization} name="specialization" onChange={handleChangeInput}></input>
                        <input type="text" class="field" placeholder="Experience" value={psych.experience} name="experience" onChange={handleChangeInput}></input>
                        <input type="number" class="field" placeholder="How much you charge per hr" value={psych.hour} name="hour" onChange={handleChangeInput}></input>
                        <textarea placeholder="Message" class="field" value={psych.description} name="description" onChange={handleChangeInput}></textarea>
                        <h3>Upload your Ceritificate</h3>
                        <input type="file" name="file" id="file_up" class="field" onChange={handleUpload}></input>
                        <div id="file_img" >
                        <img src={images ? images.url: ''} alt=""/>
                        </div>
                        <button class="btn" type="submit">Submit</button>
                    </div>
                </div>
            </div>
            </form>

            <div class="footer">
                <div class="social">
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
                <ul class="list">
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/reviews">Reviews</a></li>
                    <li><a href="/privacypolicy">Privacy Policy</a></li>
                </ul>
                <p class="Copyright">
                    @2023 My Psychiatrist
                </p>
            </div>
        </>

    )
}
export default ApplyDoctor;