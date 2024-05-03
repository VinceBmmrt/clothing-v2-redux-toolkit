import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer } from "./payment-form.style";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 100000 }),
    }).then((res) => {
      return res.json();
    });

    const {
      paymentIntent: { client_secret },
    } = response;
    console.log("🚀 ~ clientSecret:", client_secret);

    console.log("🚀 ~ response:", response);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Vincent Bmmrt",
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment success");
      }
    }
  };
  return (
    <div>
      <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment : </h2>
          <CardElement />
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
        </FormContainer>
      </PaymentFormContainer>
    </div>
  );
};

export default PaymentForm;
