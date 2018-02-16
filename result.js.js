'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function $forEach(selector, func) {
  Array.from(document.querySelectorAll(selector)).forEach(func);
}

var FixturesCalculation = function () {
  /**
   * Получение базовых параметров
   * @param {string}selector - селектор элемента-помещения
   */
  function FixturesCalculation(selector) {
    _classCallCheck(this, FixturesCalculation);

    this.fixturesCalculation = document.querySelector(selector); // внутренний элемент
    var adaptParCompStyl = getComputedStyle(this.fixturesCalculation);
    this.adaptiveParent = {
      selector: selector,
      adaptParCompStyl: getComputedStyle(this.fixturesCalculation),
      widthParent: parseFloat(adaptParCompStyl.width),
      heightParent: parseFloat(adaptParCompStyl.height)
    };
    var dataSet = this.fixturesCalculation.dataset;
    this.paramsHtml = { //  Входные параметры
      width: Number(dataSet.width),
      length: Number(dataSet.length),
      quantity: Number(dataSet.quantity),
      diameterLightSpot: Number(dataSet.diameterLightSpot),
      angleLightSpot: Number(dataSet.angleLightSpot),
      heightLightSpot: Number(dataSet.heightLightSpot)
    };

    this.paramsHtml.cols = Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.width / this.paramsHtml.length);
    this.paramsHtml.rows = Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width);
  }

  /**
   * Подгон размера помещения под заданные пропорции родителя
   * @param {number}width - ширина помещения
   * @param {number}length - длина помещения
   * @param {object}elemRoom - элемент помещения
   */


  _createClass(FixturesCalculation, [{
    key: 'roomAdaptation',
    value: function roomAdaptation(width, length, elemRoom) {
      var newWidth = void 0;
      var newLength = void 0;
      var parentCompStyles = getComputedStyle(elemRoom.parentElement);
      var parentWidth = parseFloat(parentCompStyles.width);
      var parentLength = parseFloat(parentCompStyles.height);
      var parentProportion = Math.max(parentWidth, parentLength) / (parentWidth * parentLength / Math.max(parentWidth, parentLength));
      var proportion = Math.max(width, length) / (width * length / Math.max(width, length));
      if (parentProportion > proportion) {
        newLength = parseFloat(parentCompStyles.height);
        newWidth = proportion * newLength;
      } else {
        newWidth = parseFloat(parentCompStyles.width);
        newLength = newWidth / proportion;
      }
      this.proportion = newWidth / Math.max(width, length);

      if (width <= length) {
        elemRoom.style.width = ~~newWidth + 'px';
        elemRoom.style.height = ~~newLength + 'px';
      } else {
        elemRoom.style.width = ~~newLength + 'px';
        elemRoom.style.height = ~~newWidth + 'px';
      }
    }

    /**
     * Выявление оптимальной схемы и вызов нужного метода
     */

  }, {
    key: 'rational',
    value: function rational(justBlurred) {
      var obj = {
        minMin: {
          name: 'minMin',
          quantity: ~~this.paramsHtml.cols * ~~Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width)
        },
        minMax: {
          name: 'minMax',
          quantity: ~~this.paramsHtml.cols * Math.ceil(Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width))
        },
        maxMin: {
          name: 'maxMin',
          quantity: Math.ceil(this.paramsHtml.cols) * ~~Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width)
        },
        maxMax: {
          name: 'maxMax',
          quantity: Math.ceil(this.paramsHtml.cols) * Math.ceil(Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width))
        }
      };
      var quantityOld = this.paramsHtml.quantity;
      var differenceArr = Object.keys(obj).map(function (item) {
        return obj[item].quantity - quantityOld;
      });
      var finalQuantity = quantityOld + differenceArr.reduce(function (prev, item) {
        return Math.abs(prev) < Math.abs(item) ? prev : Math.abs(prev) === Math.abs(item) ? Math.max(prev, item) : item;
      });
      var finalMethod = Object.keys(obj).filter(function (item) {
        return obj[item].quantity === finalQuantity ? obj[item] : '';
      });

      this.finalQuantity = finalQuantity;

      this[finalMethod[0]](justBlurred);

      return this;
    }
  }, {
    key: 'minMin',
    value: function minMin(justBlurred) {
      var cols = void 0;
      var rows = void 0;
      cols = ~~this.paramsHtml.cols;
      rows = ~~Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width);
      if (rows > cols) cols = [rows, rows = cols][0];
      this.createSpotElems(this.paramsHtml.quantity, 'fixtures-calculation--item', cols, rows, justBlurred);
      return this;
    }
  }, {
    key: 'minMax',
    value: function minMax(justBlurred) {
      var cols = void 0;
      var rows = void 0;
      cols = ~~this.paramsHtml.cols;
      rows = Math.ceil(Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width));
      if (rows > cols) cols = [rows, rows = cols][0];
      this.createSpotElems(this.paramsHtml.quantity, 'fixtures-calculation--item', cols, rows, justBlurred);
      return this;
    }
  }, {
    key: 'maxMin',
    value: function maxMin(justBlurred) {
      var cols = void 0;
      var rows = void 0;
      cols = Math.ceil(this.paramsHtml.cols);
      rows = ~~Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width);
      if (rows > cols) cols = [rows, rows = cols][0];
      this.createSpotElems(this.paramsHtml.quantity, 'fixtures-calculation--item', cols, rows, justBlurred);
      return this;
    }
  }, {
    key: 'maxMax',
    value: function maxMax(justBlurred) {
      var cols = void 0;
      var rows = void 0;
      cols = Math.ceil(this.paramsHtml.cols);
      rows = Math.ceil(Math.sqrt(this.paramsHtml.quantity * this.paramsHtml.length / this.paramsHtml.width));
      if (rows > cols) cols = [rows, rows = cols][0];
      this.createSpotElems(this.paramsHtml.quantity, 'fixtures-calculation--item', cols, rows, justBlurred);
      return this;
    }
  }, {
    key: 'createSpotElems',
    value: function createSpotElems(quantity, className, cols, rows, justBlurred) {
      var spotElem = void 0;
      var spotWidth = void 0;
      var spotHeight = void 0;
      var widthParent = parseFloat(getComputedStyle(document.querySelector(this.adaptiveParent.selector)).width);
      var heightParent = parseFloat(getComputedStyle(document.querySelector(this.adaptiveParent.selector)).height);
      var widthParentOld = this.paramsHtml.width;
      var heightParentOld = this.paramsHtml.length;
      var contRows = 0;
      var horScale = document.createElement('aside');
      var horScaleChild = void 0;
      var verScale = document.createElement('aside');
      var verScaleChild = void 0;
      var irrr = void 0;

      if (widthParent > heightParent) {
      	spotWidth = (widthParent / cols).toFixed(2);
	    spotHeight = (heightParent / rows).toFixed(2);
	    horScale.className = 'horisontal-scale';
      	verScale.className = 'vertical-scale';
      } else {
      	spotWidth = (widthParent / rows).toFixed(2);
	    spotHeight = (heightParent / cols).toFixed(2);
	    horScale.className = 'vertical-scale';
      	verScale.className = 'horisontal-scale';
      }

      quantity = cols * rows;
      document.querySelector(this.adaptiveParent.selector).parentElement.dataset.text = quantity;
      document.querySelector(this.adaptiveParent.selector).innerHTML = '';

      this.fixturesCalculation.appendChild(horScale);
      this.fixturesCalculation.appendChild(verScale);
      var overflowElem = document.createElement('div');
      overflowElem.classList.add('overflow-elem');
      document.querySelector(this.adaptiveParent.selector).appendChild(overflowElem);

      for (var i = 1; i <= quantity; i++) {
        spotElem = document.createElement('span');
        spotElem.className = className;
        if (i <= cols) {
          horScaleChild = document.createElement('span');
          horScaleChild.dataset.text = (widthParentOld / cols * i - widthParentOld / cols / 2).toFixed(2);
          horScaleChild.innerHTML = horScaleChild.dataset.text;
          horScale.appendChild(horScaleChild);
        }
        if (i % cols === 0) {
          verScaleChild = document.createElement('span');
          verScaleChild.dataset.text = (heightParentOld / rows * ++contRows - heightParentOld / rows / 2).toFixed(2);
          verScaleChild.innerHTML = verScaleChild.dataset.text;
          verScale.appendChild(verScaleChild);
        }
        var disk = document.createElement('span');
        disk.className = 'for-lightning';

        if ((justBlurred === 'angleLightSpot') || (justBlurred === 'heightLightSpot')) {
          var angleInRad = this.paramsHtml.angleLightSpot * Math.PI / 180,
              h = this.paramsHtml.heightLightSpot,

              /*Формулу расчёта диаметра вывел из теоремы косинусов*/
              diameter = 2 * h / Math.cos(angleInRad / 2) * Math.sin(angleInRad / 2);

              if (!isNaN(diameter)) document.querySelector('[name="diameterLightSpot"]').value = diameter.toFixed(2);

        } else if (justBlurred === 'diameterLightSpot') {

          diameter = this.paramsHtml.diameterLightSpot;

          document.querySelector('[name="angleLightSpot"]').value = '';
          document.querySelector('[name="heightLightSpot"]').value = '';

        } else {

          diameter = this.paramsHtml.diameterLightSpot;

        } 
        
        /*disk.style.minWidth = this.proportion * this.paramsHtml.diameterLightSpot + 'px';
        disk.style.minHeight = this.proportion * this.paramsHtml.diameterLightSpot + 'px';*/

        disk.style.minWidth = disk.style.minHeight = this.proportion * diameter + 'px';

        spotElem.appendChild(disk);
        irrr = Array.from(document.querySelector(this.adaptiveParent.selector).children).filter(function (item) {
          return item.classList.contains('overflow-elem') ? 1 : 0;
        });
        irrr[0].appendChild(spotElem);
      }
      Array.from(document.querySelectorAll(this.adaptiveParent.selector + ' .' + className)).forEach(function (item) {
        item.style.width = ~~spotWidth + 'px';
        item.style.height = ~~spotHeight + 'px';
      });
    }

    /**
     * Инициализация
     * @return {FixturesCalculation} - возвращает текущий объект
     */

  }, {
    key: 'init',
    value: function init() {
      document.querySelector(this.adaptiveParent.selector).innerHTML = '';
      this.roomAdaptation(this.paramsHtml.width, this.paramsHtml.length, this.fixturesCalculation);
      return this;
    }
  }]);

  return FixturesCalculation;
}(); //  FixturesCalculation

document.addEventListener('DOMContentLoaded', function () {
  window.onload = function () {
    new FixturesCalculation('.fixtures-calculation__min').init().minMin();
    new FixturesCalculation('.fixtures-calculation__min-1').init().maxMin();
    new FixturesCalculation('.fixtures-calculation__min-2').init().minMax();
    new FixturesCalculation('.fixtures-calculation__min-3').init().maxMax();
    var rational = new FixturesCalculation('.fixtures-calculation__rational').init().rational();
    /**
     * Обработчик формы
     */
    Array.from(document.querySelectorAll('.for-input')).forEach(function (item) {
      item.onblur = function () {
        var name = item.name;
        var dataValue = item.value || item.dataset.default;
        var justBlurred = item.name;

        Array.from(document.querySelectorAll('[class^="fixtures-calculation__"]')).forEach(function (item) {
          item.dataset[name] = dataValue;
        });
        /*item.placeholder = dataValue;*/
        new FixturesCalculation('.fixtures-calculation__min').init().minMin(justBlurred);
        new FixturesCalculation('.fixtures-calculation__min-1').init().maxMin(justBlurred);
        new FixturesCalculation('.fixtures-calculation__min-2').init().minMax(justBlurred);
        new FixturesCalculation('.fixtures-calculation__min-3').init().maxMax(justBlurred);
        rational = new FixturesCalculation('.fixtures-calculation__rational').init().rational(justBlurred);

        whoIsActive();
        whoIsOptimal();
      };
    });

    /**
      * Обработчик выбора вариантов расположения светильников
      */
    Array.from(document.querySelectorAll('.fixtures-mini')).forEach(function (fixture) {
    	fixture.onclick = function() {
    		chooseFixture(fixture);
    	}
    });
    /**
      * Обработчик подсветки выбранного варианта
      */
      function whoIsActive() {
      	var mainFixture = document.querySelector('.fixtures.rational'),
           	miniFixtures = Array.from(document.querySelectorAll('.fixtures-mini')),
            currentQuantity = (~mainFixture.getAttribute('data-text').indexOf('Оптимально')) ?
                              parseInt(mainFixture.getAttribute('data-text').substr(12)) :
                              parseInt(mainFixture.getAttribute('data-text'));

      	miniFixtures.forEach((fixture) => {
      		if (fixture.classList.contains('fixtures-active')) {
      			fixture.classList.remove('fixtures-active');
      		}

          if (~fixture.getAttribute('data-text').indexOf('Оптимально')) {
            if (parseInt(fixture.getAttribute('data-text').substr(12)) === currentQuantity) {
              fixture.classList.add('fixtures-active');
            }
          } else {
            if (parseInt(fixture.getAttribute('data-text')) === currentQuantity) {
              fixture.classList.add('fixtures-active');
            }
          }
      	});
      }	whoIsActive();

      function whoIsOptimal() {
        Array.from(document.querySelectorAll('.fixtures')).forEach((fixture) => {
          if (parseInt(fixture.getAttribute('data-text')) === rational.finalQuantity) {
            fixture.setAttribute('data-text', 'Оптимально: ' + rational.finalQuantity);
          }
        });
      } whoIsOptimal();

    /**
      * Обработчик выбора вариантов подсчёта
      */
      function chooseFixture(selector) {
      	let mainFixtureWrapper = document.querySelector('.rational-wrapper'),
      		mainFixture = mainFixtureWrapper.querySelector('.fixtures.rational'),
      		circleWrapper = mainFixture.querySelector('.overflow-elem'),
      		cloneChosenFixture = selector.cloneNode(true),
      		originalWidth = getComputedStyle(mainFixture.querySelector('.fixtures-calculation__rational')).width,
      		originalHeight = getComputedStyle(mainFixture.querySelector('.fixtures-calculation__rational')).height,
      		originalCircleMinWidth = getComputedStyle(circleWrapper.querySelector('.for-lightning')).minWidth,
      		originalCircleMinHeight = getComputedStyle(circleWrapper.querySelector('.for-lightning')).minHeight,

      		/*Количество светильников по горизонтали*/
      		horizontalQuantity = ~~(parseInt(getComputedStyle(selector.querySelector('div')).width) /
  									parseInt(getComputedStyle(selector.querySelector('.fixtures-calculation--item')).width)),

      		/*Количество светильников по вертикали*/
      		verticalQuantity = ~~(parseInt(getComputedStyle(selector.querySelector('div')).height) /
  								  parseInt(getComputedStyle(selector.querySelector('.fixtures-calculation--item')).height));

      		if (cloneChosenFixture.classList.contains('fixtures-active')) {
      			cloneChosenFixture.classList.remove('fixtures-active');
      		}

      		cloneChosenFixture.classList.remove('fixtures-mini');
      		cloneChosenFixture.classList.add('rational');
      		cloneChosenFixture.querySelector('div').className = 'fixtures-calculation__rational';
      		cloneChosenFixture.querySelector('div').style.width = originalWidth;
      		cloneChosenFixture.querySelector('div').style.height = originalHeight;
      		Array.from(cloneChosenFixture.querySelectorAll('.fixtures-calculation--item')).forEach((circleWrap) => {
      			circleWrap.style.width = ~~(parseInt(originalWidth) / horizontalQuantity) + 'px';
      			circleWrap.style.height = ~~(parseInt(originalHeight) / verticalQuantity) + 'px';
      		});
      		Array.from(cloneChosenFixture.querySelectorAll('.for-lightning')).forEach((circle) => {
      			circle.style.minWidth = originalCircleMinWidth;
      			circle.style.minHeight = originalCircleMinHeight;
      		});


      	mainFixtureWrapper.replaceChild(cloneChosenFixture, mainFixture);
      	whoIsActive();
      }

    /**
      * Функция проверки - "А число ли вводит пользователь?"
      * @param {string} строка которая проверяется на числовитость
      */
      function isNumeric(str) {
        return !isNaN(parseFloat(str)) && isFinite(str);
      }

    /**
      * Прицепляем фильтр вводимых данных на поля
      */
      Array.from(document.querySelectorAll('.for-input-wrapper')).forEach((field) => {
        Array.from(field.querySelectorAll('input')).forEach((inputField) => {
          let alertMessage = field.querySelector('.input-error');
          inputField.onkeydown = function() {
            inputField.lastValue = inputField.value;
          }
          inputField.oninput = function() {
            if (!isNumeric(inputField.value) && inputField.value !== '') {
              inputField.value = inputField.lastValue;
              if (!alertMessage.classList.contains('input-error--active')) {
                alertMessage.classList.add('input-error--active');
              }
            } else {
              if (alertMessage.classList.contains('input-error--active')) {
                alertMessage.classList.remove('input-error--active');
              }
            }
          }
        });
      });

      document.querySelector('[name="angleLightSpot"]').oninput = function() {
        document.querySelector('[name="diameterLightSpot"]').value = '0';
      }
  };
});