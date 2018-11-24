import * as React from 'react'

type SearchResultsProps = {
    search: string
}

function SearchResults({ search }: SearchResultsProps) {
    return (
        <h1>
            Search results for '<i>{search}</i>':
        </h1>
    )
}

export default SearchResults
