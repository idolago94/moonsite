import {observable, decorate, action} from 'mobx';

let index = 0;

class ListStore {
  list = ['first'];

  addItem(item) {
    this.list.push(item);
  }

  removeItem(index) {
    this.list = this.list.filter((item, i) => i != index);
  }
}

decorate(ListStore, {
  list: observable,
  addItem: action,
  removeItem: action,
});

export default new ListStore();
