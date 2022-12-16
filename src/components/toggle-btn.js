import React from 'react'

const ToggleButton = (props) => {
  return (
    <div className="header-btn green toggle-sidebar" onClick={props.toggleBar}>
        <div className='bars'>
            <div key={1} className="bar1"></div>
            <div key={2} className="bar2"></div>
            <div key={3} className="bar3"></div>
        </div>
    </div>
  )
}

export default ToggleButton