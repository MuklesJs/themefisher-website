import axios from "axios";

const Token = process.env.NEXT_PUBLIC_TOKEN;
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const PartneroKey = process.env.PARTNERO_WEBHOOK_KEY;

export default async function handler(req, res) {
  if (!req.body) {
    return res.status(401).json({ error: "No request body found" });
  } else {
    //  check partnero webhook key
    if (req.body.webhook_key !== PartneroKey) {
      return res.status(401).json({ error: "Invalid webhook key" });
    } else {
      // Check if data and rewards exist
      if (
        !req.body.data ||
        !Array.isArray(req.body.data.rewards) ||
        req.body.data.rewards.length === 0
      ) {
        return res
          .status(400)
          .json({ error: "Invalid or missing rewards data" });
      }

      const rewards = req.body.data.rewards[0];

      const userIdGenerator = (email) =>
        "@tf_" + email.replace(/[@.!#$%&'*+-/=?^_`{|}~]/g, "_").toLowerCase();

      const postUrl = `${BackendURL}/order/affiliate`;
      const postHeaders = {
        authorization_token: `Bearer ${Token}`,
      };

      const postData = {
        customer: String(userIdGenerator(rewards.customer)),
        partner: String(rewards.partner),
        commission: String(rewards.amount),
      };

      try {
        const response = await axios.patch(postUrl, postData, {
          headers: postHeaders,
        });
        if (response.status === 200) {
          res.status(200).json({ success: true });
        }
      } catch (error) {
        // Safely log error response data if available
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
        res.status(500).json({ error: "Failed to process webhook" });
      }
    }
  }
}
