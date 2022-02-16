import { Link } from 'react-router-dom'

const Menu = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About us</Link>
    <Link to="/box-office">BoxOffice</Link>
  </nav>
)

export default Menu
