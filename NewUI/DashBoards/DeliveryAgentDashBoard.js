import React from 'react'
import Base from '../core/Base'
import { useLocation } from 'react-router-dom';


const DeliveryAgentDashBoard = () => {
  const name = useLocation();
  return (
  
    <Base title={name.state.name} description="Welcome">

    </Base>
  )
}

export default DeliveryAgentDashBoard