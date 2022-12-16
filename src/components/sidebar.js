import { useState, useEffect, useRef } from 'react'

import SocialMedia from './social'

import ToggleButton from './toggle-btn';
import SidebarItem from './sidebar-item';
import PersonalLogo from './personal-logo';

const Sidebar = ({active}) => {

  const [sidebarToggled, setsidebarToggled] = useState(false)
  const toggleBar = () => {
    setsidebarToggled(!sidebarToggled)
  }

  return (
    <div className={`sidebar ${sidebarToggled ? "toggled" : ""}`}>
        <div className='sidebar-content'>
          <PersonalLogo />
            <div className='sidebar-list'>
              <ul>
                <SidebarItem img="\home.png" href="http://www.omar-ibrahim.com" sub="Go Home"/>
                <SidebarItem img="http://tictactoe.omar-ibrahim.com/favicon.png" href="http://tictactoe.omar-ibrahim.com" sub="Impossible Tic-Tac-Toe" active={active === 'lightbulb'}/>
                <SidebarItem img="http://lightbulb.omar-ibrahim.com/favicon.png" href="http://lightbulb.omar-ibrahim.com" sub="CSS Lightbulb" active={active === 'light'}/>
                <SidebarItem img="/shape.png" href="http://shapes.omar-ibrahim.com" sub="Shape Guesser (Beta)" active={active === 'shape'}/>
                <SidebarItem img="/lg.png" href="http://wordle.omar-ibrahim.com" sub="Wordle" active={active === 'wordle'}/>
                <SidebarItem img="\block.png"href="http://mazebuilder.omar-ibrahim.com" sub="Maze Builder" active={active === 'maze'}/>
                <SidebarItem img="\ayat.png" href="http://ayat.omar-ibrahim.com" sub="Ayat Search" active={active === 'ayat'}/>
              </ul>
            </div>
            <div className='sidebar-footer'>
              <SocialMedia />
            </div>
        </div>
        <ToggleButton toggleBar={toggleBar}/>
    </div>
  )
}

export default Sidebar