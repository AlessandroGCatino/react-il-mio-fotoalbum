import { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PhotoCard from "../components/PhotoCard";
export default function(){

    const [photos, setPhotos] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams({page: 1});

    let [totalPages, setTotalPages] = useState(null);

    const currPage = parseInt(searchParams.get('page'));

    useEffect(() => {
        axios.get(`/photos?page=${currPage}&limit=10`)
            .then((res) => {
                setPhotos(res.data.photos)
                setTotalPages(res.data.totalPages)
                }
        )
    },[searchParams]);

    const { isLoggedIn } = useAuth();

    return (<>
        <div className="pWrapper">
            <h1>All Photos</h1>
            {isLoggedIn && <Link to="create">Crea Nuova Photo</Link>}
            {photos === null ?
                <div>Loading...</div>
            :<>
            <div className="pContainer">
                {photos.map(p => (
                    <PhotoCard
                        key={`card${p.id}`}
                        id={p.id}
                        title={p.title}
                        description={p.description}
                        image={p.image}
                        published={p.published}
                        categories={p.categories.map(cat => cat.name)}
                    />
                ))}
            </div>
                
            </>}
            <div className="paginator">
                <button 
                    style={{visibility: currPage - 1 > 0 ? 'visible' : 'hidden'}} 
                    onClick={()=>setSearchParams({page: currPage - 1})
                }>-</button>
                <span>{currPage}</span>
                <button
                    style={{visibility: currPage + 1 <= totalPages ? 'visible' : 'hidden'}}
                    onClick={()=>setSearchParams({page: currPage + 1})
                }>+</button>
            </div>
        </div>
    </>)
}