import React from 'react'
import Head from 'next/head'
import Drawer from './Drawer'
import AppBar from './AppBar'

type Props = {
    title?: string
}

class Shell extends React.Component<Props> {
    render() {
        const { children, title } = this.props
        return(
            <div>

                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                
                <AppBar title={title}/>

                <Drawer />
                
                {children}

            </div>
        )
    }
}

export default Shell
