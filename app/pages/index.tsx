import React  from 'react'
import Shell from '../shell/Layout'
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// const APIURL = 'http://localhost:5000/'

const useStyles = makeStyles(theme => ({
	icon: {
	  marginRight: theme.spacing(2),
	},
	heroContent: {
	  backgroundColor: theme.palette.background.paper,
	//   backgroundSize: '100%',
	  backgroundPosition: 'center',
	  backgroundRepeat: 'no-repeat',
	  backgroundSize: 'cover',
	//   WebkitFilter: 'blur(8px)', 
	  padding: theme.spacing(8, 0, 6),
	  height: '100%',
	  display: 'flex',
	  flexDirection: 'column'
	},
	heroButtons: {
	  marginTop: theme.spacing(4),
	},
	background: {
		backgroundColor: 'grey',
		paddingTop: '10%',
		paddingBottom: '10%',
		marginLeft: '10%',
		marginRight: '10%'
	}

}));

const TestComponent = () =>{
	const classes = useStyles();
	const imageUrl = '/static/hero3.jpg';
	return (
		<Shell title="SmartMaps">
			<div className={classes.heroContent}
				style={{backgroundImage: `url(${imageUrl})` }}
			>
				<Container >
					<div className={classes.background}>
					<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
						Title
					</Typography>
					<Typography variant="h5" align="center" color="textPrimary" paragraph>
						Short and snappy header
					</Typography>
					<div className={classes.heroButtons}>
						<Grid container spacing={2} justify="center">
						<Grid item>
							<Button variant="contained" color="primary">
							Navigation call to action
							</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary">
							Navigation call to action
							</Button>
						</Grid>
						</Grid>
					</div>
					</div>
				</Container>
			</div>
		</Shell>
	)
} 

// TestComponent.getInitialProps = async () => {
// 	const res = await fetch( APIURL + 'helloworld', {})
// 	const hello = await res.json()
// 	return {test: hello.hello}
// }

export default TestComponent
