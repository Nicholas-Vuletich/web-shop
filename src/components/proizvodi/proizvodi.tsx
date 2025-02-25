import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import SearchFilter from "../pretraga/searchFilter";
import "./proizvodi.css";

interface Proizvod {
  id: string;
  naziv: string;
  opis: string;
  cijena: number;
  kategorija: string;
  slikaPath?: string;
  slikaURL?: string;
}

const Proizvodi: React.FC = () => {
  const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const [ukupanBrojProizvoda, setUkupanBrojProizvoda] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const proizvodiPoStranici = 6;
  const ukupnoStranica = Math.ceil(ukupanBrojProizvoda / proizvodiPoStranici);

  useEffect(() => {
    const fetchUkupanBrojProizvoda = async () => {
      const querySnapshot = await getDocs(collection(db, "Suplementi"));
      setUkupanBrojProizvoda(querySnapshot.size);
    };
    fetchUkupanBrojProizvoda();
  }, []);

  const fetchProizvodi = async (page = 1) => {
    setLoading(true);
    try {
      let proizvodiQuery = query(
        collection(db, "Suplementi"),
        orderBy("naziv"),
        limit(proizvodiPoStranici)
      );

      if (page > 1 && lastDoc) {
        proizvodiQuery = query(proizvodiQuery, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(proizvodiQuery);

      if (!querySnapshot.empty) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

        const proizvodiData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data() as Proizvod;
            let slikaURL = data.slikaURL || "";

            if (data.slikaURL?.startsWith("gs://")) {
              try {
                const storagePath = data.slikaURL.replace("gs://web-shop1-ab141.firebasestorage.app/", "");
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
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju proizvoda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProizvodi(trenutnaStranica);
  }, [trenutnaStranica]);

  const handleNextPage = () => {
    if (trenutnaStranica < ukupnoStranica) {
      setTrenutnaStranica((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (trenutnaStranica > 1) {
      setTrenutnaStranica((prev) => prev - 1);
    }
  };

  const filtriraniProizvodi = proizvodi.filter(
    (proizvod) =>
      proizvod.naziv.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || proizvod.kategorija === filterCategory)
  );

  if (loading) {
    return <p>Učitavanje proizvoda...</p>;
  }

  return (
    <div className="proizvodi-container">
      <h2 className="proizvodi-title">Proizvodi</h2>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <ul className="proizvodi-list">
        {filtriraniProizvodi.length > 0 ? (
          filtriraniProizvodi.map((proizvod) => (
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

      <div className="paginacija">
        <button className="paginacija-btn" onClick={handlePrevPage} disabled={trenutnaStranica === 1}>
          Prethodna
        </button>

        {[...Array(ukupnoStranica)].map((_, index) => (
          <button
            key={index + 1}
            className={`broj-stranice ${trenutnaStranica === index + 1 ? "aktivna-stranica" : ""}`}
            onClick={() => setTrenutnaStranica(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button className="paginacija-btn" onClick={handleNextPage} disabled={trenutnaStranica >= ukupnoStranica}>
          Sljedeća
        </button>
      </div>
    </div>
  );
};

export default Proizvodi;
