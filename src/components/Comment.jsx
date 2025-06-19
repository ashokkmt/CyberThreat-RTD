import { useRef, useState } from "react";
import "../styles/Coment.css";
import axios from "axios";

export default function Comment() {


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };



    const inital_comment = {
        name: "Ashok",
        text: "This is Test Comment!!",
        date: formatDate(Date.now()),
    }

    const [value, setvalue] = useState("");
    const [popup, setpopup] = useState(false);
    const [out, setout] = useState("");
    const [headingout, setheadingout] = useState("");
    const [ImgURL, setImgURL] = useState("/Images/secure.png");
    const [comments, setComments] = useState([inital_comment]);
    const ref_comment = useRef(null);




    const submit = async (e) => {
        e.preventDefault();
        if (!value.trim()) return;

        try {
            const res = await axios.post("https://cyberthreatbackend.onrender.com//api/detect", {
                data: value,
            });

            setpopup(true);
            setout(res.data.result);

            if (res.data.flag === false) {
                setheadingout("Secure");
                setImgURL("/Images/secure.png");

                const newComment = {
                    name: "User",
                    text: value,
                    date: formatDate(Date.now()),
                };

                setComments((prev) => [...prev, newComment]);
                setvalue("");
            } else {
                setheadingout("Not Secure");
                setImgURL("/Images/notSecure.jpeg");
                setvalue("");
            }
        } catch (err) {
            console.error("Error during comment submission:", err);
        }
    };

    const deleteComment = (index) => {
        const updated = [...comments];
        updated.splice(index, 1);
        setComments(updated);
    };

    return (
        <>

            <div className={popup ? "show-output" : "output-pop"}>
                <div className="out-card">
                    <div className="heading-pop">
                        <h2>{headingout}</h2>
                        <img src={ImgURL} alt="Status" />
                    </div>
                    <p>{out}</p>
                </div>
                <img onClick={() => setpopup(false)} className="back-btn" src="/Images/back.png" alt="back" />
            </div>

            <div className="comment-page">
                <div className="comment-box">
                    <div className="input-sec">
                        <textarea
                            onChange={(e) => setvalue(e.target.value)}
                            placeholder="Enter Your Feedback here..."
                            value={value}
                            className="input-box"
                        ></textarea>
                        <button onClick={submit} className="input-btn">Comment</button>
                    </div>

                    <div ref={ref_comment} className="comments">
                        {comments.length === 0 ? (
                            <p className="no-comments">No comments yet</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="user-comment">
                                    <h3>{comment.name}</h3>
                                    <p>{comment.text}</p>
                                    <div className="time">
                                        <p>{comment.date}</p>
                                        <button onClick={() => deleteComment(index)} className="delete">Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
