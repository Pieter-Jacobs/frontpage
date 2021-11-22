import React, {useState} from 'react'
import { Button, TextField } from '@mui/material';

export default function WritingCorner() {
    const [articleText, setArticleText] = useState("")
    //const articleText = useRef<HTMLInputElement>(null)
    const handleChange = (e: any) => {    
        setArticleText(e.target.value);  
    }

    const submitArticle = () => {
        
    }

    console.log(articleText)
    return (
        <div>
            <h1>Write your article</h1> 
            <TextField onChange={handleChange} value={articleText} type="text" multiline={true}/>
            <Button onClick={submitArticle}>Submit Article</Button>
        </div>
    )
}
