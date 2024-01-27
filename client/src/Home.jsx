import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
// import axios from "axios"

const checkoutHandler = async (amount) => {
  try {
    const keyResponse = await fetch('http://localhost:5000/api/getKey', {
      method: "GET"
    })
    const key = await keyResponse.json()
    // console.log(key)

    const response = await fetch('http://localhost:5000/api/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount
      }),
    })
    const data = await response.json()
    console.log(data)

    const options = {
      key : key.key,
      amount: data.order.amount,
      currency: "INR",
      name: "MERN Razor-Pay",
      description: "Test Transaction",
      image: "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
      order_id: data.order.id,
      callback_url: "http://localhost:5000/api/paymentVerification",
      prefill:
      {
        name: "MERN Razor-Pay",
        email: "yashloriya0206@gmail.com",
        contact: +918879029981,
      },
      notes: {
        "address": "RazorPay Address"
      },
      theme: {
        "color": "#121212"
      }
    };

    const razor = new window.Razorpay(options)
    razor.open()

  } catch (error) {
    console.log(error)
  }
}

const Home = () => {
  return (
    <>
      <h1 style={{ fontSize: "3rem", textAlign: "center" }}>Payment Integration Using RazorPay</h1>
      <Box>
        <Stack h={"70vh"} justifyContent={'center'} alignItems={'center'} direction={["column", "row"]}>
          <Card amount={8000} checkoutHandler={checkoutHandler} img={"https://m.media-amazon.com/images/I/71p-M3sPhhL.jpg"} />
          <Card amount={5000} checkoutHandler={checkoutHandler} img={"https://t3.ftcdn.net/jpg/00/79/36/04/360_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg"} />
        </Stack>
      </Box>
    </>
  )
}

export default Home
