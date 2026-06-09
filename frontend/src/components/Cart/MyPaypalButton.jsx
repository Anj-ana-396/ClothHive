


import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const MyPaypalButton = ({ amount, onSuccess, onError }) => {
  return (

    <PayPalScriptProvider options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD"
    }}>

      <PayPalButtons
        style={{ layout: "vertical" }}

        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: parseFloat(amount).toFixed(2) ,
                currency_code: "USD"
              }
            }]
          })
        }}


        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            if (onSuccess) onSuccess(details)
          })
        }}

        onError={onError}
      />
    </PayPalScriptProvider>
  )
}

export default MyPaypalButton
