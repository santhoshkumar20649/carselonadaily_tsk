const { EntitySchema } = require('typeorm');
const User = require('../models/user.entity')
const Vehicle = new EntitySchema({
  name: 'Vehicle',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    userId: {
        type: 'int',
    },
    brand: {
      type: 'varchar',
      length: 255,
    },
    model: {
      type: 'varchar',
      length: 255,
    },
    isActive: {
        type: 'boolean',
        default: true
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
  },
});

module.exports = Vehicle;