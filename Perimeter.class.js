'use strict';
/**
 * Функция для упрощения перебора коллекции
 * @param {string}selector - css-селектор
 * @param {function}func - функция для обработки массива по foreach
 */
function $forEach(selector, func) {
  Array
    .from(document.querySelectorAll(selector))
    .forEach(func);
}

function $filter(selector, func) {
  return Array
    .from(document.querySelectorAll(selector))
    .filter(func);
}

class Perimeter extends InitialForCircuit {
  disk(newQuantity) {
    let quantity = this.datasetParams.quantity;
    let perimeter = this.perimeter.element;
    let centerX = this.perimeter.width / 2;
    let centerY = this.perimeter.length / 2;
    let step;
    let item;
    let light;
    let x;
    let y;
    let cornerRadian;
    if (newQuantity) {
      quantity += (4 - (quantity % 4));
    }
    if (Number(this.parent.element.dataset.distance)) {
      this.parent.element.classList.add('distance');
      step = (2 * centerX * Math.PI) / quantity;
      this.parent.element.dataset.step =
        (step / this.proportion).toFixed(2);
    }

    this.parent.element.classList.add('optimised');
    this.parent.element.dataset.optimisedQuantity = quantity;
    for (let i = 0; i <= 360; i += 360 / quantity) {
      item = document.createElement('div');
      item.className = 'scheme-parent__point';
      light = document.createElement('span');
      light.className = this.spotItemInner.className;
      light.style.minWidth =
        Number(this.datasetParams.spot) * this.proportion + 'px';
      light.style.minHeight =
        Number(this.datasetParams.spot) * this.proportion + 'px';
      item.appendChild(light);
      perimeter.appendChild(item);
      cornerRadian = i * Math.PI / 180;
      x = parseFloat(centerX * Math.cos(cornerRadian) + centerX) - 5;
      y = parseFloat(centerY * Math.sin(cornerRadian) + centerY) - 5;
      item.style.left = x + 'px';
      item.style.top = y + 'px';
    }
  }

  rectangle(newQuantity) {
    let quantity = this.datasetParams.quantity;
    let perimeter = this.perimeter.element;
    let width = this.perimeter.width;
    let length = this.perimeter.length;
    let item;
    let qWidth;
    let qHeight;
    let spotSize;
    let template;
    if (newQuantity) {
      quantity += (4 - (quantity % 4));
    } else if (quantity % 2 !== 0) {
      quantity += (2 - (quantity % 2));
    }
    this.parent.element.classList.add('optimised');
    this.parent.element.dataset.optimisedQuantity = quantity;
    qWidth = Math.round(quantity / (2 * (1 + length / width)));
    qHeight = (quantity - 4 - 2 * qWidth) / 2;
    if (Number(this.parent.element.dataset.distance)) {
      this.parent.element.classList.add('distance');
      this.parent.element.dataset.step =
        (width / qWidth / this.proportion).toFixed(2) +
        '/' +
        (length / qHeight / this.proportion).toFixed(2);
    }

    for (let i = 0; i <= Math.max(qWidth, qHeight) + 1; i++) {
      item = document.createElement('div');
      item.className = 'rectangle_item-vertical';
      item.style.left =
        (width /
          (~~Math.max(qWidth, qHeight) +
            1)) * i - 4 + 'px';
      spotSize = Number(this.datasetParams.spot) * this.proportion;
      template = `<div class="scheme-parent__point">
            <div class="${this.spotItemInner.className}" 
            style="min-height: ${spotSize}px;
            min-width: ${spotSize}px;"></div>
        </div><div class="scheme-parent__point">
            <div class="${this.spotItemInner.className}" 
            style="min-height: ${spotSize}px;
            min-width: ${spotSize}px;"></div>
        </div>`;
      item.insertAdjacentHTML('afterbegin', template);
      perimeter.appendChild(item);
    }
    for (let i = 1; i <= Math.min(qWidth, qHeight); i++) {
      item = document.createElement('div');
      item.className = 'rectangle_item-horizontal';
      item.style.top = (length /
        (~~Math.min(qWidth, qHeight) + 1)) *
        i - 4 + 'px';
      item.insertAdjacentHTML('afterbegin', template);
      perimeter.appendChild(item);
    }
  }

  ellipse() {
    let quantity = this.datasetParams.quantity;
    let perimeter = this.perimeter.element;
    let centerX = this.perimeter.width / 2;
    let centerY = this.perimeter.length / 2;
    let x;
    let y;
    let item;
    let light;
    let step;
    let cornerRadian;
    if (quantity < 4 || (quantity % 4 !== 0)) {
      quantity += (4 - (quantity % 4));
    }
    if (Number(this.parent.element.dataset.distance)) {
      this.parent.element.classList.add('distance');
      step = (centerX + centerY) * Math.PI / quantity;
      this.parent.element.dataset.step =
        (step / this.proportion).toFixed(2);
    }
    this.parent.element.classList.add('optimised');
    this.parent.element.dataset.optimisedQuantity = quantity;
    for (let i = 0; i <= 360; i += 360 / quantity) {
      item = document.createElement('div');
      item.className = 'scheme-parent__point';
      light = document.createElement('span');
      light.className = this.spotItemInner.className;
      light.style.minWidth =
        Number(this.datasetParams.spot) * this.proportion + 'px';
      light.style.minHeight =
        Number(this.datasetParams.spot) * this.proportion + 'px';
      item.appendChild(light);
      perimeter.appendChild(item);
      cornerRadian = i * Math.PI / 180;
      x = parseFloat(centerX * Math.cos(cornerRadian) + centerX) - 5;
      y = parseFloat(centerY * Math.sin(cornerRadian) + centerY) - 5;
      item.style.left = x + 'px';
      item.style.top = y + 'px';
    }
  } //  ellipse
  area() {
    let obj = {
      minMin: {
        name: 'minMin',
        quantity: ~~this.area.cols * ~~Math.sqrt(this.datasetParams.quantity *
          this.datasetParams.length /
          this.datasetParams.width)
      },
      minMax: {
        name: 'minMax',
        quantity: ~~this.area.cols *
        Math.ceil(Math.sqrt(this.datasetParams.quantity *
          this.datasetParams.length /
          this.datasetParams.width))
      },
      maxMin: {
        name: 'maxMin',
        quantity: Math.ceil(this.area.cols) *
        ~~Math.sqrt(this.datasetParams.quantity *
          this.datasetParams.length /
          this.datasetParams.width)
      },
      maxMax: {
        name: 'maxMax',
        quantity: Math.ceil(this.area.cols) *
        Math.ceil(Math.sqrt(this.datasetParams.quantity *
          this.datasetParams.length /
          this.datasetParams.width))
      }
    };
    let quantityOld = this.datasetParams.quantity;
    let differenceArr = Object.keys(obj)
      .map(item => {
      return obj[item].quantity - quantityOld;
  });
    let finalQuantity = quantityOld + differenceArr
      .reduce((prev, item) => {
      return (Math.abs(prev) < Math.abs(item)) ?
      prev :
      (
        (Math.abs(prev) === Math.abs(item)) ?
          Math.max(prev, item) :
          item
      );
  });
    let finalMethod = Object.keys(obj)
      .filter(item => {
      return (obj[item].quantity === finalQuantity) ? obj[item] : '';
  });
    this[finalMethod[0]]();
  }

  minMin() {
    let cols = ~~this.area.cols;
    let rows = ~~Math.sqrt(this.datasetParams.quantity *
      this.datasetParams.length / this.datasetParams.width);
    if (rows > cols) {
      cols = [rows, rows = cols][0];
    }
    this.createSpotElems(cols, rows);
    return this;
  }

  minMax() {
    let cols = ~~this.area.cols;
    let rows = Math.ceil(
      Math.sqrt(this.datasetParams.quantity *
        this.datasetParams.length /
        this.datasetParams.width));
    if (rows > cols) {
      cols = [rows, rows = cols][0];
    }
    this.createSpotElems(cols, rows);
    return this;
  }

  maxMin() {
    let cols = Math.ceil(this.area.cols);
    let rows = ~~Math.sqrt(
      this.datasetParams.quantity *
      this.datasetParams.length /
      this.datasetParams.width);
    if (rows > cols) {
      cols = [rows, rows = cols][0];
    }
    this.createSpotElems(cols, rows);
    return this;
  }

  maxMax() {
    let cols = Math.ceil(this.area.cols);
    let rows = Math.ceil(Math.sqrt(
      this.datasetParams.quantity *
      this.datasetParams.length /
      this.datasetParams.width));
    if (rows > cols) {
      cols = [rows, rows = cols][0];
    }
    this.createSpotElems(cols, rows);
    return this;
  }

  createSpotElems(cols, rows) {
    let className = this.spotItem.className;
    let spotElem;
    let spotWidth;
    let spotHeight;
    let widthParent = this.perimeter.width;
    let heightParent = this.perimeter.length;
    let widthParentOld = this.datasetParams.width;
    let heightParentOld = this.datasetParams.length;
    let contRows = 0;
    let horScale = document.createElement('aside');
    let horScaleChild;
    let verScale = document.createElement('aside');
    let verScaleChild;
    let irrr;
    let quantity;
    let perimeterElem = this.perimeter.element;
    let overflowElem = document.createElement('div');
    overflowElem.classList.add('overflow-elem');
    perimeterElem.appendChild(overflowElem);
    spotWidth = (widthParent / cols).toFixed(2);
    spotHeight = (heightParent / rows).toFixed(2);
    quantity = cols * rows;
    this.parent.element.classList.add('optimised');
    this.parent.element.dataset.optimisedQuantity = quantity;
    if (Number(this.parent.element.dataset.scale)) {
      horScale.className = 'horisontal-scale';
      verScale.className = 'vertical-scale';
      perimeterElem.parentElement.appendChild(horScale);
      perimeterElem.parentElement.appendChild(verScale);
    }
    for (let i = 1; i <= quantity; i++) {
      spotElem = document.createElement('div');
      spotElem.className = className;
      if (Number(this.parent.element.dataset.scale)) {
        if (i <= cols) {
          horScaleChild = document.createElement('span');
          horScaleChild.dataset.text = ((widthParentOld / cols * i) -
            (widthParentOld / cols / 2)).toFixed(2);
          horScaleChild.innerHTML = horScaleChild.dataset.text;
          horScale.appendChild(horScaleChild);
        }
        if (i % cols === 0) {
          verScaleChild = document.createElement('span');
          verScaleChild.dataset.text =
            ((heightParentOld / rows * ++contRows) -
              (heightParentOld / rows / 2)).toFixed(2);
          verScaleChild.innerHTML = verScaleChild.dataset.text;
          verScale.appendChild(verScaleChild);
        }
      }

      let disk = document.createElement('span');
      disk.className = this.spotItemInner.className;
      disk.style.minWidth =
        Number(this.datasetParams.spot) * this.proportion + 'px';
      disk.style.minHeight =
        Number(this.datasetParams.spot) * this.proportion + 'px';
      spotElem.appendChild(disk);
      irrr = Array.from(perimeterElem.children)
        .filter(function(item) {
          return (item.classList.contains('overflow-elem')) ? 1 : 0;
        });
      irrr[0].appendChild(spotElem);
    }
    perimeterElem.querySelectorAll('.' + className)
      .forEach(function(item) {
        item.style.width = spotWidth + 'px';
        item.style.height = spotHeight + 'px';
      });
  }

  initPerimeter(params) {
    super.createPerimeter();
    this[this.parent.type](params.optimization);
  }
}