import React from 'react';
import ShellStore from './Store'
import { inject, observer } from 'mobx-react'
import { SwipeableDrawer,  ListItemText, ListItem, makeStyles } from '@material-ui/core';

type InjectedProps = {
    shell?: ShellStore
}

const useStyles = makeStyles({
    drawer: {
        width: 250,
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
            <div className={classes.drawer}>
                <SwipeableDrawer
                    open={shell!.drawerActive}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {
                        <ListItem button key="Home">
                            <ListItemText primary="Home" />
                        </ListItem>
                    }
                </SwipeableDrawer>
            </div>
        );
    })
)

export default Drawer