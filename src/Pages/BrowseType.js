import "./BrowseType.css";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";


export default function BrowseType() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      
      <p className="page-title">Browse by Exercise</p>

      <div className="exercise-category" onClick={() => navigate("/type/push")} style={{backgroundColor: "#AA5755"}}>Push</div>
      <div className="exercise-category" onClick={() => navigate("/type/pull")} style={{backgroundColor: "#83D0AA"}}>Pull</div>
      <div className="exercise-category" onClick={() => navigate("/type/leg")} style={{backgroundColor: "#6495ED"}}>Legs</div>
      <div className="exercise-category" onClick={() => navigate("/type/all")} style={{backgroundColor: "#9398a0"}}>All</div>

    </div>
  );
}
    