import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/NotFound";
import Photos from "./pages/Photos";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivatePage from "./middlewares/PrivatePage";
import CreatePhoto from "./pages/CreatePhoto";
import ShowPhoto from "./pages/ShowPhoto";
import Dashboard from "./pages/Dashboard";
import EditPhoto from "./pages/EditPhoto";


export default function(){

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<DefaultLayout/>}>
                        <Route index element={<Home/>} />
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="login" element={<LoginPage/>} />
                        <Route path="register" element={<RegisterPage/>} />
                        <Route path="contacts" element={<Contacts/>} />
                        <Route path="photos" element={<Photos/>}/>
                        <Route path="photos/:id" element={<ShowPhoto/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="photos/:id/edit" element={<EditPhoto/>}/>

                    </Route>

                    <Route path="photos" element={<PrivatePage><DefaultLayout/></PrivatePage>}>
                        <Route path="create" element={<CreatePhoto/>} />
                    </Route>                    

                </Routes>
            </AuthProvider>
        </BrowserRouter> 
    )

}