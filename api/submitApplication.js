export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const payload = req.body;

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyHN5iVsKqokzUtLUzPCsc7Px4LXu1gAslsTPKOGw1EkYjf5sM6EQTijTBcBd7Jmlpi/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json({ status: "ok", googleResponse: data });
    } catch (err) {
      return res.status(500).json({ error: "Failed to forward data", details: err });
    }
  } else {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).end("Method Not Allowed");
  }
}
