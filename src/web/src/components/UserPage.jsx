import { Button, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [donateMoney, setDonateMoney] = useState();
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [order, setOrder] = useState({
    amount: 0,
    amount_paid: 0,
    notes: {},
    created_at: 0,
    amount_due: 0,
    currency: "",
    receipt: "",
    id: "",
    entity: "",
    offer_id: null,
    attempts: 0,
    status: "",
  });

  useEffect(() => {
    if (checkSubmit) {
      const submitTheMoney = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              donateMoney: donateMoney,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setOrder(data);
            console.log("order details :", order);
            if (data.id) {
              initRazorpay(data.id, data.amount_due);
            }
          } else {
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.log("Error:", error.message);
        } finally {
          setCheckSubmit(false);
        }
      };

      submitTheMoney();
    }
  }, [checkSubmit]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initRazorpay = (orderId, amount) => {
    const options = {
      key: "rzp_test_Xn4HB4uGySyEym",
      amount: order.amount,
      currency: "INR",
      name: "Style Comp",
      description: "Test Transaction",
      image:
        "https://t4.ftcdn.net/jpg/03/25/32/13/240_F_325321366_f6lXAcbES9sc33B8pdldNaXPeZZ9rhPN.jpg",
      order_id: order.id,
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: firstName,
        email: email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(`Error Code: ${response.error.code}`);
      alert(`Description: ${response.error.description}`);
      alert(`Source: ${response.error.source}`);
      alert(`Step: ${response.error.step}`);
      alert(`Reason: ${response.error.reason}`);
      alert(`Order ID: ${response.error.metadata.order_id}`);
      alert(`Payment ID: ${response.error.metadata.payment_id}`);
    });

    rzp1.open();
  };

  const handleSubmit = () => {
    setCheckSubmit(true);
  };

  return (
    <div>
      <Space direction="vertical" size={20}>
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item label="Donated Money">
            <Input
              value={donateMoney}
              onChange={(e) => setDonateMoney(e.target.value)}
              placeholder="Enter amount to Donate"
            />
          </Form.Item>
          <Button
            onClick={handleSubmit}
            type="primary"
            style={{
              width: "500px",
            }}
          >
            Donate
          </Button>
        </Form>
      </Space>
    </div>
  );
};

export default UserPage;
