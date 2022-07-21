const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Client, Skill, ClientSkill } = db;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/clients', async(req, res, next)=> {
  try {
    res.send(await Client.findAll());
  }
  catch (ex) {
    next(ex);
  }
});

app.get('/api/skills', async(req, res, next)=> {
  try {
    res.send(await Skill.findAll());
  }
  catch (ex) {
    next(ex);
  }
});

app.get('/api/clientSkills', async(req, res, next)=> {
  try {
    res.send(await ClientSkill.findAll());
  }
  catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

const init = async()=> {
  try {
    await db.conn.sync({ force: true });
    
    const [moe, larry, lucy, ethyl] = await Promise.all(
      ['moe', 'larry', 'lucy', 'ethyl'].map(name => {
        return Client.create({ name })
      })
    );
    const [dancing, singing, plateSpinning] = await Promise.all(
      ['dancing', 'singing', 'plateSpinning'].map(name => {
        return Skill.create({ name })
      })
    );

    await Promise.all([
      ClientSkill.create({
        clientId: moe.id,
        skillId: dancing.id,
      }),
      ClientSkill.create({
        clientId: moe.id,
        skillId: singing.id,
      }),
      ClientSkill.create({
        clientId: lucy.id,
        skillId: singing.id,
      }),
    ]);

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
