import * as React from 'react'

import Component from './index'
import { shallow, ShallowWrapper } from 'enzyme'

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
})
