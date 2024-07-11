const express = require('express');
const logger = require('./utils/logger');
const cors = require('cors');
const { fromEnv } = require('./utils')
const app = express();
const referralRoute = require('./routes/v1/referral/index')
const PORT = fromEnv('APP_PORT') || 3000;
app.use(express.json());
app.use(cors());
app.use('/api/v1', referralRoute)

app.use((req, res, next) => {
    logger.info({
        method: req.method,
        url: req.url,
        headers: req.headers,
    });
    next();
});

app.get('/',()=>{res.status(200).json({message: 'Working'})});


app.listen(PORT, () => {
    logger.info(`🚀 Server is running on port ${PORT}`);
});
