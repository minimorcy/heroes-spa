import { HeroCard } from "../components"
import { useSearch } from "../hooks/useSearch"

 export const SearchPage = () => 
 {
    const 
    {
        searchText, 
        onSearchSubmit, 
        onInputChange, 
        showSearch, 
        showError, 
        q, 
        heroes
    } = useSearch()
    
    return (
        <>
            <h1>Search</h1>
            <hr/> 
            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr/>
                    <form aria-label="form-text" onSubmit={onSearchSubmit}>
                        <input 
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            aria-label="search-text"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? '' : 'none'}}>
                        Search a hero
                    </div>
                    <div aria-label="alert-danger" className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? '' : 'none'}}>
                        No hero with <b>{q}</b>
                    </div>
                    {
                        heroes.map(hero => 
                        (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
