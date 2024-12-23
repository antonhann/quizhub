import React, { useState } from "react"
import { supabase } from "../../../supabaseClient"
import { useNavigate } from "react-router"
export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleRegisterClick = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const register = await supabase.auth.signUp({
            email,
            password,
        })
        if(register.error){
            setError(register.error.message)
            setLoading(false)
            return
        }
        const profile = await supabase.from('profiles').insert([{email: email, username: username}])
        if(profile.error){
            setError(profile.error.message)
            setLoading(false)
            return
        }
        const login = await supabase.auth.signInWithPassword({
            email : email,
            password: password
        })
        if(login.error){
            setError(login.error.message)
            setLoading(false)
            return
        }
    
        setLoading(false)
        navigate('/')
    }
    if(loading){
        return <p>Loading...</p>
    }
    return(
        <div className="d-flex yes-center justify-content-center align-items-center flex-column gap-3">
        <h2>Register</h2>
        <form className="d-flex flex-column align-items-center w-100" onSubmit={(e) => handleRegisterClick(e)} style={{ maxWidth: '400px' }}>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            Already have an account? <button onClick={() => navigate("/login")} >Login</button>
        </div>
        
    </div>

    )
}