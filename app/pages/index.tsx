import React from 'react'
import fetch from 'isomorphic-unfetch'
import Shell from '../shell/Layout'
const APIURL = 'http://localhost:5000/'

const TestComponent = (props: { test: string }) => (
	<Shell>
		<h1> {props.test} </h1>
	</Shell>
)

TestComponent.getInitialProps = async () => {
	const res = await fetch( APIURL + 'helloworld', {})
	const hello = await res.json()
	return {test: hello.hello}
}

export default TestComponent
