import style from "./index.module.css"
import {useState} from "react";
import axios from "axios"
import {Link} from "react-router-dom";

const SignUp = ()=>{
    const url = "http://localhost:8080/api/v1/request/user"

    const [formData, setFormData] = useState({
        username : "",
        password : "",
        }
    );
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    return(
        <div className={style.mainCont}>
            <h2>Registration</h2>
            <div>
            <input
                type={"text"}
                placeholder={"Enter your username"}
                name={"username"}
                value={formData.username}
                onChange={(event) => handleInputChange(event)}
            />
            <br></br>
            <input
                type={"text"}
                value={formData.password}
                name={"password"}
                placeholder={"Enter your password"}
                onChange={(event) => handleInputChange(event)}
            />
                <br></br>
                <Link to={"/book"}>
            <input
                type={"button"}
                value={"Submit"}
                onClick={() =>{
                    axios.post(url,formData,
                        {headers:{"Content-Type": "application/json"}})
                        .then(response => {
                            console.log(response.data["readingListId"])
                            localStorage.setItem("id", response.data["readingListId"])
                            console.log(response.data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
            }}/>
                </Link>
            </div>
        </div>
    );
}

export default SignUp;
