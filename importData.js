import admin from "firebase-admin";
import { readFileSync } from "fs";

// Chemin vers la clé privée Firebase Admin SDK
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Charger le fichier JSON
const data = JSON.parse(readFileSync("toudoux_data_import.json", "utf8"));

// Fonction pour importer les données dans Firestore
async function importData() {
  for (const [collection, documents] of Object.entries(data)) {
    const collectionRef = db.collection(collection);

    for (const [docId, docData] of Object.entries(documents)) {
      await collectionRef.doc(docId).set(docData);
      console.log(`Document ${docId} importé dans la collection ${collection}`);
    }
  }
  console.log("Importation terminée !");
}

// Exécuter la fonction d'importation
importData().catch(console.error);
