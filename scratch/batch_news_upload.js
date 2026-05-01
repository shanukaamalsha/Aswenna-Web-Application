
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";
import fs from 'fs';
import path from 'path';

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

// Helper to convert image to Base64
function getBase64(file) {
    if (!fs.existsSync(file)) {
        console.warn(`⚠️ Warning: File not found ${file}`);
        return "";
    }
    const data = fs.readFileSync(file);
    return `data:image/png;base64,${data.toString('base64')}`;
}

const newsData = [
    {
        category: "government-policies",
        createdBy: "ශ්‍රී ලංකා රජයේ ප්‍රවෘත්ති දෙපාර්තමේන්තුව",
        date: "2026-04-03",
        title: "සහල් හිඟය පාලනය සඳහා හදිසි සහල් ආනයන ගැසට් පත්‍රය නිකුත් කිරීම.",
        tagline: "පාරිභෝගිකයා සුරැකීමට රජයෙන් හදිසි තීරණයක්.",
        description: "දේශීය වෙළඳපොළේ පවතින සම්බා සහ කීරි සම්බා සහල් හිඟය පාලනය කිරීම සඳහා විශේෂිත GR 11 සහල් වර්ගය අප්‍රේල් 30 දක්වා ආනයනය කිරීමට රජය අවසර ලබා දී ඇත.",
        thumbnailUri: "news_rice_import_gazette_1777390385955.png",
        url: "http://www.adaderana.lk/news/120645/gazette-issued-on-emergency-importation-of-gr-11-rice-varieties-"
    },
    {
        category: "government-policies",
        createdBy: "කෘෂිකර්ම අමාත්‍යාංශය",
        date: "2026-04-09",
        title: "'ගොවිජන සවිය' (FSSP) තිරසාර කෘෂිකර්ම වැඩපිළිවෙළ ආරම්භය.",
        tagline: "වී ගොවියා බලගන්වන නව ජාතික ප්‍රතිපත්තිය.",
        description: "වී වගාව නවීකරණය කිරීම සහ දේශගුණික විපර්යාසයන්ට ඔරොත්තු දෙන වගා ක්‍රම හඳුන්වා දීම සඳහා වන නව ප්‍රතිපත්ති මාලාවක් ක්‍රියාත්මක කිරීම.",
        thumbnailUri: "news_rice_import_gazette_1777390385955.png", 
        url: "https://agrimin.gov.lk/web/index.php/en/news-events/"
    },
    {
        category: "subsidies",
        createdBy: "කැබිනට් මණ්ඩල තීරණ දැනුම්දීමේ ඒකකය",
        date: "2026-04-12",
        title: "2026 යල කන්නයේ වී වගාව සඳහා හෙක්ටයාරයකට රු. 25,000 ක මූල්‍ය ආධාර.",
        tagline: "යල කන්නයේ වගා වියදම් පියවීමට රජයෙන් සහන.",
        description: "වී වගා කරන ගොවීන්ගේ පොහොර සහ බීජ පිරිවැය අවම කිරීම සඳහා හෙක්ටයාරයකට රුපියල් 25,000 බැගින් සෘජු මූල්‍ය සහනාධාර ලබා දීමට අනුමැතිය හිමිවිය.",
        thumbnailUri: "news_rice_import_gazette_1777390385955.png",
        url: "https://www.themorning.lk/articles/5111vYARxl9aMZAGMySh"
    },
    {
        category: "subsidies",
        createdBy: "ගොවිජන සේවා දෙපාර්තමේන්තුව",
        date: "2026-04-20",
        title: "යල කන්නය සඳහා යුරියා පොහොර සහනාධාර බෙදාහැරීමේ විශේෂ වැඩපිළිවෙළ.",
        tagline: "පොහොර සහනාධාරය සෘජුවම ගොවිජන සේවා මධ්‍යස්ථාන වෙත.",
        description: "ලෝක වෙළඳපොළේ පොහොර මිල ඉහළ ගියද, වී ගොවීන් සඳහා පැරණි මිලටම යුරියා පොහොර නිකුත් කිරීමට රජය තීරණය කර ඇත.",
        thumbnailUri: "news_rice_import_gazette_1777390385955.png",
        url: "https://www.themorning.lk/articles/AWOYFyrLNKpR5mL5fIMG"
    },
    {
        category: "weather",
        createdBy: "කාලගුණ විද්‍යා දෙපාර්තමේන්තුව",
        date: "2026-04-26",
        title: "අන්තර් මෝසම් තත්ත්වය හේතුවෙන් දිවයිනේ ප්‍රදේශ රැසකට සවස් කාලයේ වැසි.",
        tagline: "යල කන්නයේ බිම් සකස් කිරීමට හිතකර කාලගුණයක්.",
        description: "බස්නාහිර, සබරගමුව සහ දකුණු පළාත්වලට මිලිමීටර් 50 ට වැඩි වැසි ඇතිවිය හැකි බවත්, එය වී වගාවේ මූලික කටයුතු වලට හිතකර බවත් නිවේදනය කෙරේ.",
        thumbnailUri: "news_rice_import_gazette_1777390385955.png",
        url: "https://meteo.gov.lk/index.php?lang=si"
    },
    {
        category: "weather",
        createdBy: "ආපදා කළමනාකරණ මධ්‍යස්ථානය (DMC)",
        date: "2026-04-28",
        title: "කුඹුරු ආශ්‍රිතව වැඩ කරන ගොවීන්ට අකුණු අනතුරු පිළිබඳ විශේෂ අනතුරු ඇඟවීමක්.",
        tagline: "සවස් කාලයේ ගිගුරුම් සහිත වැසි සමඟ අකුණු අනතුරු අවදානමක්.",
        description: "අප්‍රේල් මාසයේ පවතින සවස් කාලයේ වැසි සමඟ ප්‍රබල අකුණු ක්‍රියාකාරිත්වයක් පවතින බැවින් එළිමහනේ වැඩ කරන ගොවීන් සුපරීක්ෂාකාරී විය යුතුය.",
        thumbnailUri: "news_rice_import_gazette_1777390385955.png",
        url: "http://www.dmc.gov.lk/index.php?lang=si"
    }
];

async function uploadNews() {
    console.log("🚀 Starting news upload...");
    const newsRef = ref(database, 'news');
    const artifactDir = 'C:\\Users\\sandu\\.gemini\\antigravity\\brain\\a63f689e-bf15-42e7-93c2-4c3de9feb222\\';

    for (const item of newsData) {
        try {
            const fullPath = path.join(artifactDir, item.thumbnailUri);
            const base64Data = getBase64(fullPath);
            
            const newEntryRef = push(newsRef);
            const dataToUpload = {
                ...item,
                id: newEntryRef.key,
                thumbnailUri: base64Data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await set(newEntryRef, dataToUpload);
            console.log(`✅ Uploaded: ${item.title}`);
        } catch (error) {
            console.error(`❌ Error uploading ${item.title}:`, error);
        }
    }
    console.log("🏁 All news uploaded!");
    process.exit(0);
}

uploadNews();
