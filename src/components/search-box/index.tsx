import * as React from 'react'

import * as styles from './styles.css'

export type SearchBoxProps = {
    updateValue?: (s: string) => void
}

export type SearchBoxState = {
    value: string
}

export default class SearchBox extends React.Component<
    SearchBoxProps,
    SearchBoxState
> {
    state: SearchBoxState = {
        value: '',
    }

    onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const { updateValue } = this.props
        const { value } = this.state
        if (updateValue) {
            updateValue(value)
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()

        this.setState({
            value: e.target.value,
        })
    }

    render() {
        const { value } = this.state

        return (
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card card-sm" onSubmit={this.onFormSubmit}>
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                                <i className="fas fa-search h4 text-body" />
                            </div>
                            <div className="col">
                                <input
                                    className={`form-control form-control-lg ${
                                        styles.borderless
                                    }`}
                                    type="search"
                                    placeholder="Search topics or keywords"
                                    value={value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-auto">
                                <button
                                    className="btn btn-lg btn-success"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
