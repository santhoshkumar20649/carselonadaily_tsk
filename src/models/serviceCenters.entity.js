const { EntitySchema } = require('typeorm');
const User = require('../models/user.entity')

const Service_centers = new EntitySchema({
  name: 'Service_centers',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    userId: {
        type: 'int',
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    location: {
      type: 'varchar',
      length: 255,
    },
    isActive: {
        type: 'boolean',
        default: true
    },
    workingHour: {
        type: 'varchar',
        length: 255,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  listeners: {
    beforeUpdate(event) {
      // Update the 'updated' column before updating the record
      event.entity.updated_at = new Date();
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
  }
});

module.exports = Service_centers;