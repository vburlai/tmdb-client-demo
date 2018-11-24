import * as React from 'react'

import Component from './index'
import { shallow, ShallowWrapper } from 'enzyme'
jest.mock('../fetch', () => ({
    default: function Fetch(): null {
        return null
    },
}))
import Fetch from '../fetch'
jest.mock('../search-result', () => ({
    default: function SearchResult(): null {
        return null
    },
}))
import SearchResult from '../search-result'

describe('SearchResults', () => {
    let component: ShallowWrapper<{ search: string }, null>
    beforeAll(() => {
        component = shallow(<Component search="query" />)
    })

    it('renders message', () => {
        expect(
            component.containsMatchingElement(
                <h1>
                    Search results for '<i>query</i>':
                </h1>
            )
        ).toBe(true)
    })

    it('renders Fetch', () => {
        expect(component.find(Fetch).length).toBe(1)
    })

    it('Fetch props', () => {
        expect(component.find(Fetch).props()).toEqual({
            url: '/api/search?query=query',
            loadingMessage: 'Loading...',
            children: expect.anything(),
        })
    })

    describe('Fetch.children function', () => {
        let children: any
        const sampleResult = {
            media_type: 'tv',
            name: 'Name',
            poster_path: '/poster.jpg',
            overview: '',
        }
        const response = {
            total_results: 99,
            results: [
                { id: 1, ...sampleResult },
                { id: 2, ...sampleResult },
                { id: 3, ...sampleResult },
            ],
        }
        beforeAll(() => {
            children = component.find(Fetch).prop('children')
        })

        it('renders header', () => {
            expect(
                shallow(children(response))
                    .find('h2')
                    .text()
            ).toBe('Found 99 entries, showing first 3 results')
        })

        it('renders 3x SearchResult', () => {
            expect(
                shallow(children(response)).containsAllMatchingElements([
                    <SearchResult key={1} result={response.results[0]} />,
                    <SearchResult key={2} result={response.results[1]} />,
                    <SearchResult key={3} result={response.results[2]} />,
                ])
            ).toBe(true)
        })
    })
})
