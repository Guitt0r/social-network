import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={s.navbar}>
            <div className={s.navLink}>
                <NavLink to='/profile' className={navData => navData.isActive ? s.active : undefined}>Profile</NavLink>
            </div>
            <div className={s.navLink}>
                <NavLink to='/users' className={navData => navData.isActive ? s.active : undefined}>Users</NavLink>
            </div>
        </div>
    )
}
export default Navbar