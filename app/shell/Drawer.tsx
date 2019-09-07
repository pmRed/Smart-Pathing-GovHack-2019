import React from 'react';
import ShellStore from './Store'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { SwipeableDrawer,  ListItemText, makeStyles, ListItemIcon, MenuList, MenuItem } from '@material-ui/core';
import { useRouter } from 'next/router'
import routes from './Routes'

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
        const router = useRouter()

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
                    <MenuList>
                    {routes.map((prop, key) => {
                    return (
                        <Link prefetch href={prop.path} passHref key={key}>
                            <MenuItem 
                                selected={prop.path==router.route}
                            >
                                <ListItemIcon>
                                <prop.icon />
                                </ListItemIcon>
                                <ListItemText primary={prop.sidebarName} />
                            </MenuItem>
                        </Link>
                    )
                    })}
                    </MenuList>
                </div>
            </SwipeableDrawer>
        );
    })
)

export default Drawer