import {useState} from "react";
import axios from "axios";
import style from "./index.module.css"

const Search = ()=>{
    let url = "http://localhost:8080/api/v1/request/book"
    const [input, setInput] = useState("")

    function refreshPage(){
        window.location.reload()
    }

    return(
        <div className={style.mainDiv}>
            <div className={style.inputDiv}>
            <input
            type={"text"}
            value={input}
            placeholder={"Search Book"}
            onChange={(event)=> setInput(event.target.value)}
            />
            </div>
            <input
            type={"button"}
            value={"Search"}
            onClick={() =>
                axios.post(url, {
                    id: localStorage.getItem("id"),
                    title : input}
                ).then(response => {
                    refreshPage()
                }).catch(error => {
                    console.log(error)})
            }
            />
            </div>
    )
}

export default Search;
