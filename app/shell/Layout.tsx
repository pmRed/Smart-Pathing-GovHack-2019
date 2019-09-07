import React from 'react'
import Head from 'next/head'
import Drawer from './Drawer'
import AppBar from './AppBar'
// import { makeStyles } from '@material-ui/core';

type Props = {
    title?: string
}

// const useStyles = makeStyles(() => ({
// 	content: {
// 	  height: '100%',
// 	  display: 'flex',
// 	  flexDirection: 'column'
// 	}
// }));

class Shell extends React.Component<Props> {
    render() {
        const { children, title } = this.props
        return(
            <div style={{height: '100vh'}}>

                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                
                <AppBar title={title}/>

                <Drawer />
                
                <div style={{height: '85%', width: '100%'}}>
                    {children}
                </div>
            </div>
        )
    }
}

export default Shell
