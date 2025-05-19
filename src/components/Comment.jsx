import { useRef, useState } from "react"
import "../styles/Coment.css"
import axios from "axios";

export default function Comment() {
    const [value, setvalue] = useState("");
    const ref_comment = useRef(null);
    const [ImgURL, setImgURL] = useState("/Images/secure.png")
    const [popup, setpopup] = useState(false)
    const [out, setout] = useState("")
    const [headingout, setheadingout] = useState("")


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };


    const submit = async (e) => {
        e.preventDefault();
        if (!value.trim()) return;

        const placeholder = ref_comment.current.querySelector(".no-comments");
        if (placeholder) placeholder.style.display = "none";

        // Code Here to Check From backend
        const res = await axios.post("https://cyberthreatbackend.onrender.com//api/detect", {
            data: value
        })

        setpopup(true);
        setout(res.data.result)

        if (res.data.flag == false) {
            setheadingout("Secure")
            setImgURL("/Images/secure.png")

            const box = document.createElement("div")
            box.className = "user-comment"
            box.innerHTML = ` <h3>User</h3>
                          <p>${value}</p>
                          <div class="time">
                              <p>${formatDate(Date.now())}</p> 
                              <button class="delete">Delete</button>
                          </div>  `


            box.addEventListener("click", () => {
                box.remove();
            })

            ref_comment.current.appendChild(box);
            setvalue("")

        }
        else {
            setheadingout("Not Secure")
            setImgURL("/Images/notSecure.jpeg")
            setvalue("")
        }
    }

    const delete_hard = (e) => {
        const commentBox = e.target.closest(".user-comment");
        if (commentBox) {
            commentBox.remove();
        }
    };


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

            <div className='comment-page'>

                <div className="comment-box">
                    <div className="input-sec"  >
                        <textarea onChange={(e) => setvalue(e.target.value)} placeholder="Enter Your Feedback here..." value={value} className="input-box"></textarea>
                        <button onClick={submit} className="input-btn">Comment</button>
                    </div>
                    <div ref={ref_comment} className="comments">
                        <p className="no-comments">No comments yet</p>
                        <div className="user-comment">
                            <h3>Hero1</h3>
                            <p>que. Quasi consectetur perspiciatis sunt dolor, sequi sapiente et velit alias accusantium dolores distinctio veniam id praesentium suscipit delectus quo quod, eaque nemo neque hic libero! Suscipit dolores aliqui</p>
                            <div className="time">
                                <p>19/05/2025</p>
                                <button onClick={delete_hard} className="delete">Delete</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
