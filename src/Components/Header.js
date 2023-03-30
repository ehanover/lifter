import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
  return (
    <div className="header-div">
      <span>
        <Link to="/">Log out</Link> |&nbsp;
        <Link to="/entry">Entry</Link> |&nbsp;
        <Link to="/browse_type">Browse Types</Link> |&nbsp;
        <Link to="/browse_date">Browse Dates</Link>
      </span>
    </div>
  );
}
