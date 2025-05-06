import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"
import { useAuthentication } from "../hooks/useAuthentication"
const Navbar = () => {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()
  console.log(user)
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          <NavLink to="/" className={styles.brand} activeClassName={styles.active}>
          <li><span>Life</span>Dev</li>
          </NavLink>
          {!user && (
            <>
          <NavLink to="/login" className={styles.link} activeClassName={styles.active}>
          <li>Login</li>
          </NavLink>
          <NavLink to="/register" className={styles.link} activeClassName={styles.active}>
          <li>Register</li>
          </NavLink>
          </>
    )}
          {user && (
            <> 
            <li>
          <NavLink to="/posts/create" className={styles.link} activeClassName={styles.active}>
          Novo Post
          </NavLink></li>
           

             <li>
          <NavLink to="/dashboard" className={styles.link} activeClassName={styles.active}>
          Dashboard
          </NavLink></li>
          <li>
          <NavLink to="/about" className={styles.link} activeClassName={styles.active}>
          Sobre</NavLink></li>

          <button onClick={logout}
          className={styles.exit}>Exit</button>
        </>
)}
        </ul>
      </nav>
    </>
  )
}

export default Navbar