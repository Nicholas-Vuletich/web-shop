import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";

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
            if (data.slikaPath) {
              let storagePath = data.slikaPath;

              if (storagePath.startsWith("gs://")) {
                storagePath = storagePath.replace("gs://web-shop1-ab141.firebasestorage.app/", "");
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
    <div>
      <h2>Proizvodi</h2>
      <ul>
        {proizvodi.length > 0 ? (
          proizvodi.map((proizvod) => (
            <li key={proizvod.id}>
              <h3>{proizvod.naziv}</h3>
              <p>{proizvod.opis}</p>
              <p>Cijena: {proizvod.cijena} €</p>
              {proizvod.slikaURL ? (
                <img src={proizvod.slikaURL} alt={proizvod.naziv} style={{ width: "150px" }} />
              ) : (
                <p>Slika nije dostupna</p>
              )}
            </li>
          ))
        ) : (
          <p>Nema dostupnih proizvoda.</p>
        )}
      </ul>
    </div>
  );
};

export default Proizvodi;
