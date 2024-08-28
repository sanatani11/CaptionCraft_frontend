import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "../CSS/checkout.css"; // Import CSS file for custom styles

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  let amount = searchParams.get("amount");

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    // Dummy validation logic
    const isValidCardNumber = /^[0-9]{16}$/.test(cardNumber); // Validate card number format (16 digits)
    const isValidExpirationDate = /^[0-9]{2}\/[0-9]{2}$/.test(expire); // Validate expiration date format (MM/YYYY)
    const isValidCVV = /^[0-9]{3}$/.test(cvv); // Validate CVV format (3 digits)

    if (isValidCardNumber && isValidExpirationDate && isValidCVV) {
      // Dummy payment logic with 80% success rate
      const success = Math.random() < 0.8; // 80% success rate

      if (success) {
        if (amount == 100) {
          amount = 250;
        } else {
          amount = 100;
        }
        try {
          // Make POST request to the backend API endpoint
          let response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/update-coin/${
              JSON.parse(localStorage.getItem("user")).email
            }`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ coin: amount }),
            }
          );

          // Check if request was successful
          if (response.ok) {
            console.log("Coin value updated successfully");
          } else {
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error.message);
          setPaymentStatus("failure");
        }
        setPaymentStatus("success");
        navigate("/profile");
      } else {
        setPaymentStatus("failure");
      }
    } else {
      // Form details are invalid, set payment status to failure
      setPaymentStatus("failure");
    }
  };

  return (
    <div className="checkout-container">
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <div className="border-container">
              <MDBCard>
                <MDBCardBody className="p-4">
                  <div className="text-center mb-4">
                    <h3>Payment Amount: ₹{amount}</h3>
                  </div>
                  <h4 className="fw-bold mb-4">Enter your details:</h4>
                  <MDBInput
                    label="Cardholder's Name"
                    id="form3"
                    type="text"
                    size="lg"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="mb-3"
                  />
                  <MDBRow className="my-4">
                    <MDBCol size="7">
                      <MDBInput
                        label="Card Number"
                        id="form4"
                        type="text"
                        size="lg"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mb-3"
                      />
                    </MDBCol>
                    <MDBCol size="3">
                      <MDBInput
                        label="Expire"
                        id="form5"
                        type="text"
                        size="lg"
                        placeholder="MM/YYYY"
                        value={expire}
                        onChange={(e) => setExpire(e.target.value)}
                        className="mb-3"
                      />
                    </MDBCol>
                    <MDBCol size="2">
                      <MDBInput
                        label="CVV"
                        id="form6"
                        type="text"
                        size="lg"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="mb-3"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBBtn
                    color="success"
                    size="lg"
                    block
                    onClick={handlePaymentSubmit}
                    className="pay-now-btn"
                  >
                    Pay Now
                  </MDBBtn>

                  {paymentStatus && (
                    <div className="mt-3">
                      {paymentStatus === "success" ? (
                        <p className="text-success">Payment successful!</p>
                      ) : (
                        <p className="text-danger">
                          Payment failed. Please try again.
                        </p>
                      )}
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CheckoutPage;
