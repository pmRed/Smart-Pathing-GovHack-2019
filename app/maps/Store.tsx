import { observable, action } from 'mobx'

export default class MapStore {
    @observable source : string = 'Mascot Sydney';
    @observable destination : string = 'Crows Nest  Sydney';
    @observable mode : string = 'walk';

    @action setMode(mode: string) {
        this.mode = mode
    }

    @action setDestination(destination: string) {
        this.destination = destination
    }

    @action setSource(source: string) {
        this.source = source
    }
}