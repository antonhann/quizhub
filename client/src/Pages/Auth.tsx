import { useState } from "react"
import { supabase } from "../supabaseClient"
export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleRegisterClick = async () => {
        setLoading(true)
        setError('')
        const response = await supabase.auth.signUp({
            email,
            password,
        })
        console.log(response)
        setLoading(false)
    }
    if(loading){
        return <p>Loading...</p>
    }
    return(
        <div>
            <form>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => handleRegisterClick()}>Register</button>
            </form>
        </div>
    )
}
export const Login = () => {
    return(
        <div>
            
        </div>
    )
}