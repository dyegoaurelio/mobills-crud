import React from 'react'
import { PopupDiv } from './componentsStyles'
import Button from '@material-ui/core/Button'

export default function Popup ({ children, closePopup }) {
  return (
        <PopupDiv>
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
        </PopupDiv>
  )
}
