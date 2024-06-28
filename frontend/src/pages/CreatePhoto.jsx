import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosClient";
import FormCreateEdit from "../components/FormCreateEdit";

export default function(){
    
    const navigate = useNavigate();

    const createPhoto = async formData => {
        console.log(formData);
        //logica per salvare la photo nel database
        const res = await axios.post(`/photos`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        // if(res.status < 400){
        //     navigate(`/photos/${res.data.id}`)
        // }
    }

    return (
        <div>
            <Link to="../" relative="path">Indietro</Link>
            <FormCreateEdit
                onSubmit={createPhoto}
            />
        </div>
    )
}