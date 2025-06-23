import { NavLink } from "react-router";

export default function TheNavigation() {
  return (
    <nav className="navbar bg-body-tertiary justify-content-start mb-5 px-2">
      <NavLink className="navigation-link" to="/">
        The Game
      </NavLink>
      <NavLink className="ms-5 navigation-link" to="/leaderboard">
        Leaderboards
      </NavLink>
    </nav>
  );
}
