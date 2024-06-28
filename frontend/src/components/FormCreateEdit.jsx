import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";


export default function({initialData, onSubmit}){

    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const categoriesData = await axios.get(`/categories`);
        console.log(categoriesData);
        setCategories(categoriesData.data);
    }

    useEffect(() => {
        getCategories();
    }, []);
    

    const defaultData = initialData || {
        title: '',
        description: '',
        image: '',
        categories: [],
        published: false,
    }

    const [formData, setFormData] = useState(defaultData);

    const handleField = (name, value) => {

        setFormData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="photoForm">
            <form onSubmit={handleSubmit} >
                {Object.keys(defaultData).map((name, index) => {
                    const value = defaultData[name];
                    if(Array.isArray(value)){
                        return (
                            <div key={`formElement${index}`}>
                                <span>Categorie:</span>
                                <ul>
                                    {categories.map(({ id, name }, index) => (
                                        <li key={`category${index}`}>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.categories.includes(id)}
                                                    onChange={() => {
                                                        const curr = formData.categories;
                                                        const newCategories = curr.includes(id) ? 
                                                        curr.filter(el => el !== id) : 
                                                        [...curr, id];
                                                        handleField('categories', newCategories);
                                                    }}
                                                />
                                                <span>{name}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                    switch(typeof value){
                        case 'boolean':
                        return (
                            <div key={`formElement${index}`} className="checkPubl">
                                <span>{name}:</span>
                                <input
                                    name={name}
                                    type="checkbox"
                                    checked={formData[name]}
                                    onChange={(e) => handleField(name, e.target.checked)}
                                />
                            </div>
                        )
                        default:
                            if(name === 'image'){
                                return (
                                    <div key={`formElement${index}`}>
                                        <span>{name}:</span>
                                        <input
                                            type="file"
                                            onChange={(e) => handleField(name, e.target.files[0])}
                                        />
                                    </div>
                                )
                            }
                            if(name === 'description'){
                                return (
                                    <label className="inputsForm">
                                        <span>{name}:</span>
                                        <textarea
                                            key={`formElement${index}`} 
                                            required
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleField(name, e.target.value)}
                                        />
                                    </label>
                                )
                            }
                            return (
                                <label className="inputsForm">
                                    <span>{name}:</span>
                                    <input
                                        key={`formElement${index}`} 
                                        required
                                        name={name}
                                        type='text'
                                        value={formData[name] || ''}
                                        onChange={(e) => handleField(name, e.target.value)}
                                    />
                                </label>
                            )
                    }
                })}
                <button>Salva</button>
            </form>
        </div>
    );

}