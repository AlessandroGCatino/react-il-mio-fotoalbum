import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { 
    FaArrowAltCircleRight as RightArrow,
    FaArrowAltCircleLeft as LeftArrow,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import PhotoCard from "../components/PhotoCard";

export default function(){

    const { id } = useParams();
    const location = useLocation();

    const [photo, setPhoto] = useState(location?.state?.photo || null);
    const [photoError, setPhotoError] = useState(null);

    useEffect(() => {
        setPhotoError(null);
        axios.get(`/photos/${id}`)
            .then(({data}) => setPhoto(data))
            .catch(err => setPhotoError(err))
        return () => {
            setPhoto(null);
        }
    },[id]);

    const p = photo;

    const navigate = useNavigate();

    const deletePhoto = async id => {
        await axios.delete(`/photos/${id}`);
        navigate('/photos');
    }

    const { user } = useAuth();

    return(
        <div>
            <nav className="navbar">
                <div>
                    <li><Link to={`/photos/${parseInt(id) - 1}`}><LeftArrow/></Link></li>
                    <li><Link to="../" relative="path">Go Back</Link></li>
                    <li><Link to={`/photos/${parseInt(id) + 1}`}><RightArrow/></Link></li>
                </div>
            </nav>
            {photoError ? 
                <div>{photoError?.response?.status === 404 ? `Nessuna photo trovata con id ${id}` : photoError.message}</div>
            : <>
                {photo === null ?
                    <div>Loading...</div>
                :
                    <>
                        <PhotoCard
                            id={p.id}
                            image={p.image}
                            title={p.title}
                            description={p.description}
                            categories={p.categories.map(i => i.name)}
                            published={p.available}
                            onDelete={deletePhoto}
                        />
                        {user.isAdmin && <Link to={`/photos/${id}/edit`}>Modifica</Link>}
                    </>
                }
            </>} 
        </div>
    )
}