import { useState } from "react"
import { useNavigate } from "react-router"
import { supabase } from "../../../supabaseClient"

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleLoginClick = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const login = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if(login.error){
            setError(login.error.message)
        }else{
            navigate('/')
        }
        setLoading(false)
    }
    if(loading){
        return <p>Loading...</p>
    }
    return(
        <div className="d-flex yes-center justify-content-center align-items-center flex-column gap-3">
            <h2>Login</h2>
            <form className="d-flex flex-column align-items-center w-100" onSubmit={(e) => { handleLoginClick(e); }} style={{ maxWidth: '400px' }}>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
            {error && <p className="text-danger">{error}</p>}
            <div>
                Don't have an account? <button onClick={() => navigate("/register")}> Register </button>
            </div>
        </div>

    )
}