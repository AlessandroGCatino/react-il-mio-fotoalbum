import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosClient";
import FormCreateEdit from "../components/FormCreateEdit";
import { useEffect, useState } from "react";

export default function(){

    const { id } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const url = `/photos/${id}`;
        const photos = await axios.get(url);
        setDataToEdit({
            title: photos.title,
            description: photos.description,
            image: '',
            published: photos.published,
            categories: photos.categories.map(cat => cat.id)
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    },[id]);

    const updatePhoto = async formData => {
        console.log(formData);
        //logica per salvare la photo nel database
        const res = await axios.put(`/photos/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        if(res.status < 400){
            navigate(`/photos/${res.data.id}`)
        }
    }

    return (
        <div>
            <Link to="/photos" relative="path"><h4 className="goBack">Indietro</h4></Link>
            <FormCreateEdit
                initialData={dataToEdit}
                onSubmit={updatePhoto}
            />
        </div>
    )
}