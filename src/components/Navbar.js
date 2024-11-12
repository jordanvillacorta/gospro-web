import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', backgroundColor: '#333' }}>
    <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
      <NavItem to="/" label="Home" />
      <NavItem to="/favorites" label="Favorites" />
    </ul>
  </nav>
);

const NavItem = ({ to, label }) => (
  <li style={{ marginRight: '15px' }}>
    <Link to={to} style={{ color: '#fff', textDecoration: 'none' }}>
      {label}
    </Link>
  </li>
);

export default Navbar;
