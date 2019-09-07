import App from 'next/app'
import React from 'react'
import ShellStore from '../shell/Store'
import MapsStore from '../maps/Store'
import { Provider } from 'mobx-react'

class InjectedApp extends App {
	state = {
		shell: new ShellStore(),
		maps: new MapsStore(),
	}

	render() {
		const { Component, pageProps } = this.props
		return (
		<Provider shell={this.state.shell} maps={this.state.maps}>
			<Component {...pageProps} />
		</Provider>
		)
	}
}

export default InjectedApp
