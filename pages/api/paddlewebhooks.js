import axios from "axios";
import { verifyPaddleWebhook } from "verify-paddle-webhook";

const Token = process.env.NEXT_PUBLIC_TOKEN;
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const PublicKey = `
-----BEGIN PUBLIC KEY-----
${process.env.PADDLE_PUBLIC_KEY}
-----END PUBLIC KEY-----
`;

export default async function handler(req, res) {
  if (!req.body) {
    return res.status(401).json({ error: "No request body found" });
  } else if (req.body.alert_name === "payment_succeeded") {
    if (verifyPaddleWebhook(PublicKey, req.body)) {
      const data = req.body;
      const userIdGenerator = (email) =>
        "@tf_" + email.replace(/[@.!#$%&'*+-/=?^_`{|}~]/g, "_").toLowerCase();

      const postUrl = `${BackendURL}/order`;
      const postHeaders = {
        authorization_token: `Bearer ${Token}`,
      };
      const customData = JSON.parse(data.custom_data);
      const postData = {
        order_id: Number(data.order_id),
        checkout_id: String(data.checkout_id),
        user_id: String(userIdGenerator(data.email)),
        user_email: String(data.email),
        total: String(data.balance_gross),
        fee: String(data.balance_fee),
        tax: String(data.balance_tax),
        earnings: String(data.balance_earnings),
        currency: String(data.currency),
        receipt_url: String(data.receipt_url),
        method: String(data.payment_method ? data.payment_method : "Paddle"),
        current_time: new Date().toISOString(),
        coupon: String(customData.internal_coupon),
        products: customData.internal_products,
      };

      try {
        const response = await axios.post(postUrl, postData, {
          headers: postHeaders,
        });
        if (response.status === 200) {
          res.status(200).json({ success: true });
        }
      } catch (error) {
        if (error.response.status === 403) {
          res.status(200).json({ success: true });
        }
        console.log(error.response.data);
      }
    }
  } else if (req.body.alert_name === "payment_refunded") {
    if (verifyPaddleWebhook(PublicKey, req.body)) {
      res.status(200).json({ success: true });
    }
  } else if (req.body.alert_name === "locker_processed") {
    if (verifyPaddleWebhook(PublicKey, req.body)) {
      res.status(200).json({ success: true });
    }
  } else if (req.body.alert_name === "new_audience_member") {
    if (verifyPaddleWebhook(PublicKey, req.body)) {
      res.status(200).json({ success: true });
    }
  } else if (req.body.alert_name === "update_audience_member") {
    if (verifyPaddleWebhook(PublicKey, req.body)) {
      res.status(200).json({ success: true });
    }
  } else {
    if (verifyPaddleWebhook(PublicKey, req.body)) {
      res.status(200).json({ success: true });
    }
  }
}
