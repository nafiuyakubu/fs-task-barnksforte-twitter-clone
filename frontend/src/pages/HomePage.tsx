import Hero from "../components/Hero";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    userInfo: { name: string } | null;
  };
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);
  return <Hero />;
};
export default HomePage;
