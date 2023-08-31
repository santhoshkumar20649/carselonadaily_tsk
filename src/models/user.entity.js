const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'user',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    email: {
      type: 'varchar',
      length: 255,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    role: {
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
});

module.exports = User;