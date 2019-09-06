import { observable, action } from 'mobx'


export default class ShellStore {
    @observable drawerActive : boolean = false;

    @action setDrawer = (open: boolean): void => {
        this.drawerActive = open
    }

    @action toggleDrawer = (): void => {
        this.drawerActive = !this.drawerActive 
    }
}
