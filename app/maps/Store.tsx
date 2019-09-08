import { observable, action, computed } from 'mobx'

export default class MapStore {
    @observable source : string = 'Millers Point, Sydney';
    @observable destination : string = 'Darlinghurst, Sydney';
    @observable mode : string = 'walk';
    @observable overlay : string = 'heat'
    @observable trigger : boolean = false;
    @observable table: any = [{}];

    @action setMode(mode: string) {
        this.mode = mode
    }

    @action setOverlay(overlay: string){
        this.overlay = overlay
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