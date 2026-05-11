const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const HS_TOKEN = process.env.HUBSPOT_TOKEN;
const HS_BASE = 'https://api.hubapi.com';

function hsHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + HS_TOKEN };
}

app.post('/api/contacts/search', async (req, res) => {
  try {
    const r = await fetch(`${HS_BASE}/crm/v3/objects/contacts/search`, { method:'POST', headers:hsHeaders(), body:JSON.stringify(req.body) });
    res.status(r.status).json(await r.json());
  } catch(e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const r = await fetch(`${HS_BASE}/crm/v3/objects/contacts`, { method:'POST', headers:hsHeaders(), body:JSON.stringify(req.body) });
    res.status(r.status).json(await r.json());
  } catch(e) { res.status(500).json({ message: e.message }); }
});

app.patch('/api/contacts/:id', async (req, res) => {
  try {
    const r = await fetch(`${HS_BASE}/crm/v3/objects/contacts/${req.params.id}`, { method:'PATCH', headers:hsHeaders(), body:JSON.stringify(req.body) });
    res.status(r.status).json(await r.json());
  } catch(e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/notes', async (req, res) => {
  try {
    const r = await fetch(`${HS_BASE}/crm/v3/objects/notes`, { method:'POST', headers:hsHeaders(), body:JSON.stringify(req.body) });
    res.status(r.status).json(await r.json());
  } catch(e) { res.status(500).json({ message: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PWA Call Logger running on port ${PORT}`));
