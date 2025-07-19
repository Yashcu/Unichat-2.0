// createAdmin.js
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  if (!MONGO_URI) {
    console.error('MONGO_URI not found in .env file. Please add it.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected...');

    const adminEmail = 'admin@university.com'; // Use this to log in

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      mongoose.connection.close();
      return;
    }

    // --- CREATE YOUR ADMIN USER ---
    const adminPassword = 'adminpassword'; // Choose a strong password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = new User({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin', // This is the important part
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

  } catch (err) {
    console.error('Error creating admin user:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

createAdmin();