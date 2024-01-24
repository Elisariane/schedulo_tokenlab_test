const express = require('express');
const eventsRouter = require('./routes/eventsRoutes');
const authRouter = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', eventsRouter);
app.use('/auth', authRouter);


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
