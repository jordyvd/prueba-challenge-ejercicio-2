class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn; //dias que quedan para vender el producto
    this.quality = quality; //calidad del producto
  }
}

class Quality {
  update(item) {
    throw new Error("Method 'update' must be implemented");
  }
}

class QualityMax {
  validate(item) {
    if (item.quality >= 50) {
      item.quality = 50;
    }
    return item;
  }
}

class AgedBrie extends Quality {
  update(item) {
    
    item.sellIn = item.sellIn - 1;

    if (item.quality < 50) {
      if (item.sellIn < 0) {
        item.quality = item.quality + 2;
      } else {
        item.quality = item.quality + 1;
      }
    }

    const qualityMax = new QualityMax();
    qualityMax.validate(item);

    return item;
  }
}

class Sulfuras extends Quality {
  update(item) {
    return item;
  }
}

class BackstagePasses extends Quality {  
  update(item) {

    item.sellIn = item.sellIn - 1;

    if(item.sellIn < 0){
      item.quality = 0;
    }else if(item.sellIn <= 5){
      item.quality = item.quality + 3;
    }else if(item.sellIn <= 10){
      item.quality = item.quality + 2;
    }else{
      item.quality = item.quality + 1;
    }

    const qualityMax = new QualityMax();
    qualityMax.validate(item);

    return item;
  }
}

class Normal extends Quality {
  constructor() {
    super();
    this.qualityReduction = 1;
  }
  
  update(item) {
    item.sellIn = item.sellIn - 1;

    if (item.quality > 0) {
      item.quality = item.quality - this.qualityReduction;
    }

    const qualityMax = new QualityMax();
    qualityMax.validate(item);

    return item;
  }
}

class Conjured extends Normal {

  constructor() {
    super();
    this.qualityReduction *= 2;
  }

  update(item) {
    super.update(item);
    return item;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.itemTypes = {
      'Aged Brie': new AgedBrie(),
      'Sulfuras, Hand of Ragnaros': new Sulfuras(),
      'Backstage passes to a TAFKAL80ETC concert': new BackstagePasses(),
      'Conjured Mana Cake': new Conjured()
    }
  }
  updateQuality() {
    this.items.forEach(item => {
      const quality = this.itemTypes[item.name] || new Normal();
      quality.update(item);
    });
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
