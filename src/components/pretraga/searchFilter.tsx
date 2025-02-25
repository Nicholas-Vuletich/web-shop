import "./searchFilter.css";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory
}) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Pretraži proizvode..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">Sve kategorije</option>
        <option value="Vitamini">Vitamini</option>
        <option value="Minerali">Minerali</option>
      </select>
    </div>
  );
};

export default SearchFilter;
