import React from 'react'

export const CheckoutSteps = (props) => {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Inciar sesion</div>
            <div className={props.step2 ? 'active' : ''}>Registrar Envio</div>
            <div className={props.step3 ? 'active' : ''}>Metodo de pago</div>
            <div className={props.step4 ? 'active' : ''}>Orden</div>
        </div>
    )
}
  