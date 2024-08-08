export default function SearchBar({ filterProducts }) {
  const handleSearch = (e) => {
    filterProducts(e);
  };

  return (
    <div className="my-5 w-75 mx-auto">
      <input
        type="text"
        className="form-control"
        id="search-input"
        onChange={handleSearch}
        placeholder="Search by product name..."
      />
    </div>
  );
}
