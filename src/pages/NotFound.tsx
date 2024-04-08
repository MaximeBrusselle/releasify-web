import { useLocation } from "react-router-dom";

const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <h1>Page not found!</h1>
            <p>No page found with url {pathname}. Try something else!</p>
        </div>
    );
};

export default NotFound;