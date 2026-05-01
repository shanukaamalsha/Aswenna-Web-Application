
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set, remove, push } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyC-OtUg6_wCOCrmU9dwLCRNHq2CFIuw7-E",
  authDomain: "aswenna-8ed3e.firebaseapp.com",
  databaseURL: "https://aswenna-8ed3e-default-rtdb.firebaseio.com",
  projectId: "aswenna-8ed3e",
  storageBucket: "aswenna-8ed3e.firebasestorage.app",
  messagingSenderId: "686567450327",
  appId: "1:686567450327:web:5ab3eed23cd410c16ef292"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function cleanupAndPopulate() {
  try {
    console.log("Starting database cleanup...");

    // 1. Get all nodes
    const rootRef = ref(db, "/");
    const snapshot = await get(rootRef);
    const data = snapshot.val();

    if (!data) {
      console.log("No data found in database.");
      return;
    }

    // Nodes to clear entirely
    const nodesToClear = ["advisors", "consultations", "harvestLogs", "news", "tradePosts"];
    
    for (const node of nodesToClear) {
      console.log(`Clearing ${node}...`);
      await remove(ref(db, node));
    }

    // 2. Cleanup Users (Keep only the specified admin)
    console.log("Cleaning up users...");
    const adminId = "-OqzAdminUser12345678";
    const users = data.users || {};
    const adminData = users[adminId];

    if (adminData) {
      await set(ref(db, "users"), { [adminId]: adminData });
    } else {
      console.warn("Admin user not found! Keeping empty users table.");
      await remove(ref(db, "users"));
    }

    // 3. Add 6 records (3 Farmers, 3 Buyers) to Users
    console.log("Adding dummy users...");
    const dummyUsers = [
      { firstName: "Sunil", lastName: "Perera", email: "sunil@example.com", role: "farmer", phone: "0771234567", district: "Anuradhapura" },
      { firstName: "Kamal", lastName: "Gunaratne", email: "kamal@example.com", role: "farmer", phone: "0712345678", district: "Polonnaruwa" },
      { firstName: "Nimal", lastName: "Siripala", email: "nimal@example.com", role: "farmer", phone: "0723456789", district: "Kurunegala" },
      { firstName: "Aruna", lastName: "Silva", email: "aruna@example.com", role: "buyer", phone: "0754567890", district: "Colombo" },
      { firstName: "Bandara", lastName: "Kularatne", email: "bandara@example.com", role: "buyer", phone: "0765678901", district: "Gampaha" },
      { firstName: "Saman", lastName: "Kumara", email: "saman@example.com", role: "buyer", phone: "0786789012", district: "Kandy" }
    ];

    for (const user of dummyUsers) {
      await push(ref(db, "users"), user);
    }

    // 4. Populate other nodes with 6 records each
    console.log("Populating other nodes...");

    // Advisors
    const dummyAdvisors = [
      { name: "Dr. Sumith", specialization: "Pest Control", office: "Dept. of Agriculture", district: "Colombo", phone: "0112233445", email: "sumith@agri.gov.lk", status: "active" },
      { name: "Dr. Kapila", specialization: "Soil Science", office: "Rice Research Inst.", district: "Kurunegala", phone: "0372233445", email: "kapila@rri.lk", status: "active" },
      { name: "Dr. Deepthi", specialization: "Crop Genetics", office: "Univ. of Peradeniya", district: "Kandy", phone: "0812233445", email: "deepthi@pdn.ac.lk", status: "active" },
      { name: "Dr. Rohana", specialization: "Irrigation", office: "Mahaweli Authority", district: "Polonnaruwa", phone: "0272233445", email: "rohana@mahaweli.lk", status: "active" },
      { name: "Dr. Priyantha", specialization: "Organic Farming", office: "Organic Dev. Board", district: "Matale", phone: "0662233445", email: "priyantha@odb.lk", status: "active" },
      { name: "Dr. Nilmini", specialization: "Agro-Economy", office: "Cargills Agri", district: "Nuwara Eliya", phone: "0522233445", email: "nilmini@cargills.lk", status: "active" }
    ];
    for (const adv of dummyAdvisors) await push(ref(db, "advisors"), adv);

    // News
    const dummyNews = [
      { title: "New Subsidy for Organic Fertilizer", content: "The government has announced a 50% subsidy for organic fertilizers starting next month.", createdAt: Date.now() },
      { title: "Paddy Harvest Reaches Record High", content: "This season's paddy harvest has exceeded expectations in the North Central province.", createdAt: Date.now() - 86400000 },
      { title: "Upcoming Agri-Tech Workshop", content: "Join our online workshop on smart irrigation systems this Sunday at 10 AM.", createdAt: Date.now() - 172800000 },
      { title: "Fuel Quota Increase for Farmers", content: "Registered farmers can now apply for an increased fuel quota for agricultural machinery.", createdAt: Date.now() - 259200000 },
      { title: "New Pest Alert: Brown Plant Hopper", content: "Outbreaks reported in Kurunegala district. Please follow recommended pest control measures.", createdAt: Date.now() - 345600000 },
      { title: "Export Opportunities for Keeri Samba", content: "International buyers are looking for premium quality Keeri Samba from Sri Lanka.", createdAt: Date.now() - 432000000 }
    ];
    for (const news of dummyNews) await push(ref(db, "news"), news);

    // Harvest Logs
    const dummyLogs = [
      { userId: "dummy1", paddyType: "Keeri Samba", landSize: 5, currentPhase: "Seeding", startDate: "2024-04-01" },
      { userId: "dummy2", paddyType: "Nadu", landSize: 10, currentPhase: "Growth", startDate: "2024-03-15" },
      { userId: "dummy3", paddyType: "Samba", landSize: 3, currentPhase: "Harvesting", startDate: "2024-05-20" },
      { userId: "dummy4", paddyType: "Basmati", landSize: 2, currentPhase: "Growth", startDate: "2024-04-10" },
      { userId: "dummy5", paddyType: "Suwandel", landSize: 1.5, currentPhase: "Seeding", startDate: "2024-05-05" },
      { userId: "dummy6", paddyType: "Kalu Heenati", landSize: 4, currentPhase: "Growth", startDate: "2024-03-20" }
    ];
    for (const log of dummyLogs) await push(ref(db, "harvestLogs"), log);

    // Trade Posts
    const dummyTrades = [
      { creatorName: "Sunil Perera", paddyType: "Keeri Samba", role: "farmer", availableQty: 1000, pricePerKg: 130, status: "available", timestamp: Date.now() },
      { creatorName: "Kamal Gunaratne", paddyType: "Nadu", role: "farmer", availableQty: 2500, pricePerKg: 105, status: "available", timestamp: Date.now() - 3600000 },
      { creatorName: "Nimal Siripala", paddyType: "Samba", role: "farmer", availableQty: 500, pricePerKg: 120, status: "available", timestamp: Date.now() - 7200000 },
      { creatorName: "Aruna Silva", paddyType: "Basmati", role: "buyer", availableQty: 5000, pricePerKg: 250, status: "requested", timestamp: Date.now() - 10800000 },
      { creatorName: "Bandara Kularatne", paddyType: "Suwandel", role: "buyer", availableQty: 200, pricePerKg: 300, status: "requested", timestamp: Date.now() - 14400000 },
      { creatorName: "Saman Kumara", paddyType: "Nadu", role: "buyer", availableQty: 10000, pricePerKg: 110, status: "requested", timestamp: Date.now() - 18000000 }
    ];
    for (const trade of dummyTrades) await push(ref(db, "tradePosts"), trade);

    console.log("Database cleanup and population successful!");
    process.exit(0);

  } catch (error) {
    console.error("Error during database operation:", error);
    process.exit(1);
  }
}

cleanupAndPopulate();
