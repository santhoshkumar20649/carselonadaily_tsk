const express = require("express");
const { connectDatabase} = require('.//utilities/databaseConnection');
const userRoutes = require('./routes/user.routes.js');
const serviceCenterRoutes = require('./routes/serviceCenter.routes');
const adminRoutes = require('./routes/admin.routes')

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRoutes);
app.use('/api/serviceCenter',serviceCenterRoutes);
app.use('/api/admin',adminRoutes);

app.listen(port, async() => {
    await connectDatabase();
    console.log(`Connected successfully on port ${port}`);
});