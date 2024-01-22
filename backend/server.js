const express = require('express');
const eventsRouter = require('./routes/eventsRoutes');

const app = express();

app.use(express.json());
app.use('/', eventsRouter);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
