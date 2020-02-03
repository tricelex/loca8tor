const mongoose = require('mongoose');
let dbURI = 'mongodb://localhost:27017/loc8r';
if (process.env.NODE_ENV === 'production') {
  dbURI =
    'mongodb://heroku_k31zksbd:7culhjl415qb3vvbm966stfku2@ds033067.mlab.com:33067/heroku_k31zksbd';
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose Connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose Connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose Disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// for app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// for heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
require('./locations');
