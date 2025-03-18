import { Navigate } from "react-router-dom";


function Protected({children}){
    const user = localStorage.getItem("User");
    // if(!user ){
    //     return <Navigate to="/login"></Navigate>
    // }
    return children
}
export default Protected