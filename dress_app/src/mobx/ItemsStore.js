import {observable, decorate, action} from 'mobx';

class ItemsStore {
  shirts = [];
  pants = [];
  shoes = [];

  fetchItems() {
    fetch('http://www.mocky.io/v2/5e3940013200005e00ddf87e')
      .then(res => res.json())
      .then(response => {
        this.shirts = response.filter(item => item.type == 'shirt');
        this.pants = response.filter(item => item.type == 'pants');
        this.shoes = response.filter(item => item.type == 'shoes');
      });
  }
}

decorate(ItemsStore, {
  shirts: observable,
  pants: observable,
  shoes: observable,

  fetchItems: action,
});

export default new ItemsStore();
