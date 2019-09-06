import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import { AppBar, 
    Toolbar, 
    IconButton, 
    Typography} from '@material-ui/core'

import React from 'react';

import { inject, observer } from 'mobx-react';
import ShellStore from './Store';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const TopAppBar = inject('shell')(
    observer ( ( props : { shell?: ShellStore, title?: string } ) => {

        const { shell, title } = props
        const classes = useStyles(); 
    
        return (
            <div className={classes.root}>
                <AppBar position="static">
                <Toolbar>
                    <IconButton 
                        className={classes.menuButton}
                        edge="start" 
                        color="inherit" 
                        aria-label="menu"
                        onClick={shell!.toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'
                        className={classes.title}> 
                        {title}
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
                </AppBar>
            </div>
        );
    })
)

export default TopAppBar