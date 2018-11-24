import * as React from 'react'

export type ISearchResult = {
    id: number
    media_type: string
    title?: string
    name?: string
    poster_path: string
    overview: string
}

export type SearchResultProps = {
    result: ISearchResult
}

function SearchResult({ result }: SearchResultProps) {
    const { media_type, title, name, poster_path, overview } = result

    return (
        <section>
            <div className="py-3">
                <div className="card">
                    <div className="row ">
                        <div className="col-md-4">
                            <img
                                src={
                                    poster_path
                                        ? `https://image.tmdb.org/t/p/w200${poster_path}`
                                        : 'https://www.placecage.com/200/300'
                                }
                                className="w-100"
                            />
                        </div>
                        <div className="col-md-8 px-3">
                            <div className="card-block px-3">
                                <h4 className="card-title">
                                    {title ? title : name} ({media_type})
                                </h4>
                                <p className="card-text">{overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchResult
