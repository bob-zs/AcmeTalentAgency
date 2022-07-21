const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_talent_db')

const Client = conn.define('client', {
  name: {
    type: STRING,
  },
})

const Skill = conn.define('skill', {
  name: {
    type: STRING,
  },
})

// intermediate model instead of .belongsToMany to each other for this demo
const ClientSkill = conn.define('clientSkill', {
  clientId: {
    type: INTEGER,
    allowNull: false,
  },
  skillId: {
    type: INTEGER,
    allowNull: false,
  },
});

ClientSkill.belongsTo(Client);
ClientSkill.belongsTo(Skill);


module.exports = {
  conn,
  Client,
  Skill,
  ClientSkill,
}

