
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-OtUg6_wCOCrmU9dwLCRNHq2CFIuw7-E",
  authDomain: "aswenna-8ed3e.firebaseapp.com",
  databaseURL: "https://aswenna-8ed3e-default-rtdb.firebaseio.com",
  projectId: "aswenna-8ed3e",
  storageBucket: "aswenna-8ed3e.firebasestorage.app",
  messagingSenderId: "686567450327",
  appId: "1:686567450327:web:5ab3eed23cd410c16ef292",
  measurementId: "G-BMM9EH874B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const advisorData = [
  { district: "Colombo", name: "Mr. R.A.P. Perera", profession: "regional-officer", specialization: "Agrarian Services", phone: "011-2368142", office: "Colombo Agrarian Service Centre", email: "perera.rap@aswenna.gov.lk" },
  { district: "Gampaha", name: "Mr. D. A. Ahangangoda", profession: "regional-officer", specialization: "Paddy Extension", phone: "033-2222452", office: "Gampaha District Secretariat", email: "ahangangoda.da@aswenna.gov.lk" },
  { district: "Kalutara", name: "Mr. W.M.C. Weerakoon", profession: "research-officer", specialization: "Seed Technology", phone: "034-2222123", office: "Rice Research Station, Bombuwala", email: "weerakoon.wmc@aswenna.gov.lk" },
  { district: "Kandy", name: "Ms. D.P. Karunananda", profession: "soil-specialist", specialization: "Soil Fertility & Management", phone: "081-2222341", office: "Department of Agriculture, Peradeniya", email: "karunananda.dp@aswenna.gov.lk" },
  { district: "Matale", name: "Dr. G.D.G. Chathurani", profession: "research-officer", specialization: "Crop Protection", phone: "066-2222451", office: "In-Service Training Institute, Mahailluppallama", email: "chathurani.gdg@aswenna.gov.lk" },
  { district: "Nuwara Eliya", name: "Ms. N.R.N. Silva", profession: "soil-specialist", specialization: "Plant Nutrition", phone: "052-2222543", office: "Agriculture Extension Office, Nuwara Eliya", email: "silva.nrn@aswenna.gov.lk" },
  { district: "Galle", name: "Mr. P.P.K. Muthukumarana", profession: "irrigation-expert", specialization: "Water Management", phone: "091-2222121", office: "Irrigation Department, Galle", email: "muthukumarana.ppk@aswenna.gov.lk" },
  { district: "Matara", name: "Mr. E.P. Sugathapala", profession: "regional-officer", specialization: "Field Crops", phone: "041-2222432", office: "Matara Agrarian Service Centre", email: "sugathapala.ep@aswenna.gov.lk" },
  { district: "Hambantota", name: "Mr. P. S. Ramanayake", profession: "irrigation-expert", specialization: "Paddy Irrigation Systems", phone: "047-2222143", office: "Rice Research Station, Ambalantota", email: "ramanayake.ps@aswenna.gov.lk" },
  { district: "Jaffna", name: "Ms. T. Murugeson", profession: "regional-officer", specialization: "Extension Planning", phone: "021-2220843", office: "Provincial Director of Agriculture Office", email: "murugeson.t@aswenna.gov.lk" },
  { district: "Kilinochchi", name: "Mr. S. Sivanesan", profession: "research-officer", specialization: "Rice Breeding", phone: "021-2285513", office: "Regional Agriculture Research & Development Centre", email: "sivanesan.s@aswenna.gov.lk" },
  { district: "Mannar", name: "Mr. S. Jeyakumar", profession: "regional-officer", specialization: "Land Development", phone: "023-2222031", office: "Mannar Agrarian Development Office", email: "jeyakumar.s@aswenna.gov.lk" },
  { district: "Vavuniya", name: "Ms. S. Rekha", profession: "soil-specialist", specialization: "Integrated Farming", phone: "024-2222134", office: "Vavuniya District Secretariat", email: "rekha.s@aswenna.gov.lk" },
  { district: "Mullaitivu", name: "Mr. K. Pathmanathan", profession: "regional-officer", specialization: "Agrarian Operations", phone: "021-2290045", office: "Mullaitivu Agrarian Office", email: "pathmanathan.k@aswenna.gov.lk" },
  { district: "Batticaloa", name: "Mr. S. Baskaran", profession: "research-officer", specialization: "Pest & Disease Control", phone: "065-2222144", office: "Rice Research Station, Karadianaru", email: "baskaran.s@aswenna.gov.lk" },
  { district: "Ampara", name: "Mr. M.S.A. Kaleel", profession: "irrigation-expert", specialization: "Canal Management", phone: "063-2222122", office: "Irrigation Department, Ampara", email: "kaleel.msa@aswenna.gov.lk" },
  { district: "Trincomalee", name: "Mr. R. Gokulananthan", profession: "regional-officer", specialization: "Field Extension", phone: "026-2222341", office: "Trincomalee Agrarian Service Centre", email: "gokulananthan.r@aswenna.gov.lk" },
  { district: "Kurunegala", name: "Mr. S.B.S.K. Semasinghe", profession: "research-officer", specialization: "Seed Quality Control", phone: "037-2222143", office: "Rice Research & Development Institute, Bathalagoda", email: "semasinghe.sbsk@aswenna.gov.lk" },
  { district: "Puttalam", name: "Mr. G.K.S. Pushpakumara", profession: "soil-specialist", specialization: "Saline Soil Management", phone: "032-2222122", office: "Puttalam Agriculture Extension Office", email: "pushpakumara.gks@aswenna.gov.lk" },
  { district: "Anuradhapura", name: "Mr. H.M.J.K. Herath", profession: "research-officer", specialization: "High-Yielding Varieties", phone: "025-2222322", office: "Regional Agriculture Research Station, Mahailluppallama", email: "herath.hmjk@aswenna.gov.lk" },
  { district: "Polonnaruwa", name: "Mr. P.G.S. Shantha", profession: "irrigation-expert", specialization: "Large Scale Irrigation", phone: "027-2222431", office: "Irrigation Department, Polonnaruwa", email: "shantha.pgs@aswenna.gov.lk" },
  { district: "Badulla", name: "Mr. R. D. A. Chamara", profession: "regional-officer", specialization: "Upland Cultivation", phone: "055-2222143", office: "Badulla Agrarian Service Centre", email: "chamara.rda@aswenna.gov.lk" },
  { district: "Monaragala", name: "Mr. J.M.N.S. Jayasekara", profession: "regional-officer", specialization: "Agrarian Economy", phone: "055-2276123", office: "District Secretariat Monaragala", email: "jayasekara.jmns@aswenna.gov.lk" },
  { district: "Ratnapura", name: "Mr. V.G.S. Sandaruwan", profession: "soil-specialist", specialization: "Soil Conservation", phone: "045-2222122", office: "Ratnapura Agriculture Division", email: "sandaruwan.vgs@aswenna.gov.lk" },
  { district: "Kegalle", name: "Mr. B.A.C.P. Kumara", profession: "regional-officer", specialization: "Technical Services", phone: "035-2222451", office: "Kegalle Agrarian Service Centre", email: "kumara.bacp@aswenna.gov.lk" }
];

// Profile images for context (diverse South Asian looking professionals)
const maleImages = [
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
];

const femaleImages = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200"
];

async function uploadSpecificAdvisors() {
    console.log("🚀 Starting upload of 25 specific advisors...");
    const advisorsRef = ref(database, 'advisors');

    for (const item of advisorData) {
        try {
            const isFemale = item.name.startsWith("Ms.") || item.name.startsWith("Dr. G.D.G."); 
            const pool = isFemale ? femaleImages : maleImages;
            const imageUrl = pool[Math.floor(Math.random() * pool.length)];

            const newEntryRef = push(advisorsRef);
            const dataToUpload = {
                ...item,
                id: newEntryRef.key,
                profileImageUri: imageUrl,
                avatar: imageUrl,
                status: "active",
                createdAt: serverTimestamp(),
                createdBy: "admin",
                lastUpdated: serverTimestamp(),
                updatedBy: "admin"
            };

            await set(newEntryRef, dataToUpload);
            console.log(`✅ Uploaded: ${item.name} (${item.district})`);
        } catch (error) {
            console.error(`❌ Error uploading ${item.name}:`, error);
        }
    }
    console.log("🏁 All 25 specific advisors uploaded successfully!");
    process.exit(0);
}

uploadSpecificAdvisors();
