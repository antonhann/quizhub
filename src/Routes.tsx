import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import { Search } from "./Pages/Search";
import { StudySetCollection } from "./Pages/StudySetCollection";
import { Create } from "./Pages/Create";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {path: "/", element: <Home/>},
            {path: "/create", element: <Create/>},
            {path: "/view-my", element: <StudySetCollection/>},
            {path: "/search", element: <Search/>},
        ],
    },
]);