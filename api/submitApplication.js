export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const payload = req.body;

      const response = await fetch(
        "https://script.google.com/macros/s//AKfycbyxaVyxdW3d5kdebqfI5N_Wf6iNmOXDnC7eWQmB-GoKEGJSfGwdfDB88M1e_AllKGgW/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      return res.status(200).json({ status: "ok", googleResponse: data });
    } catch (err) {
      return res.status(500).json({ error: "Failed to forward data", details: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
