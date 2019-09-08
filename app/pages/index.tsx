import React  from 'react'
import Shell from '../shell/Layout'
import { Container, Typography, Button } from '@material-ui/core';
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
	  alignItems: 'center',
	  justifyContent: 'center'
	},
	heroButtons: {
	  marginTop: theme.spacing(4),
	},
	background: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: '25px',
		paddingTop: '10%',
		paddingBottom: '10%',
		paddingRight: '5%',
		paddingLeft: '5%',
		marginLeft: '10%',
		marginRight: '10%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
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
				<Container 
				style={{}} >
					<div className={classes.background}>
					<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
						Welcome to SmartMaps	
					</Typography>
					<Typography variant="h5" align="center" color="textPrimary" paragraph>
						Going from A to B in a city is shouldn't just about speed. It should be about safety, comfort and enjoyment. SmartMaps allows you to make travel decisions based upon these factors. 
					</Typography>
					<Typography variant="h5" align="center" color="textPrimary" paragraph>
						Given a mode of transport, our algorithm provides you with human centric data about possible routes between your location and another. In particular, it measures the urban heat and greenery coverage and provides a selection of the best routes. Empowering you to make informed pathing decisions.
					</Typography>
					<Button variant="contained" color="primary"
					href="/gmap"
					>
						Evaluate Your Route
					</Button>
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
