import * as React from 'react'
import Component from './index'
import { shallow } from 'enzyme'

describe('Component', () => {
    it('should render', () => {
        expect(
            shallow(<Component />).containsMatchingElement(
                <div className="app">Hello React</div>
            )
        ).toBe(true)
    })
})
