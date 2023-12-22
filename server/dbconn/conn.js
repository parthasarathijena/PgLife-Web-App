const mongoose = require('mongoose');

const dburl = 'mongodb+srv://jubul577:partha123@pglife.up6hriq.mongodb.net/pgdata?retryWrites=true&w=majority';

mongoose.connect(dburl).then(()=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.log(err);
})