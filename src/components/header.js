import { useState, useEffect, useRef } from 'react'
import SocialMedia from './social'

import ToggleButton from './toggle-btn';
import SidebarItem from './sidebar-item';
import PersonalLogo from './personal-logo';
import Sidebar from './sidebar';

const Header = (props) => {

  return (
    <>
    <header>
        <Sidebar active='tictactoe' />
        <div className='title'>Impossible Tic-Tac-Toe</div>
        <div className='header-btn green' onClick={props.reset}>
        <img src="/back.png"/>
        </div>
    </header>
    </>
  )
}

export default Header