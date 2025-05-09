import { Link } from "react-router-dom";
import logoImg from "../../assets/img/logo1.png"

const Navbar = () =>{

    const logoutHandler = () =>{
        localStorage.removeItem("token");
    }
    return (
        <div className="flex items-center justify-between py-2 px-12 bg-gray-200">
            <Link to="/" className="">
            <img src={logoImg} alt="brand-logo" width={"50px"}/>
            </Link>

            <Link 
                to="/login"
                className="text-large font-bold font-mono hover:scale-110 duration-300"
                onClick={logoutHandler}>
            Logout
            </Link>
        </div>
    );
}
export default Navbar