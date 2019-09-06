import App from 'next/app'
import React from 'react'
import ShellStore from '../shell/Store'
import { Provider } from 'mobx-react'

class InjectedApp extends App {
	state = {
		shell: new ShellStore(),
	}

	render() {
		const { Component, pageProps } = this.props
		return (
		<Provider shell={this.state.shell}>
			<Component {...pageProps} />
		</Provider>
		)
	}
}

export default InjectedApp
