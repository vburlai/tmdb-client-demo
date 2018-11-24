import * as React from 'react'

import Component, { SearchBoxProps, SearchBoxState } from './index'
import { shallow, ShallowWrapper } from 'enzyme'

describe('SearchBox', () => {
    let component: ShallowWrapper<SearchBoxProps, SearchBoxState>
    let updateValue: any
    beforeAll(() => {
        updateValue = jest.fn()
        component = shallow(<Component updateValue={updateValue} />)
        component.setState({ value: 'query' })
    })

    it("renders input with value='query'", () => {
        expect(
            component.containsMatchingElement(
                <input
                    className="form-control form-control-lg borderless"
                    type="search"
                    placeholder="Search topics or keywords"
                    value="query"
                />
            )
        ).toBe(true)
    })

    it('renders submit button', () => {
        expect(
            component.containsMatchingElement(
                <button className="btn btn-lg btn-success" type="submit">
                    Search
                </button>
            )
        ).toBe(true)
    })

    describe('input onchage', () => {
        let event: any
        beforeAll(() => {
            event = {
                target: { value: 'test' },
                stopPropagation: jest.fn(),
            }
            component.find('input').prop('onChange')(event)
        })

        it('updates state.value', () => {
            expect(component.state()).toEqual({ value: 'test' })
        })

        it('calls e.stopPropagation', () => {
            expect(event.stopPropagation).toHaveBeenCalled()
        })
    })

    describe('form onsubmit', () => {
        let event: any
        beforeAll(() => {
            event = {
                target: {},
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }
            component.setState({ value: 'query' })
            component.find('form').prop('onSubmit')(event)
        })

        it('calls e.stopPropagation', () => {
            expect(event.stopPropagation).toHaveBeenCalled()
        })

        it('calls e.preventDefault', () => {
            expect(event.stopPropagation).toHaveBeenCalled()
        })

        it('calls updateValue() prop', () => {
            expect(updateValue).toHaveBeenCalledWith('query')
        })
    })
})
