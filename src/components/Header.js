//Not needed anymore
//import React from 'react'

import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onFormAdd, showAddTask}) => {

  return (
      <header className='header'>
          <h1>{title}</h1>
          <Button color={showAddTask ? 'Red' : 'Green' } text={showAddTask ? 'Close' : 'Add' } onClick={onFormAdd} />
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