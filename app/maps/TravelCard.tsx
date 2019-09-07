import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { DirectionsWalk, DirectionsBike, DirectionsBus } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import {inject, observer} from 'mobx-react'
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import MapsStore from './Store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    //   maxWidth: 
	},
	grid: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
    input: {
      marginLeft: theme.spacing(1),
	  flex: 1,
	  width: '500px'
    },
    button: {
      margin: 10,
    }
  })
);

type InjectedProps = {
	maps ?: MapsStore
}

const TravelCard = inject('maps')(
    observer ( ( props : InjectedProps) => {
	const [source, setSource] = useState('');
	const [destination, setDestination] = useState('');
	const classes = useStyles();
	const { maps } = props

	const setMode = (mode : string) => (
		event: React.KeyboardEvent | React.MouseEvent,
	) => {
		if (
		event &&
		event.type === 'keydown' &&
		((event as React.KeyboardEvent).key === 'Tab' ||
			(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		maps!.setMode(mode)
	};

	const getColor = ( mode : string ) => {
		if (mode == maps!.mode) {
			return 'primary'
		}
		else {
			return 'default'
		}
	}

	const setInputs = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
		event &&
		event.type === 'keydown' &&
		((event as React.KeyboardEvent).key === 'Tab' ||
			(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		maps!.setSource(source)
		maps!.setDestination(destination)
		maps!.flipTrigger()
		// console.log(source, destination)
	}

	return (
		<Paper className={classes.root}>
			<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			>
				<Grid 
					item 
					xs={12}
					className={classes.grid}
				>
					<IconButton 
						aria-label="walk" 
						color={getColor('walk')}
						onClick={setMode('walk')}
					>
						<DirectionsWalk />
					</IconButton>
					<IconButton 
						aria-label="ride"
						color={getColor('ride')}
						onClick={setMode('ride')}
					>
						<DirectionsBike  />
					</IconButton>
					<IconButton 
						aria-label="public-transport"
						color={getColor('bus')}
						onClick={setMode('bus')}
					>
						<DirectionsBus />
					</IconButton>
				</Grid>

				<Grid 
					item 
					xs={12}
					className={classes.grid}
				>
					<TextField
						className={classes.input}
						placeholder="Source Location"
						inputProps={{ 'aria-label': 'search google maps' }}
						onChange={
							(event: React.ChangeEvent<HTMLInputElement>) => {
								setSource(event.target.value)
							}
						}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						className={classes.input}
						placeholder="Destination Location"
						inputProps={{ 'aria-label': 'search google maps' }}
						onChange={
							(event: React.ChangeEvent<HTMLInputElement>) => {
								setDestination(event.target.value)
							}
						}
						margin="normal"
						variant="outlined"
					/>
					<Button variant="contained" 
						onClick={setInputs}
						className={classes.button}
					>
						Search
						<DirectionsIcon />
					</Button>
				</Grid>

			</Grid>
		</Paper>
	);
}))

export default TravelCard