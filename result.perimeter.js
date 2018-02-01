'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialForCircuit = function () {
  function InitialForCircuit(selectorParent) {
    _classCallCheck(this, InitialForCircuit);

    var parentHtml = void 0;
    if (typeof selectorParent === 'string') {
      parentHtml = document.querySelector(selectorParent);
    } else {
      parentHtml = selectorParent;
    }
    var datasetParams = {};
    var parentHtmlDataset = parentHtml.dataset;
    /*  Копирование из dataset в объект свойства класса  */
    Object.keys(parentHtmlDataset).forEach(function (name) {
      datasetParams[name] = parseFloat(parentHtmlDataset[name]);
    });
    this.parent = {
      element: parentHtml,
      compStyles: getComputedStyle(parentHtml)
    };
    this.parent.element.innerHTML = '';
    this.datasetParams = datasetParams;
    this.scheme = {
      className: 'scheme-parent__item',
      inner: {
        className: 'scheme-parent__item-inner'
      }
    };
    this.perimeter = {
      className: 'scheme-parent__perimeter'
    };
    this.spotItem = {
      className: 'scheme-parent__point'
    };
    this.spotItemInner = {
      className: 'scheme-light'
    };
    this.area.cols = Math.sqrt(datasetParams.quantity * datasetParams.width / datasetParams.length);
    this.area.rows = Math.sqrt(datasetParams.quantity * datasetParams.length / datasetParams.width);
  }

  _createClass(InitialForCircuit, [{
    key: 'roomAdaptation',
    value: function roomAdaptation() {
      var newWidth = void 0; // Исходя из пропорций
      var newLength = void 0; // Исходя из пропорций
      var scheme = document.createElement('div');
      var oldWidth = this.datasetParams.width;
      var oldLength = this.datasetParams.length;
      var parentCompStyles = this.parent.compStyles;
      var parentWidth = parseFloat(parentCompStyles.width);
      var parentLength = parseFloat(parentCompStyles.height);
      var parentProportion = Math.max(parentWidth, parentLength) / (parentWidth * parentLength / Math.max(parentWidth, parentLength));
      var proportion = Math.max(oldWidth, oldLength) / (oldWidth * oldLength / Math.max(oldWidth, oldLength));
      scheme.className = this.scheme.className;
      this.parent.element.appendChild(scheme);
      this.scheme.element = scheme;

      if (Number(this.parent.element.dataset.size)) {
        this.parent.element.children[0].classList.add('size');
        scheme.dataset.width = this.datasetParams.width;
        scheme.dataset.length = this.datasetParams.length;
      }

      if (parentProportion > proportion) {
        newLength = parentLength;
        newWidth = proportion * newLength;
      } else {
        newWidth = parentLength;
        newLength = newWidth / proportion;
      }


      if (oldWidth < oldLength) {
        newWidth = newWidth + newLength;
        newLength = newWidth - newLength;
        newWidth = newWidth - newLength;
      }

      if (oldWidth >= oldLength) {
        this.proportion = newWidth / Math.max(oldWidth, oldLength);
      } else {
        this.proportion = newLength / Math.max(oldWidth, oldLength);
      }

      this.scheme.width = newWidth;
      this.scheme.length = newLength;
      scheme.style.width = newWidth + 'px';
      scheme.style.height = newLength + 'px';
      var inner = document.createElement('div');
      inner.className = this.scheme.inner.className;
      this.scheme.inner.element = inner;
      scheme.appendChild(inner);

      var header = document.createElement('h2');
      header.className = 'scheme-header-created';
      header.innerHTML = this.parent.element.dataset.header;

      this.parent.element.appendChild(header);
    }
  }, {
    key: 'createPerimeter',
    value: function createPerimeter(type) {
      this.roomAdaptation();
      type = this.parent.element.dataset.type;
      this.parent.type = type;
      if (type === 'area') {
        this.datasetParams.deltaWidth = 0;
        this.datasetParams.deltaLength = 0;
      }
      var perimeterWidth = this.scheme.width - this.datasetParams.deltaWidth * this.proportion * 2;
      var perimeterLength = this.scheme.length - this.datasetParams.deltaLength * this.proportion * 2;
      var perimeter = document.createElement('div');
      perimeter.className = this.perimeter.className;
      this.scheme.inner.element.appendChild(perimeter);
      this.perimeter.element = perimeter;
      perimeter.style.height = perimeterLength + 'px';
      this.perimeter.length = perimeterLength;
      perimeter.classList.add(type);
      if (type === 'rectangle' || type === 'area' || type === '') {
        perimeter.style.width = perimeterWidth + 'px';
        this.perimeter.width = perimeterWidth;
      } else if (type === 'disk') {

        if (perimeterWidth >= perimeterLength) {
          perimeter.style.width = perimeterLength + 'px';
          this.perimeter.width = perimeterLength;
        } else {
          perimeter.style.width = perimeterWidth + 'px';
          perimeter.style.height = perimeterWidth + 'px';
          this.perimeter.width = perimeterWidth;
        }

      } else if (type === 'ellipse') {
        perimeter.style.width = perimeterWidth + 'px';
        this.perimeter.width = perimeterWidth;
        perimeter.style.borderRadius = perimeterWidth + 'px/' + perimeterLength + 'px';
      }
    }
  }]);

  return InitialForCircuit;
}();

'use strict';
/**
 * Функция для упрощения перебора коллекции
 * @param {string}selector - css-селектор
 * @param {function}func - функция для обработки массива по foreach
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function $forEach(selector, func) {
  Array.from(document.querySelectorAll(selector)).forEach(func);
}

function $filter(selector, func) {
  return Array.from(document.querySelectorAll(selector)).filter(func);
}

var Perimeter = function (_InitialForCircuit) {
  _inherits(Perimeter, _InitialForCircuit);

  function Perimeter() {
    _classCallCheck(this, Perimeter);

    return _possibleConstructorReturn(this, (Perimeter.__proto__ || Object.getPrototypeOf(Perimeter)).apply(this, arguments));
  }

  _createClass(Perimeter, [{
    key: 'disk',
    value: function disk(newQuantity) {
      var quantity = this.datasetParams.quantity;
      var perimeter = this.perimeter.element;
      var centerX = this.perimeter.width / 2;

      if (this.perimeter.width >= this.perimeter.length) {
        var centerY = this.perimeter.length / 2;
      } else {
        var centerY = this.perimeter.width / 2;
      }

      var step = void 0;
      var item = void 0;
      var light = void 0;
      var x = void 0;
      var y = void 0;
      var cornerRadian = void 0;
      if (newQuantity) {
        quantity += 4 - quantity % 4;
      }
      if (Number(this.parent.element.dataset.distance)) {
        this.parent.element.classList.add('distance');
        step = 2 * centerX * Math.PI / quantity;
        this.parent.element.dataset.step = (step / this.proportion).toFixed(2);
      }

      this.parent.element.classList.add('optimised');
      this.parent.element.dataset.optimisedQuantity = quantity;
      for (var i = 0; i <= 360; i += 360 / quantity) {
        item = document.createElement('div');
        item.className = 'scheme-parent__point';
        light = document.createElement('span');
        light.className = this.spotItemInner.className;
        light.style.minWidth = Number(this.datasetParams.spot) * this.proportion + 'px';
        light.style.minHeight = Number(this.datasetParams.spot) * this.proportion + 'px';
        item.appendChild(light);
        perimeter.appendChild(item);
        cornerRadian = i * Math.PI / 180;
        x = parseFloat(centerX * Math.cos(cornerRadian) + centerX) - 5;
        y = parseFloat(centerY * Math.sin(cornerRadian) + centerY) - 5;
        item.style.left = x + 'px';
        item.style.top = y + 'px';
      }
    }
  }, {
    key: 'rectangle',
    value: function rectangle(newQuantity) {
      var quantity = this.datasetParams.quantity;
      var perimeter = this.perimeter.element;
      var width = this.perimeter.width;
      var length = this.perimeter.length;
      var item = void 0;
      var qWidth = void 0;
      var qHeight = void 0;
      var spotSize = void 0;
      var template = void 0;
      if (newQuantity) {
        quantity += 4 - quantity % 4;
      } else if (quantity % 2 !== 0) {
        quantity += 2 - quantity % 2;
      }
      this.parent.element.classList.add('optimised');
      this.parent.element.dataset.optimisedQuantity = quantity;
      qWidth = (isNaN(Math.round(quantity / (2 * (1 + length / width))))) ? 1 : Math.round(quantity / (2 * (1 + length / width)));
      qHeight = ((quantity - 4 - 2 * qWidth) / 2) ? (quantity - 4 - 2 * qWidth) / 2 : 1;
      if (Number(this.parent.element.dataset.distance)) {
        this.parent.element.classList.add('distance');
        this.parent.element.dataset.step = (width / qWidth / this.proportion).toFixed(2) + '/' + (length / qHeight / this.proportion).toFixed(2);
      }

      for (var i = 0; i <= Math.max(qWidth, qHeight) + 1; i++) {
        item = document.createElement('div');
        item.className = 'rectangle_item-vertical';
        item.style.left = width / (~~Math.max(qWidth, qHeight) + 1) * i - 4 + 'px';
        spotSize = Number(this.datasetParams.spot) * this.proportion;
        template = '<div class="scheme-parent__point">\n            <div class="' + this.spotItemInner.className + '" \n            style="min-height: ' + spotSize + 'px;\n            min-width: ' + spotSize + 'px;"></div>\n        </div><div class="scheme-parent__point">\n            <div class="' + this.spotItemInner.className + '" \n            style="min-height: ' + spotSize + 'px;\n            min-width: ' + spotSize + 'px;"></div>\n        </div>';
        item.insertAdjacentHTML('afterbegin', template);
        perimeter.appendChild(item);
      }
      for (var _i = 1; _i <= Math.min(qWidth, qHeight); _i++) {
        item = document.createElement('div');
        item.className = 'rectangle_item-horizontal';
        item.style.top = length / (~~Math.min(qWidth, qHeight) + 1) * _i - 4 + 'px';
        item.insertAdjacentHTML('afterbegin', template);
        perimeter.appendChild(item);
      }
    }
  }, {
    key: 'ellipse',
    value: function ellipse() {
      var quantity = this.datasetParams.quantity;
      var perimeter = this.perimeter.element;
      var centerX = this.perimeter.width / 2;
      var centerY = this.perimeter.length / 2;
      var x = void 0;
      var y = void 0;
      var item = void 0;
      var light = void 0;
      var step = void 0;
      var cornerRadian = void 0;
      if (quantity < 4 || quantity % 4 !== 0) {
        quantity += 4 - quantity % 4;
      }
      if (Number(this.parent.element.dataset.distance)) {
        this.parent.element.classList.add('distance');
        step = (centerX + centerY) * Math.PI / quantity;
        this.parent.element.dataset.step = (step / this.proportion).toFixed(2);
      }
      this.parent.element.classList.add('optimised');
      this.parent.element.dataset.optimisedQuantity = quantity;
      for (var i = 0; i <= 360; i += 360 / quantity) {
        item = document.createElement('div');
        item.className = 'scheme-parent__point';
        light = document.createElement('span');
        light.className = this.spotItemInner.className;
        light.style.minWidth = Number(this.datasetParams.spot) * this.proportion + 'px';
        light.style.minHeight = Number(this.datasetParams.spot) * this.proportion + 'px';
        item.appendChild(light);
        perimeter.appendChild(item);
        cornerRadian = i * Math.PI / 180;
        x = parseFloat(centerX * Math.cos(cornerRadian) + centerX) - 5;
        y = parseFloat(centerY * Math.sin(cornerRadian) + centerY) - 5;
        item.style.left = x + 'px';
        item.style.top = y + 'px';
      }
    } //  ellipse

  }, {
    key: 'area',
    value: function area() {
      var obj = {
        minMin: {
          name: 'minMin',
          quantity: ~~this.area.cols * ~~Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width)
        },
        minMax: {
          name: 'minMax',
          quantity: ~~this.area.cols * Math.ceil(Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width))
        },
        maxMin: {
          name: 'maxMin',
          quantity: Math.ceil(this.area.cols) * ~~Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width)
        },
        maxMax: {
          name: 'maxMax',
          quantity: Math.ceil(this.area.cols) * Math.ceil(Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width))
        }
      };
      var quantityOld = this.datasetParams.quantity;
      var differenceArr = Object.keys(obj).map(function (item) {
        return obj[item].quantity - quantityOld;
      });
      var finalQuantity = quantityOld + differenceArr.reduce(function (prev, item) {
        return Math.abs(prev) < Math.abs(item) ? prev : Math.abs(prev) === Math.abs(item) ? Math.max(prev, item) : item;
      });
      var finalMethod = Object.keys(obj).filter(function (item) {
        return obj[item].quantity === finalQuantity ? obj[item] : '';
      });
      this[finalMethod[0]]();
    }
  }, {
    key: 'minMin',
    value: function minMin() {
      var cols = ~~this.area.cols;
      var rows = ~~Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width);
      if (rows > cols) {
        cols = [rows, rows = cols][0];
      }
      this.createSpotElems(cols, rows);
      return this;
    }
  }, {
    key: 'minMax',
    value: function minMax() {
      var cols = ~~this.area.cols;
      var rows = Math.ceil(Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width));
      if (rows > cols) {
        cols = [rows, rows = cols][0];
      }
      this.createSpotElems(cols, rows);
      return this;
    }
  }, {
    key: 'maxMin',
    value: function maxMin() {
      var cols = Math.ceil(this.area.cols);
      var rows = ~~Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width);
      if (rows > cols) {
        cols = [rows, rows = cols][0];
      }
      this.createSpotElems(cols, rows);
      return this;
    }
  }, {
    key: 'maxMax',
    value: function maxMax() {
      var cols = Math.ceil(this.area.cols);
      var rows = Math.ceil(Math.sqrt(this.datasetParams.quantity * this.datasetParams.length / this.datasetParams.width));
      if (rows > cols) {
        cols = [rows, rows = cols][0];
      }
      this.createSpotElems(cols, rows);
      return this;
    }
  }, {
    key: 'createSpotElems',
    value: function createSpotElems(cols, rows) {
      var className = this.spotItem.className;
      var spotElem = void 0;
      var spotWidth = void 0;
      var spotHeight = void 0;
      var widthParent = ~~this.perimeter.width;
      var heightParent = ~~this.perimeter.length;
      var widthParentOld = this.datasetParams.width;
      var heightParentOld = this.datasetParams.length;
      var contRows = 0;
      var horScale = document.createElement('aside');
      var horScaleChild = void 0;
      var verScale = document.createElement('aside');
      var verScaleChild = void 0;
      var irrr = void 0;
      var quantity = void 0;
      var perimeterElem = this.perimeter.element;
      var overflowElem = document.createElement('div');
      overflowElem.classList.add('overflow-elem');
      perimeterElem.appendChild(overflowElem);

      if (widthParentOld >= heightParentOld) {
        spotWidth = ~~(widthParent / cols);
        spotHeight = ~~(heightParent / rows);
      } else {
        spotWidth = ~~(widthParent / rows);
        spotHeight = ~~(heightParent / cols);
      }

      quantity = cols * rows;
      this.parent.element.classList.add('optimised');
      this.parent.element.dataset.optimisedQuantity = quantity;
      if (Number(this.parent.element.dataset.scale)) {

        if (widthParentOld >= heightParentOld) {
          horScale.className = 'horisontal-scale';
          verScale.className = 'vertical-scale';
        } else {
          horScale.className = 'vertical-scale';
          verScale.className = 'horisontal-scale';
        }

        perimeterElem.parentElement.appendChild(horScale);
        perimeterElem.parentElement.appendChild(verScale);
      }
      for (var i = 1; i <= quantity; i++) {
        spotElem = document.createElement('div');
        spotElem.className = className;
        if (Number(this.parent.element.dataset.scale)) {
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
        }

        var disk = document.createElement('span');
        disk.className = this.spotItemInner.className;
        disk.style.minWidth = Number(this.datasetParams.spot) * this.proportion + 'px';
        disk.style.minHeight = Number(this.datasetParams.spot) * this.proportion + 'px';
        spotElem.appendChild(disk);
        irrr = Array.from(perimeterElem.children).filter(function (item) {
          return item.classList.contains('overflow-elem') ? 1 : 0;
        });
        irrr[0].appendChild(spotElem);
      }
      perimeterElem.querySelectorAll('.' + className).forEach(function (item) {
        item.style.width = spotWidth + 'px';
        item.style.height = spotHeight + 'px';
      });
    }
  }, {
    key: 'initPerimeter',
    value: function initPerimeter(params) {
      _get(Perimeter.prototype.__proto__ || Object.getPrototypeOf(Perimeter.prototype), 'createPerimeter', this).call(this);
      this[this.parent.type](params.optimization);
    }
  }]);

  return Perimeter;
}(InitialForCircuit);

'use strict';

window.onload = function () {
  var optimizationStatus = document.querySelector('#opt-quantity').checked;

  /**
   * Обработчик формы
   */
  $forEach('.for-input', function (item) {
    var optimizationStatus = 1;
    if (item.type === 'checkbox') {
      item.onchange = function () {
        optimizationStatus = this.checked;
        $forEach('[data-type]', function (item) {
          new Perimeter(item).initPerimeter({
            optimization: optimizationStatus
          });
          $forEach('.scheme-header', function (item) {
            item.classList.add('top');
          });
        });
      };
    }
    item.oninput = function () {
      var name = item.name;
      var dataValue = item.value || item.dataset.default;

      /**
        * Выполним проверку на соответствие заполненных полей всем критериям
        */

        var fail = document.querySelector('.fail'),
            fieldsCheck = areAllFieldsFilledCorrect();

        if (fieldsCheck === 'correct') {
          fail.style.visibility = 'hidden';
          item.style.backgroundColor = '';
        } else {
            fail.style.visibility = 'visible';
            item.style.backgroundColor = '#FB6666';

            if (fieldsCheck === 'width_indent_fail') {
              fail.innerHTML = 'Отступ по ширине не может быть больше половины ширины!';
              return false;
            }
            if (fieldsCheck === 'length_indent_fail') {
              fail.innerHTML = 'Отступ по длине не может быть больше половины длины!';
              return false;
            }
        }

      $forEach('.scheme', function (item) {
        item.dataset[name] = dataValue;
      });
      item.placeholder = dataValue;

      var empty = $filter('.for-input:not([type="checkbox"])', function (item) {
        if (item.value === '') {
          item.classList.add('border-red');
        } else {
          item.classList.remove('border-red');
        }
        return item.value === '';
      }).length;
      if (empty) return false;

      new Perimeter('.scheme-parent_perimeter_disk').initPerimeter('disk', document.querySelector('#opt-quantity').checked);
      new Perimeter('.scheme-parent_perimeter_rectangle').initPerimeter('rectangle', document.querySelector('#opt-quantity').checked);
      new Perimeter('.scheme-parent_perimeter_ellipse').initPerimeter('ellipse');
      new Perimeter('.scheme-parent_perimeter_area').initPerimeter('area');
      new Perimeter('.scheme-parent_perimeter_scale').initPerimeter(document.querySelector('.scheme-parent_perimeter_scale').dataset.type);
    };
  });
  $forEach('.scheme-js', function (item) {
    item.onclick = function () {

      var fail = document.querySelector('.fail');

      var empty = $filter('.for-input:not([type="checkbox"])', function (item) {
        if (item.value === '') {
          item.classList.add('border-red');
        } else {
          item.classList.remove('border-red');
        }
        return item.value === '';
      }).length;

      if (empty) {
        fail.innerHTML = 'Прежде чем выбрать один из вариантов расстановки, заполните все поля!';
        fail.style.visibility = 'visible';
        return false;
      } else {
        fail.style.visibility = '';
      }

      var schemeActive = 'scheme-active';
      $forEach('.' + schemeActive, function (item) {
        item.classList.remove(schemeActive);
      });
      item.classList.add('scheme-active');
      document.querySelector('.scheme-parent_perimeter_scale').dataset.type = this.dataset.type;
      new Perimeter('.scheme-parent_perimeter_scale').initPerimeter({
        optimization: document.querySelector('#opt-quantity').checked
      });
    };
  });

  document.querySelector('.scheme-grid__toggle-grid').onclick = function () {
    var $obj = document.querySelector('.scheme-grid');
    if ($obj.classList.contains('close')) {
      $obj.classList.remove('close');
      $obj.classList.add('open');
      this.value = 'Скрыть';
    } else {
      $obj.classList.add('close');
      $obj.classList.remove('open');
      this.value = 'Показать';
    }
  };

  /**
  * Определим несколько переменных нужных для функции areAllFieldsFilledCorrect()
  */
  var widthField = document.querySelector('[name = "width"]'),
      lengthField = document.querySelector('[name = "length"]'),
      widthIndentField = document.querySelector('[name = "deltaWidth"]'),
      lengthIndentField = document.querySelector('[name = "deltaLength"]'),
      quantityField = document.querySelector('[name = "quantity"]'),
      spotField = document.querySelector('[name = "spot"]');

      widthField.value = '';
      lengthField.value = '';
      widthIndentField.value = '';
      lengthIndentField.value = '';
      quantityField.value = '';
      spotField.value = '';

  /**
  * Проверка всех полей на корректность заполнения
  */
  function areAllFieldsFilledCorrect() {

    if (+widthField.value < +widthIndentField.value * 2) {
      return 'width_indent_fail';
    } else if (+lengthField.value < +lengthIndentField.value * 2) {
      return 'length_indent_fail';
    }

    return 'correct';
  }
};