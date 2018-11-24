import * as React from 'react'
import Component from './index'
import { shallow, ShallowWrapper } from 'enzyme'
jest.mock('../search-box', () => ({
    default: function SearchBox(): null {
        return null
    },
}))
import SearchBox from '../search-box'
jest.mock('../search-results', () => ({
    default: function SearchResults(): null {
        return null
    },
}))
import SearchResults from '../search-results'

describe('Component', () => {
    describe("[state.search === ''", () => {
        let component: ShallowWrapper<{}, any>

        beforeAll(() => {
            component = shallow(<Component />)
        })

        it('should render just SearchBox', () => {
            expect(
                component.containsMatchingElement(
                    <div className="app">
                        <SearchBox />
                    </div>
                )
            ).toBe(true)
        })
    })

    describe("[state.search !== ''", () => {
        let component: ShallowWrapper<{}, any>

        beforeAll(() => {
            component = shallow(<Component />)
            component.setState({ search: 'query' })
        })

        it('should render SearchBox and SearchResults', () => {
            expect(
                component.containsMatchingElement(
                    <div className="app">
                        <SearchBox />
                        <SearchResults search="query" />
                    </div>
                )
            ).toBe(true)
        })
    })
})
