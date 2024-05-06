import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">
          Welcome to the Home Page
        </h1>
        <Link to="/register">Test registering process</Link>
      </div>
    );
  };
  
  export default HomePage;