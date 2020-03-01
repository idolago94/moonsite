import {observable, decorate, action} from 'mobx';

class SetStore {
  setList = [];
  newSet = {};

  addSet() {
    this.setList.push(this.newSet);
    this.newSet = {};
  }

  setItemSet(type, data) {
    this.newSet[type] = data;
  }
}

decorate(SetStore, {
  setList: observable,
  newSet: observable,

  addSet: action,
  setItemSet: action,
});

export default new SetStore();
