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


export default function(){

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<DefaultLayout/>}>
                        <Route path="*" element={<NotFound/>}/>
                        <Route index element={<Home/>} />
                        <Route path="login" element={<LoginPage/>} />
                        <Route path="register" element={<RegisterPage/>} />
                        <Route path="contacts" element={<Contacts/>} />
                        <Route path="photos" element={<Photos/>}/>
                    </Route>

                    <Route path="/" element={<PrivatePage> <DefaultLayout/> </PrivatePage>}>
                    </Route>                    
                    
                </Routes>
            </AuthProvider>
        </BrowserRouter> 
    )

}