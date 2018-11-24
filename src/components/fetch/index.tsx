import * as React from 'react'

type FetchProps = {
    url: string
    loadingMessage: React.ReactNode
    children: (json: any) => React.ReactNode
}

type FetchState = {
    url: string
    loading: boolean
    result: object
}

export default class Fetch extends React.Component<FetchProps, FetchState> {
    state: FetchState = {
        url: '',
        loading: false,
        result: null,
    }

    fetch(url: string) {
        this.setState(
            {
                loading: true,
            },
            () => {
                fetch(url)
                    .then(res => res.json())
                    .then(result => {
                        this.setState({
                            url,
                            result,
                            loading: false,
                        })
                    })
            }
        )
    }

    componentWillReceiveProps(nextProps: FetchProps) {
        if (nextProps.url !== this.props.url) {
            this.fetch(nextProps.url)
        }
    }

    componentDidMount() {
        this.fetch(this.props.url)
    }

    render() {
        const { url: resultUrl, loading, result } = this.state
        const { url, loadingMessage, children } = this.props

        if (loading || url !== resultUrl) {
            return loadingMessage
        }

        return children(result)
    }
}
