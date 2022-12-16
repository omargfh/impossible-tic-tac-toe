import React from 'react'

const SidebarItem = ({img, href, sub, active}) => {
  return (
    <li className={`sidebar-btn ${active ? "active" : ""}`}>
        <img src={img} className='icon' />
        <a href={href}>{sub}</a>
    </li>
  )
}

export default SidebarItem