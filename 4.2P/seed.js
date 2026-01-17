// seed.js - run once to populate DB: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cityeventsDB';

async function run() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  // optional: clear collection
  await Event.deleteMany({});

  const events = [
    {
      title: "Riverside Farmers Market",
      slug: "riverside-farmers-market",
      date: "2025-12-06",
      location: "glenroy",
      image: "/images/marketday.jpg",
      description: "Fresh produce, coffee stalls and live music."
    },
    {
      title: "Coding for Beginners Meetup",
      slug: "coding-for-beginners-meetup",
      date: "2025-12-10",
      location: "deakin",
      image: "/images/codingmeet.jpg",
      description: "Introductory session on JavaScript and Node basics."
    },
    {
      title: "Community Tree Planting",
      slug: "community-tree-planting",
      date: "2025-12-14",
      location: "westpark",
      image: "/images/commtreeplant.jpg",
      description: "Volunteer-driven tree planting event. Bring gloves!"
    }
  ];

  await Event.insertMany(events);
  console.log('Database seeded successfully!');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
