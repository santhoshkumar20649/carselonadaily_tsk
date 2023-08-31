const { EntitySchema } = require('typeorm');
const User = require('../models/user.entity')
const Vehicle = require('../models/vehicle.entity')
const Service_centers = require('../models/serviceCenters.entity')

const Service_bookings = new EntitySchema({
  name: 'Service_bookings',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    userId: {
        type: 'int',
    },
    vehicleId: {
        type: 'int',
    },
    serviceCenterId: {
        type: 'int',
    },
    serviceType: {
        type: 'varchar',
        length: 255,
    },
    status: {
        type: 'varchar',
        length: 255,
        default: 'PENDING'
    },
    serviceDate: {
        type: 'varchar',
        length: 255,
    },
    timeSlot: {
        type: 'varchar',
        length: 255,
    },
    isActive: {
        type: 'boolean',
        default: true
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  listeners: {
    beforeUpdate(event) {
      // Update the 'updated' column before updating the record
      event.entity.updatedAt = new Date();
    },
  },
  relations: {
    // Define the foreign key relationship
    User: {
      type: 'many-to-one',
      target: User, // Name of the target entity
      joinColumn: {
        name: 'userId', // Foreign key column name
      },
    },
    Vehicle: {
        type: 'many-to-one',
        target: Vehicle, // Name of the target entity
        joinColumn: {
          name: 'vehicleId', // Foreign key column name
        },
    },
    Service_centers: {
        type: 'many-to-one',
        target: Service_centers, // Name of the target entity
        joinColumn: {
          name: 'serviceCenterId', // Foreign key column name
        },
    },
  },
});

module.exports = Service_bookings;