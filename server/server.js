const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.post("/create-checkout-session", async (req, res) => {
  let item = req.body.paymentInfo[0];
  // console.log("id in server ", req.id, "\n", "price in server ", req.price);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "vloc - Rent a car",
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/reservation/contract/${item.reservationId}`,
      cancel_url: `${process.env.CLIENT_URL}/reservation/payment`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 5500);
