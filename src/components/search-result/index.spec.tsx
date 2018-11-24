import * as React from 'react'

import Component, { SearchResultProps } from './index'
import { shallow, ShallowWrapper } from 'enzyme'

describe('SearchResult', () => {
    let component: ShallowWrapper<SearchResultProps, null>

    describe('Movie with poster', () => {
        beforeAll(() => {
            component = shallow(
                <Component
                    result={{
                        id: 1,
                        media_type: 'movie',
                        title: 'Movie Title',
                        poster_path: '/poster.jpg',
                        overview: 'Movie description',
                    }}
                />
            )
        })

        it('should render', () => {
            expect(
                component.containsMatchingElement(
                    <div className="row ">
                        <div className="col-md-4">
                            <img
                                src="https://image.tmdb.org/t/p/w200/poster.jpg"
                                className="w-100"
                            />
                        </div>
                        <div className="col-md-8 px-3">
                            <div className="card-block px-3">
                                <h4 className="card-title">
                                    Movie Title (movie)
                                </h4>
                                <p className="card-text">Movie description</p>
                            </div>
                        </div>
                    </div>
                )
            ).toBe(true)
        })
    })

    describe('TV series with poster', () => {
        beforeAll(() => {
            component = shallow(
                <Component
                    result={{
                        id: 1,
                        media_type: 'tv',
                        name: 'TV Series Title',
                        poster_path: '/poster.jpg',
                        overview: 'TV Series description',
                    }}
                />
            )
        })

        it('should render', () => {
            expect(
                component.containsMatchingElement(
                    <div className="row ">
                        <div className="col-md-4">
                            <img
                                src="https://image.tmdb.org/t/p/w200/poster.jpg"
                                className="w-100"
                            />
                        </div>
                        <div className="col-md-8 px-3">
                            <div className="card-block px-3">
                                <h4 className="card-title">
                                    TV Series Title (tv)
                                </h4>
                                <p className="card-text">
                                    TV Series description
                                </p>
                            </div>
                        </div>
                    </div>
                )
            ).toBe(true)
        })
    })

    describe('TV series without a poster', () => {
        beforeAll(() => {
            component = shallow(
                <Component
                    result={{
                        id: 1,
                        media_type: 'tv',
                        name: 'TV Series Title',
                        poster_path: null,
                        overview: 'TV Series description',
                    }}
                />
            )
        })

        it('should render Nicholas Cage as poster', () => {
            expect(
                component.containsMatchingElement(
                    <div className="row ">
                        <div className="col-md-4">
                            <img
                                src="https://www.placecage.com/200/300"
                                className="w-100"
                            />
                        </div>
                        <div className="col-md-8 px-3">
                            <div className="card-block px-3">
                                <h4 className="card-title">
                                    TV Series Title (tv)
                                </h4>
                                <p className="card-text">
                                    TV Series description
                                </p>
                            </div>
                        </div>
                    </div>
                )
            ).toBe(true)
        })
    })
})
