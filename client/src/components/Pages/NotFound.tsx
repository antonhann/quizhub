import { Link } from "react-router-dom"

export const NotFound = () => {
    return(
        <div className="flex justify-center items-center h-screen flex-col">
            <h1>Not Found: ERROR 404</h1>
            <img src = "https://imgs.search.brave.com/UMj2FZKRmEt3aMiNogWqLrZ5HwH-jbHM7wkEcg6Dmbg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC82OS81Ny9j/YXQtbG9nby1kZXNp/Z24tcGV0LWxvZ290/eXBlLXZlY3Rvci0y/MDU5Njk1Ny5qcGc"></img>
            <p>Oops! The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="underline">Go back to Home</Link>
        </div>
    )
}