import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar.jsx";
import Footer from "./Footer";

function Layout(){
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
