import * as React from 'react'

import Fetch from '../fetch'

import SearchResult, { ISearchResult } from '../search-result'

type SearchResultsProps = {
    search: string
}

function SearchResults({ search }: SearchResultsProps) {
    return (
        <div>
            <h1>
                Search results for '<i>{search}</i>':
            </h1>
            <Fetch
                url={`/api/search?query=${encodeURIComponent(search)}`}
                loadingMessage="Loading..."
            >
                {response => (
                    <div>
                        <h2>
                            Found <b>{response.total_results}</b> entries,
                            showing first {response.results.length} results
                        </h2>
                        {response.results.map((result: ISearchResult) => (
                            <SearchResult result={result} key={result.id} />
                        ))}
                    </div>
                )}
            </Fetch>
        </div>
    )
}

export default SearchResults
