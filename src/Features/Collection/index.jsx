import axios from "axios";
import {useEffect, useState} from "react";
import Search from "../Search";
import {Link} from "react-router-dom";
import style from "./index.module.css"
import FilledButton from "../../component/reuseable/FilledButton";

const Collection = ()=>{
    document.body.style.background = "red";
    let userId = localStorage.getItem("id");
    let url = "http://localhost:8080/api/v1/request/books/"+userId;
    const [book, setBooks] = useState([]);


    useEffect(() => {
        axios.get(url).
        then(response =>{
            setBooks(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [url]);

    return(
        <div className={style.mainDiv}>
            <Search/>
            {book.map((value) => {
                console.log(value);
                    return (
                        <div key={value.id} className={style.mainCont}>
                            <img key={value.id} src={value.image} alt={"book"}/>
                            <div className={style.bookContent}>
                                <h2 key={value.id} style={{textAlign: "center"}}>{value.title}</h2>
                                <h4>Authors</h4>
                                {value.authors.map((author) => {
                                    return (
                                        <>
                                            <p style={{paddingLeft: "5px"}}>{"Author-Name: "}{author.name}</p>
                                        </>
                                    )
                                })}
                                <h4>Genre</h4>
                                <div className={style.subjects}>
                                    {value.subjects.map((subject) => {
                                        return (
                                            <p>{subject}</p>
                                        )
                                    })}
                                </div>
                                <h4>Book shelves</h4>
                                {value.bookshelves.map((bookshelf) => {
                                    return (
                                        <p style={{paddingLeft: "5px"}}>{bookshelf}</p>
                                    )
                                })}
                                <h4>Language</h4>
                                <div className={style.language}>
                                    {value.languages.map((language) => {
                                        return (
                                            <p>{language}</p>
                                        )
                                    })}
                                </div>
                                <div className={style.linkCont}>
                                <Link
                                    to={value.book}
                                    target={"_blank"}
                                ><FilledButton text={"Now Read"} text_color={"#fff"} color={"red"}/>
                                </Link>
                                </div>
                            </div>
                        </div>
                    )
            })}
            </div>
    )
}

export default Collection
