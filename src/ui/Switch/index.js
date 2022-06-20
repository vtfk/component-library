import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import './styles.scss'

export function Switch ({ isActive, label, onClick, disabled, ...props }) {
  // State
  const [_isActive, setIsActive] = React.useState(isActive);

  // Generate a unique id for the component
  const id = nanoid()

  // Override the isActive state if prop is provided
  useEffect(() => {
    if(isActive !== undefined && isActive !== _isActive) setIsActive(isActive || false);
  }, [isActive])

  function handleOnClick(e) {
    // If disabled do nothing
    if(disabled) return;

    // Determine what the new state should be
    let newActiveState = !_isActive;
    if(isActive !== undefined) newActiveState = isActive;

    // Update the state if applicable
    if(newActiveState !== _isActive) setIsActive(newActiveState);

    // Call the onClick callback if applicable
    if(onClick && typeof onClick === 'function') {
      e.target.value = newActiveState;
      e.target.checked = newActiveState;
      onClick(e);
    }
  }

  return (
    <div className='switch'>
      <div className='switch-wrapper'>
        <button
          id={`switch-${id}`}
          className={`switch-element ${_isActive ? 'active' : ''}`}
          aria-label='Bryter'
          aria-checked={_isActive ? 'true' : 'false'}
          role='switch'
          disabled={disabled || false}
          onClick={(e) => handleOnClick(e)}
        />
        {
          label && <label className={disabled ? 'disabled' : ''} htmlFor={`switch-${id}`}>{label}</label>
        }
      </div>
    </div>
  )
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func
}
