const NavItem = ({nameLink, icon, url}) => {
  return (
    <li className="nav-item">
        <a className="nav-link collapsed" href={url}>
            <i className={icon}></i>
            <span>{nameLink}</span>
        </a>
    </li>
  )
}

export default NavItem