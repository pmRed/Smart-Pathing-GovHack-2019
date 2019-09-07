import React from 'react';
import ShellStore from './Store'
import { inject, observer } from 'mobx-react'
import { SwipeableDrawer,  ListItemText, ListItem, makeStyles, List, ListItemIcon, MenuItem } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map'

type InjectedProps = {
    shell?: ShellStore
}

const useStyles = makeStyles({
    drawerEntries: {
        width: 200,
    }
})

const Drawer = inject('shell')(
    observer ( ( props : InjectedProps) => {
        const { shell } = props;
        const classes = useStyles();

        const toggleDrawer = (open: boolean) => (
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

            shell!.setDrawer(open)
        };

        return (
            <SwipeableDrawer
                open={shell!.drawerActive}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className={classes.drawerEntries}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                    <List>
                        <ListItem 
                            button 
                            key="GMaps"
                        >
                            <ListItemIcon>
                                <MapIcon />
                            </ListItemIcon>
                            <ListItemText primary="GMaps" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        );
    })
)

export default Drawer