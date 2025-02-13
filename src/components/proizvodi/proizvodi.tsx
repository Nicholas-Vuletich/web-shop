import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import "./proizvodi.css";

interface Proizvod {
  id: string;
  naziv: string;
  opis: string;
  cijena: number;
  slikaPath?: string; // Dodana provjera ako `slikaPath` ne postoji
  slikaURL?: string;
}

const Proizvodi: React.FC = () => {
  const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProizvodi = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Suplementi"));
        const proizvodiData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data() as Proizvod;

            let slikaURL = "";
            if (data.slikaURL) {
              let storagePath = data.slikaURL;
            
              if (storagePath.startsWith("gs://")) {
                storagePath = storagePath.split("/").slice(3).join("/"); 
              }
            
              try {
                const imageRef = ref(storage, storagePath);
                slikaURL = await getDownloadURL(imageRef);
              } catch (error) {
                console.error("Greška pri dohvaćanju slike:", error);
              }
            }
            
            return { ...data, id: doc.id, slikaURL };
          })
        );

        setProizvodi(proizvodiData);
      } catch (error) {
        console.error("Greška pri dohvaćanju proizvoda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProizvodi();
  }, []);

  if (loading) {
    return <p>Učitavanje proizvoda...</p>;
  }

  return (
    <div className="proizvodi-container">
      <h2 className="proizvodi-title">Proizvodi</h2>
      <ul className="proizvodi-list">
        {proizvodi.length > 0 ? (
          proizvodi.map((proizvod) => (
            <li key={proizvod.id} className="proizvod-item">
              <h3 className="proizvod-name">{proizvod.naziv}</h3>
              <p className="proizvod-description">{proizvod.opis}</p>
              <p className="proizvod-price">Cijena: {proizvod.cijena} €</p>
              {proizvod.slikaURL ? (
                <img src={proizvod.slikaURL} alt={proizvod.naziv} className="proizvod-image" />
              ) : (
                <p className="slika-nedostupna">Slika nije dostupna</p>
              )}
            </li>
          ))
        ) : (
          <p className="nema-proizvoda">Nema dostupnih proizvoda.</p>
        )}
      </ul>
    </div>
  );
  
};

export default Proizvodi;
