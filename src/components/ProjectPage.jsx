import { useNavigate } from 'react-router-dom'
import '../styles/ProjectPage.css'

export default function ProjectPage() {

    const navigate = useNavigate();

    return (
        <div className='project-boxes'>
            <div className='boxes'>
                <div className="box search-section">
                    <button onClick={()=> navigate('/Projects/Test1')} className='srch-btn'>Search Section</button>
                </div>
                <div className="box comment-section">
                    <button onClick={()=> navigate('/Projects/Test2')} className='cmnt-btn'>Comment Section</button>
                </div>
                <div className="box form-section">
                    <button onClick={()=> navigate('/Projects/Test3')} className='form-btn'>Form Filling section</button>
                </div>
            </div>
        </div>
    )
}
