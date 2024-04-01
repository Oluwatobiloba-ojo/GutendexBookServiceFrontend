import style from "./index.module.css"

const FilledButton = ({text, text_color, color})=>{
    return(
        <div>
            <button style={{color: text_color, backgroundColor: color}} className={style.filledButton}>
                {text}
            </button>
        </div>
    )
}

export default FilledButton