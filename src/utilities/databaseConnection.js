let {createConnection} = require('typeorm');
let User = require('../models/user.entity');
let Vehicle = require('../models/vehicle.entity');
let Service_centers = require('../models/serviceCenters.entity');
let Service_bookings = require('../models/serviceBookings.entity')
const connectDatabase = async () => {
    try {
      const connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Allen@123',
        database: 'carselona_daily',
        entities: [User,Vehicle,Service_centers,Service_bookings],
        synchronize: true,
        
      });
      console.log('Connected to the database');
      return connection;
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  };

  module.exports = {connectDatabase}