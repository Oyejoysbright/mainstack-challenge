const { default: mongoose } = require("mongoose");

beforeAll(async () => {
    mongoose.connect(process.env['MONGO_URI']);
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });