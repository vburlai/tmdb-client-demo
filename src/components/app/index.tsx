import * as React from 'react'

import * as styles from './styles.css'

import SearchBox from '../search-box'
import SearchResults from '../search-results'

type AppState = {
    search: string
}

export default class App extends React.Component<{}, AppState> {
    state: AppState = {
        search: '',
    }

    updateSearch = (value: string) => {
        const { search } = this.state

        if (search !== value) {
            this.setState({
                search: value,
            })
        }
    }

    render() {
        const { search } = this.state

        return (
            <div className={styles.app}>
                <SearchBox updateValue={this.updateSearch} />
                {!!search.length && <SearchResults search={search} />}
            </div>
        )
    }
}
