const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;
const errorChance = 0.1;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (Math.random() <= errorChance) return res.status(500).send(undefined);
  else next();
});

app.post('/track', (req, res) => {
  const { id, from = undefined, to = undefined } = req.body;
  console.log('Drag event tracked:', req.body);
  if (!id || typeof from === "undefined" || typeof to === "undefined") return res.status(400).json({ error: "Bad Request" });
  return res.status(204).send(null);
});

app.get('/nav', (req, res) => {
  if (fs.existsSync("nav.json")) {
    return res.json(JSON.parse(fs.readFileSync("nav.json", "utf8")));
  }
  res.json({
    items: [
      { id: 1, title: 'Dashboard', target: '/', visible: true },
      {
        id: 2,
        title: "Job Applications",
        target: "/applications",
        visible: true,
        children: [
          { id: 7, title: "John Doe", target: "/applications/john-doe", visible: true },
          { id: 10, title: "James Bond", target: "/applications/james-bond", visible: true },
          { id: 20, title: "Scarlett Johansson", target: "/applications/scarlett-johansson", visible: false }
        ]
      },
      {
        id: 3,
        title: "Companies",
        target: "/companies",
        visible: false,
        children: [
          { id: 8, title: "Tanqeeb", target: "/companies/1", visible: true },
          { id: 9, title: "Daftra", target: "/companies/2", visible: true },
          { id: 11, title: "TBD", target: "/companies/14", visible: true }
        ]
      },
      {
        id: 4,
        title: "Qualifications",
        visible: true,
        children: [
          { id: 14, title: "Q1", target: "/q1", visible: true },
          { id: 15, title: "Q2", target: "/q2", visible: true }
        ]
      },
      { id: 5, title: "About", target: "/about", visible: true },
      { id: 6, title: "Contact", target: "/contact", visible: true }
    ]
  });
});

app.post('/nav', (req, res) => {
  const navData = req.body;
  if (!navData.items) return res.status(400).send("Bad Request");
  fs.writeFileSync("nav.json", JSON.stringify(navData));
  return res.status(204).send(null);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});