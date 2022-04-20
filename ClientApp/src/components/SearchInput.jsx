const SearchInput = ({ value, setValue }) => {

    return (
        <input
            value={value}
            onInput={(e) => setValue(e.target.value)}
            className="form-control col-xs-2"
            type="search"
            placeholder="Search"
            aria-label="Search" />
    )
}

export default SearchInput