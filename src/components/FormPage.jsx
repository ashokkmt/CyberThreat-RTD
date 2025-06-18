import { useState } from 'react'
import '../styles/FormPage.css'
import axios from 'axios';

export default function FormPage() {

  const [eamil, setemail] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [number, setnumber] = useState("");
  const [message, setmessage] = useState("");
  const [out, setout] = useState("")
  const [popup, setpopup] = useState(false)
  const [headingout, setheadingout] = useState("")
  const [ImgURL, setImgURL] = useState("/Images/secure.png")


  const sendCodeBackend = async () => {
    const data = {
      email: eamil,
      fname: fname,
      lname: lname,
      number: number,
      message: message
    }


    console.log(data);

    try {
      const res = await axios.post("https://cyberthreatbackend.onrender.com/api/detect2", data)
      // const res = await axios.post("http://127.0.0.1:5000/api/detect2", data)

      console.log(res);
      setpopup(true);
      setout(res.data.result)


      if (res.data.flag == false) {
        setheadingout("Secure")
        setImgURL("/Images/secure.png")
      }
      else {
        setheadingout("Not Secure")
        setImgURL("/Images/notSecure.jpeg")
      }

    } catch (error) {
      console.log("Not Send SuccessFully!!" + error)
    }

  }


  return (
    <>

      <div className={popup ? "show-output" : "output-pop"}>
        <div className="out-card">
          <div className="heading-pop">
            <h2>{headingout}</h2>
            <img src={ImgURL} alt="Image" />
          </div>
          <p>{out}</p>
        </div>
        <img onClick={() => { setpopup(false) }} className='back-btn' src="/Images/back.png" alt="back" />
      </div>



      <div className='form-main-containter'>
        <form method='POST' className='form-sub-container'>
          <h2>Contact Us</h2>
          <div className='form-sub-cont'>
            <input
              className='form-input'
              type="email"
              id="Email"
              placeholder='Gmail'
              onChange={(e) => setemail(e.target.value)}
              value={eamil}
            />

            <div className='name-section'>
              <input
                className='form-input'
                type="text"
                id="FName"
                placeholder="First Name"
                onChange={(e) => setfname(e.target.value)}
                value={fname}
              />

              <input
                className='form-input'
                type="text"
                id="LName"
                placeholder="Last Name"
                onChange={(e) => setlname(e.target.value)}
                value={lname}
              />
            </div>

            <input
              className='form-input'
              type="tel"
              pattern="[0-9]{10}"
              maxlength="10"
              placeholder="Phone Number"
              onChange={(e) => setnumber(e.target.value)}
              value={number}
            />

            <input
              className='form-input'
              type="text"
              placeholder="Message Here"
              onChange={(e) => setmessage(e.target.value)}
              value={message}
            />

            <button onClick={(e) => {
              e.preventDefault()
              sendCodeBackend()
            }} >submit</button>

          </div>
        </form>
      </div>
    </>
  )
}
