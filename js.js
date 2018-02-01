'use strict';
function $forEach(selector, func) {
  Array
    .from(document.querySelectorAll(selector))
    .forEach(func);
}
class FixturesCalculation {
  /**
   * Получение базовых параметров
   * @param {string}selector - селектор элемента-помещения
   */
  constructor(selector) {
    this.fixturesCalculation = document.querySelector(selector); // внутренний элемент
    let adaptParCompStyl = getComputedStyle(this.fixturesCalculation);
    this.adaptiveParent = {
      selector: selector,
      adaptParCompStyl: getComputedStyle(this.fixturesCalculation),
      widthParent: parseFloat(adaptParCompStyl.width),
      heightParent: parseFloat(adaptParCompStyl.height)
    };
    let dataSet = this.fixturesCalculation.dataset;
    this.paramsHtml = {  //  Входные параметры
      width: Number(dataSet.width),
      length: Number(dataSet.length),
      quantity: Number(dataSet.quantity),
      diameterLightSpot: Number(Number(dataSet.diameterLightSpot))
    };
    this.paramsHtml.cols = Math.sqrt(this.paramsHtml.quantity *
      this.paramsHtml.width / this.paramsHtml.length);
    this.paramsHtml.rows = Math.sqrt(this.paramsHtml.quantity *
      this.paramsHtml.length / this.paramsHtml.width);
  }

  /**
   * Подгон размера помещения под заданные пропорции родителя
   * @param {number}width - ширина помещения
   * @param {number}length - длина помещения
   * @param {object}elemRoom - элемент помещения
   */
  roomAdaptation(width, length, elemRoom) {
    let newWidth;
    let newLength;
    let parentCompStyles = getComputedStyle(elemRoom.parentElement);
    let parentWidth = parseFloat(parentCompStyles.width);
    let parentLength = parseFloat(parentCompStyles.height);
    let parentProportion = Math.max(parentWidth, parentLength) /
      ((parentWidth * parentLength) /
        Math.max(parentWidth, parentLength));
    let proportion = Math.max(width, length) /
      (width * length /
        Math.max(width, length));
    if (parentProportion > proportion) {
      newLength = parseFloat(parentCompStyles.height);
      newWidth = proportion * newLength;
    } else {
      newWidth = parseFloat(parentCompStyles.width);
      newLength = newWidth / proportion;
    }
    this.proportion = newWidth / Math.max(width, length);
    elemRoom.style.width = newWidth + 'px';
    elemRoom.style.height = newLength + 'px';
  }

  /**
   * Выявление оптимальной схемы и вызов нужного метода
   */
  rational() {
    let obj = {
      minMin: {
        name: 'minMin',
        quantity: ~~this.paramsHtml.cols * ~~Math.sqrt(this.paramsHtml.quantity *
          this.paramsHtml.length /
          this.paramsHtml.width)
      },
      minMax: {
        name: 'minMax',
        quantity: ~~this.paramsHtml.cols *
        Math.ceil(Math.sqrt(this.paramsHtml.quantity *
          this.paramsHtml.length /
          this.paramsHtml.width))
      },
      maxMin: {
        name: 'maxMin',
        quantity: Math.ceil(this.paramsHtml.cols) * ~~Math.sqrt(this.paramsHtml.quantity *
          this.paramsHtml.length /
          this.paramsHtml.width)
      },
      maxMax: {
        name: 'maxMax',
        quantity: Math.ceil(this.paramsHtml.cols) *
        Math.ceil(Math.sqrt(this.paramsHtml.quantity *
          this.paramsHtml.length /
          this.paramsHtml.width))
      }
    };
    let quantityOld = this.paramsHtml.quantity;
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
    let cols;
    let rows;
    cols = ~~this.paramsHtml.cols;
    rows = ~~Math.sqrt(this.paramsHtml.quantity *
      this.paramsHtml.length / this.paramsHtml.width);
    if (rows > cols) cols = [rows, rows = cols][0];
    this.createSpotElems(
      this.paramsHtml.quantity,
      'fixtures-calculation--item',
      cols,
      rows);
    return this;
  }

  minMax() {
    let cols;
    let rows;
    cols = ~~this.paramsHtml.cols;
    rows = Math.ceil(Math.sqrt(this.paramsHtml.quantity *
      this.paramsHtml.length /
      this.paramsHtml.width));
    if (rows > cols) cols = [rows, rows = cols][0];
    this.createSpotElems(
      this.paramsHtml.quantity,
      'fixtures-calculation--item',
      cols,
      rows);
    return this;
  }

  maxMin() {
    let cols;
    let rows;
    cols = Math.ceil(this.paramsHtml.cols);
    rows = ~~Math.sqrt(this.paramsHtml.quantity *
      this.paramsHtml.length /
      this.paramsHtml.width);
    if (rows > cols) cols = [rows, rows = cols][0];
    this.createSpotElems(
      this.paramsHtml.quantity,
      'fixtures-calculation--item',
      cols,
      rows);
    return this;
  }

  maxMax() {
    let cols;
    let rows;
    cols = Math.ceil(this.paramsHtml.cols);
    rows = Math.ceil(Math.sqrt(this.paramsHtml.quantity *
      this.paramsHtml.length /
      this.paramsHtml.width));
    if (rows > cols) cols = [rows, rows = cols][0];
    this.createSpotElems(
      this.paramsHtml.quantity,
      'fixtures-calculation--item',
      cols,
      rows);
    return this;
  }

  createSpotElems(quantity, className, cols, rows) {
    let spotElem;
    let spotWidth;
    let spotHeight;
    let widthParent = parseFloat(getComputedStyle(document.querySelector(this.adaptiveParent.selector)).width);
    let heightParent = parseFloat(getComputedStyle(document.querySelector(this.adaptiveParent.selector)).height);
    let widthParentOld = this.paramsHtml.width;
    let heightParentOld = this.paramsHtml.length;
    let contRows = 0;
    let horScale = document.createElement('aside');
    let horScaleChild;
    let verScale = document.createElement('aside');
    let verScaleChild;
    let irrr;

    spotWidth = (widthParent / cols).toFixed(2);
    spotHeight = (heightParent / rows).toFixed(2);
    quantity = cols * rows;
    document.querySelector(this.adaptiveParent.selector).parentElement.dataset.text = quantity;
    document.querySelector(this.adaptiveParent.selector).innerHTML = '';

    horScale.className = 'horisontal-scale';
    verScale.className = 'vertical-scale';
    this.fixturesCalculation.appendChild(horScale);
    this.fixturesCalculation.appendChild(verScale);
    let overflowElem = document.createElement('div');
    overflowElem.classList.add('overflow-elem');
    document
      .querySelector(this.adaptiveParent.selector)
      .appendChild(overflowElem);

    for (let i = 1; i <= quantity; i++) {
      spotElem = document.createElement('span');
      spotElem.className = className;
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
      let disk = document.createElement('span');
      disk.className = 'for-lightning';
      disk.style.minWidth = this.proportion *
        this.paramsHtml.diameterLightSpot + 'px';
      disk.style.minHeight = this.proportion *
        this.paramsHtml.diameterLightSpot + 'px';

      spotElem.appendChild(disk);
      irrr = Array.from(document
        .querySelector(this.adaptiveParent.selector)
          .children)
        .filter(function(item) {
          return (item.classList.contains('overflow-elem')) ? 1 : 0;
        });
      irrr[0].appendChild(spotElem);
    }
    Array.from(
      document
        .querySelectorAll(
          this.adaptiveParent.selector + ' .' + className
        )
      )
      .forEach(function(item) {
        item.style.width = spotWidth + 'px';
        item.style.height = spotHeight + 'px';
      });
  }

  /**
   * Инициализация
   * @return {FixturesCalculation} - возвращает текущий объект
   */
  init() {
    document.querySelector(
      this.adaptiveParent.selector
    ).innerHTML = '';
    this.roomAdaptation(
      this.paramsHtml.width,
      this.paramsHtml.length,
      this.fixturesCalculation
    );
    return this;
  }
} //  FixturesCalculation

document.addEventListener('DOMContentLoaded', () => {
  window.onload = () => {
    new FixturesCalculation('.fixtures-calculation__min').init().minMin();
    new FixturesCalculation('.fixtures-calculation__min-1').init().maxMin();
    new FixturesCalculation('.fixtures-calculation__min-2').init().minMax();
    new FixturesCalculation('.fixtures-calculation__min-3').init().maxMax();
    new FixturesCalculation('.fixtures-calculation__rational').init().rational();
    /**
     * Обработчик формы
     */
    Array.from(document.querySelectorAll('.for-input')).forEach(item => {
      item.oninput = () => {
        let name = item.name;
        let dataValue = item.value || item.dataset.default;
        Array.from(document.querySelectorAll('[class^="fixtures-calculation__"]'))
          .forEach(item => {
            item.dataset[name] = dataValue;
          });
        item.placeholder = dataValue;
        new FixturesCalculation('.fixtures-calculation__min').init().minMin();
        new FixturesCalculation('.fixtures-calculation__min-1').init().maxMin();
        new FixturesCalculation('.fixtures-calculation__min-2').init().minMax();
        new FixturesCalculation('.fixtures-calculation__min-3').init().maxMax();
        new FixturesCalculation('.fixtures-calculation__rational').init().rational();
      };
    });
  };
});