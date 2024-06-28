import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TbPhotoOff, TbPhoto } from "react-icons/tb";


export default function({id, title, description, image, categories, published}){

    const { user, isLoggedIn } = useAuth();


    return (
        <div key={`photo${id}`} className="pCard">
            <Link to={`/photos/${id}`}>
                <figure>
                    <img src={image} alt="" />
                </figure>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>{}</span>
                    <ul>
                        {categories.map((cat, index) => (
                            <li key={`ingr${index}`}>{cat}</li>
                        ))}
                    </ul>
                    <p className="definePubl"><span>Pubblicato:</span> {published ? <TbPhoto className="publ"/> : <TbPhotoOff className="notPubl"/>}</p>
                    {isLoggedIn && 
                        <Link to={`/photos/${id}/edit`}>
                            <div><h4>Modifica Foto</h4></div>
                        </Link>}
                </div>
            </Link>
        </div>
    )
}