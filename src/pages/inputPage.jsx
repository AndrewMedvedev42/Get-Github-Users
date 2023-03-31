import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const InputPage = () => {
    const [input, setInput] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const findUser = (e) => {
        e.preventDefault()
        setError(false)
        axios.get(`https://api.github.com/users/${input}`)
            .then(()=>{navigate(`${input}`)})
            .catch(()=>{setError(true)})
    }
    return (
        <section className="input_page">
            <h1>Github user search</h1>
            <p>Search for users from all over the platform</p>
            <form action="" onSubmit={findUser}>
                <input placeholder="Enter username" type="text" onChange={(e)=>{setInput(e.target.value)}}/>
                <input type="submit" />
            </form>
            {
                error && (
                    <span>Sorry, there is no user with that name.</span>
                )
            }
        </section>
    )
}