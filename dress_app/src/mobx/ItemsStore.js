import {observable, decorate, action} from 'mobx';

class ItemsStore {
  shirts = [];
  pants = [];
  shoes = [];

  fetchItems() {
      console.log('fetch items...');
    fetch('http://www.mocky.io/v2/5e3940013200005e00ddf87e')
      .then(res => res.json())
      .then(response => {
        this.shirts = response.results.filter(item => item.type == 'shirt').sort((a, b) => a.name.localeCompare(b.name));
        this.pants = response.results.filter(item => item.type == 'pants').sort((a, b) => a.name.localeCompare(b.name));
        this.shoes = response.results.filter(item => item.type == 'shoes').sort((a, b) => a.name.localeCompare(b.name));
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
