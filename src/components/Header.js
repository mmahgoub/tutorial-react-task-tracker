//Not needed anymore
//import React from 'react'

import { useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onFormAdd, showAddTask}) => {
    const location = useLocation()
  return (
      <header className='header'>
          <h1>{title}</h1>
          {location.pathname === "/" && <Button color={showAddTask ? 'Red' : 'Green' } text={showAddTask ? 'Close' : 'Add' } onClick={onFormAdd} />}
          
      </header>
    
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// CSS style here
// const headingStyle = {

// }

export default Header