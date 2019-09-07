import React from 'react'
import fetch from 'isomorphic-unfetch'
import Shell from '../shell/Layout'
import { Container } from 'next/app';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const APIURL = 'http://localhost:5000/'

const useStyles = makeStyles(theme => ({
	icon: {
	  marginRight: theme.spacing(2),
	},
	heroContent: {
	  backgroundColor: theme.palette.background.paper,
	  padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
	  marginTop: theme.spacing(4),
	},
	cardGrid: {
	  paddingTop: theme.spacing(8),
	  paddingBottom: theme.spacing(8),
	},
	card: {
	  height: '100%',
	  display: 'flex',
	  flexDirection: 'column',
	},
	cardMedia: {
	  paddingTop: '56.25%', // 16:9
	},
	cardContent: {
	  flexGrow: 1,
	},
	footer: {
	  backgroundColor: theme.palette.background.paper,
	  padding: theme.spacing(6),
	},
}));

const TestComponent = (props: { test: string }) =>{
	const classes = useStyles();
	return (
		<Shell title="SmartMaps">
			<h1> {props.test} </h1>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
					Album layout
				</Typography>
				<Typography variant="h5" align="center" color="textSecondary" paragraph>
					Something short and leading about the collection below—its contents, the creator, etc.
					Make it short and sweet, but not too short so folks don&apos;t simply skip over it
					entirely.
				</Typography>
				<div className={classes.heroButtons}>
					<Grid container spacing={2} justify="center">
					<Grid item>
						<Button variant="contained" color="primary">
						Main call to action
						</Button>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="primary">
						Secondary action
						</Button>
					</Grid>
					</Grid>
				</div>
				</Container>
			</div>
		</Shell>
	)
} 

TestComponent.getInitialProps = async () => {
	const res = await fetch( APIURL + 'helloworld', {})
	const hello = await res.json()
	return {test: hello.hello}
}

export default TestComponent
