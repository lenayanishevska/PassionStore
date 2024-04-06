const express = require('express');
const dotenv =  require('dotenv');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();