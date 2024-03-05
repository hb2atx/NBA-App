
const whitelist = [
    'http://localhost:3001',
    'http://localhost:3500'
    // Add other allowed origins as needed
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  };
  
  module.exports = corsOptions;