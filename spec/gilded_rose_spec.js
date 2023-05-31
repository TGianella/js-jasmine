const { Shop, Item } = require("../src/gilded_rose");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("OMGHAI!");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  gildedRose.updateQuality();
}

describe("Gilded Rose", function() {

  it("should return the correct name", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should decrease sellIn value by one every day", function() {
    const gildedRose = new Shop([ new Item("foo", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9);
  });

  it("should decrease quality value by one every day", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });

  it("should decrease quality twice as fast after sell date", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("should never make an item quality negative", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should increase 'Aged Brie' quality after each day", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("should never increase quality of an item over 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("should not decrease sellIn and quality values of 'Sulfuras'", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it("should increase quality of 'Backstage passes' by 1 when sellIn > 10", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("should increase quality of 'Backstage passes' by 1 when 5 < sellIn < 10", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 7, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("should increase quality of 'Backstage passes' by 3 when sellIn < 5", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 3, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("should set quality of 'Backstage passes' to 0 when sellIn is negative", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should decay quality twice as fast when item is conjured", function() {
    const gildedRose = new Shop([ new Item("Conjured foo", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(6);
  });

});

