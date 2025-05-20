import { useState } from 'react'
import axios from "axios"
import '../styles/SearchBar.css'

export default function SearchBar() {

    const [data, setdata] = useState("")
    const [out, setout] = useState("")
    const [headingout, setheadingout] = useState("")
    const [ImgURL, setImgURL] = useState("/Images/secure.png")
    const [popup, setpopup] = useState(false)

    const saveValue = async (e) => {
        e.preventDefault();
        setdata(data);

        // For local testing
        // const res = await axios.post("http://127.0.0.1:5000/api/detect", {
        //     data: data
        // })

        // For production
        const res = await axios.post("https://cyberthreatbackend.onrender.com//api/detect", {
            data: data
        })

        setpopup(true);
        setdata("");
        setout(res.data.result)        
        
        if(res.data.flag == false){
            setheadingout("Secure")
            setImgURL("/Images/secure.png")
        }
        else {
            setheadingout("Not Secure")
            setImgURL("/Images/notSecure.jpeg")
        }
    }

    return (
        <>
            <div className={popup ? "show-output" : "output-pop"}>
                <div className="out-card">
                    <div className="heading-pop">
                        <h2>{headingout}</h2>
                        <img src={ ImgURL } alt="Image" />
                    </div>
                    <p>{out}</p>
                </div>

                <img onClick={()=>{setpopup(false)}} className='back-btn' src="/Images/back.png" alt="back" />
                    
            </div>
            <div className='search-container'>
                <form className='search-box'>
                    <input value={data} onChange={(e) => setdata(e.target.value)} type="text" />
                    <button onClick={saveValue}>Send</button>
                </form>
            </div>
        </>
    )
}

