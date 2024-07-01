import { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PhotoCard from "../components/PhotoCard";
export default function(){

    const [photos, setPhotos] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams({page: 1});

    const [searchBarValue, setSearchBarValue] = useState("");


    let [totalPages, setTotalPages] = useState(null);

    const currPage = parseInt(searchParams.get('page'));

    useEffect(() => {
        axios.get(`/photos?page=${currPage}&limit=10&title=${searchBarValue}`)
            .then((res) => {
                if(res.data.photos == "No photos found"){
                    setPhotos("None")
                    setTotalPages(null)
                } else {
                    setPhotos(res.data.photos)
                    console.log(res.data)
                    setTotalPages(res.data.totalPages)
                }
                }
        )
    },[searchParams, searchBarValue]);

    const { isLoggedIn } = useAuth();

    return (<>
        <div className="pWrapper">
            <div>
            {isLoggedIn && 
                <Link to="create">
                    <h4>Crea Nuova Foto</h4>
                </Link>}
                <input type="text" className="searchBar" placeholder="Search a photo..." value={searchBarValue} onChange={(e) => setSearchBarValue(e.target.value)}/>
            </div>
            {photos == "None" && <h2>No Photos found</h2>}
            {photos === null &&
                <div>Loading...</div>
            }
            {photos !== "None" && photos !== null && 
            <>
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
            </>}
        </div>
    </>)
}