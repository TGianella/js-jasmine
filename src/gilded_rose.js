class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let qualityOffset;
      let isLegendary = false;
      switch (this.items[i].name) {
        case 'Aged Brie':
          qualityOffset = 1;
          break;
        case 'Sulfuras, Hand of Ragnaros':
          isLegendary = true
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (this.items[i].sellIn > 10) {
            qualityOffset = 1;
          } else {
            if (this.items[i].sellIn > 5) {
              qualityOffset = 2;
            } else if (this.items[i].sellIn > 0){
              qualityOffset = 3;
            } else {
              qualityOffset = -50;
            }
          }
          break;
        default:
          this.items[i].sellIn > 0 ? qualityOffset = -1 : qualityOffset = -2;
          if (this.items[i].name.split(' ')[0] === 'Conjured') qualityOffset *= 2
      }      
      if (!isLegendary) this.updateItem(this.items[i], qualityOffset);
    }

    return this.items;
  }

  updateItem(item, qualityOffset) {
    item.quality = Math.min(50, Math.max(0, item.quality + qualityOffset));
    item.sellIn -= 1
  }

}
module.exports = {
  Item,
  Shop
}
