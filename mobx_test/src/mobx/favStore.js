import {observable, decorate, action} from 'mobx';

let index = 0;

class FavStore {
    list = ['first'];

    addItem(item) {
        this.list.push(item);
    }

    removeItem(index) {
        this.list = this.list.filter((item, i) => i != index);
    }
}

decorate(FavStore, {
    list: observable,
    addItem: action,
    removeItem: action,
});

export default new FavStore();
