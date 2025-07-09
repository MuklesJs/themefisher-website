import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const partneroKey = req.cookies.partnero_partner;
  const partneroAPI = process.env.PARTNERO_API_KEY;
  const { email, first_name, last_name } = req.body;

  if (!partneroKey || !partneroAPI) {
    return res.status(400).json({ error: "Missing partnero key or API key" });
  }

  try {
    await axios.post(
      "https://api.partnero.com/v1/customers",
      {
        partner: {
          key: partneroKey,
        },
        key: email,
        email: email,
        name: first_name + " " + last_name,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${partneroAPI}`,
          "Content-Type": "application/json",
        },
      },
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).send({ error: "Failed to fetch data", success: false });
  }
}
