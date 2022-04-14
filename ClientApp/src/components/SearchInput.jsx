const SearchInput = ({value, setValue}) => {

    return (
         <input 
            value={value}
            onInput={(e) => setValue(e.target.value) }
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search" />
    )
}

export default SearchInput