import { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
export default function(){

    const [photos, setPhotos] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams({page: 1});

    const currPage = parseInt(searchParams.get('page'));

    useEffect(() => async() => {
        const response = await axios.get(`/photos?page=${currPage}&limit=10`)
        setPhotos(response.data.photos)
    },[searchParams]);

    const { isLoggedIn } = useAuth();

    return (<>
        <div>
            <h1>Elenco Photo</h1>
            {isLoggedIn && <Link to="create">Crea Nuova Photo</Link>}
            {photos === null ?
                <div>Loading...</div>
            :<>
                <div className="paginator">
                    <span>Pagina corrente: {currPage}</span>
                    <button 
                        style={{visibility: currPage - 1 > 0 ? 'visible' : 'hidden'}} 
                        onClick={()=>setSearchParams({page: currPage - 1})
                    }>-</button>
                    <button 
                        onClick={()=>setSearchParams({page: currPage + 1})
                    }>+</button>
                </div>
                <ul>
                    {photos.map(p => (
                        <li key={`photo${p.id}`}>
                            <Link to={`/photos/${p.id}`} state={{ photo: p}}>{p.name}</Link>
                        </li>
                    ))}
                </ul>
            </>}
        </div>
    </>)
}