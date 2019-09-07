import { observable, action, computed } from 'mobx'

export default class MapStore {
    @observable source : string = 'pyrmont, sydney';
    @observable destination : string = 'redfern, sydney';
    @observable mode : string = 'walk';
    @observable trigger : boolean = false;

    @action setMode(mode: string) {
        this.mode = mode
    }

    @action setDestination(destination: string) {
        this.destination = destination
    }

    @action setSource(source: string) {
        this.source = source
    }

    @action flipTrigger() {
        this.trigger = !this.trigger
    }

    @computed get getSource(){
        return this.source
    }
}