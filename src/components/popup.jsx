import React, { useEffect, useRef } from 'react'
import { PopupDiv } from './componentsStyles'
import Button from '@material-ui/core/Button'

export default function Popup ({ children, closePopup }) {
  return (
    <PopupDiv>
          <OutsideAlerter action={closePopup}>
           <div className='popup-inner'>
           {
               children
           }
           <div className='popup-close'>
               <Button variant='contained' color="secondary"
                onClick={closePopup}
               >Fechar</Button>
           </div>
           </div>
      </OutsideAlerter>
        </PopupDiv>
  )
}

/**
 * Component that alerts if you click outside of it
 * @param {function} param.action
 */
function OutsideAlerter ({ children, action }) {
  const wrapperRef = useRef(null)
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside (event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        action()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  return <div ref={wrapperRef}>{children}</div>
}
