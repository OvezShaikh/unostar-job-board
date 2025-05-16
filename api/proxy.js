export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyxaVyxdW3d5kdebqfI5N_Wf6iNmOXDnC7eWQmB-GoKEGJSfGwdfDB88M1e_AllKGgW/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
