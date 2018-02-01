class InitialForCircuit {
  constructor(selectorParent) {
    let parentHtml;
    if (typeof selectorParent === 'string') {
      parentHtml = document.querySelector(selectorParent);
    } else {
      parentHtml = selectorParent;
    }
    let datasetParams = {};
    let parentHtmlDataset = parentHtml.dataset;
    /*  Копирование из dataset в объект свойства класса  */
    Object.keys(parentHtmlDataset).forEach(function(name) {
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
    this.area.cols = Math.sqrt(datasetParams.quantity *
      datasetParams.width / datasetParams.length);
    this.area.rows = Math.sqrt(datasetParams.quantity *
      datasetParams.length / datasetParams.width);
  }

  roomAdaptation() {
    let newWidth; // Исходя из пропорций
    let newLength; // Исходя из пропорций
    let scheme = document.createElement('div');
    let oldWidth = this.datasetParams.width;
    let oldLength = this.datasetParams.length;
    let parentCompStyles = this.parent.compStyles;
    let parentWidth = parseFloat(parentCompStyles.width);
    let parentLength = parseFloat(parentCompStyles.height);
    let parentProportion =
      Math.max(parentWidth, parentLength) /
      ((parentWidth * parentLength) /
        Math.max(parentWidth, parentLength));
    let proportion =
      Math.max(oldWidth, oldLength) /
      (oldWidth * oldLength /
        Math.max(oldWidth, oldLength));
    scheme.className = this.scheme.className;
    this.parent.element.appendChild(scheme);
    this.scheme.element = scheme;

    if (Number(this.parent.element.dataset.size)) {
      this.parent.element.children[0].classList.add('size');
      scheme.dataset.width = Math.max(
        this.datasetParams.width, this.datasetParams.length
      );
      scheme.dataset.length = Math.min(
        this.datasetParams.width, this.datasetParams.length
      );
    }

    if (parentProportion > proportion) {
      newLength = parentLength;
      newWidth = proportion * newLength;
    } else {
      newWidth = parentLength;
      newLength = newWidth / proportion;
    }
    this.proportion = newWidth / Math.max(oldWidth, oldLength);
    this.scheme.width = newWidth;
    this.scheme.length = newLength;
    scheme.style.width = newWidth + 'px';
    scheme.style.height = newLength + 'px';
    let inner = document.createElement('div');
    inner.className = this.scheme.inner.className;
    this.scheme.inner.element = inner;
    scheme.appendChild(inner);

    let header = document.createElement('h2');
    header.className = 'scheme-header-created';
    header.innerHTML = this.parent.element.dataset.header;
    console.log(this.datasetParams);
    this.parent.element.appendChild(header);
  }

  createPerimeter(type) {
    this.roomAdaptation();
    type = this.parent.element.dataset.type;
    this.parent.type = type;
    if (type === 'area') {
      this.datasetParams.deltaWidth = 0;
      this.datasetParams.deltaLength = 0;
    }
    let perimeterWidth =
      this.scheme.width -
      this.datasetParams.deltaWidth *
      this.proportion * 2;
    let perimeterLength = this.scheme.length -
      this.datasetParams.deltaLength *
      this.proportion * 2;
    let perimeter = document.createElement('div');
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
      perimeter.style.width = perimeterLength + 'px';
      this.perimeter.width = perimeterLength;
    } else if (type === 'ellipse') {
      perimeter.style.width = perimeterWidth + 'px';
      this.perimeter.width = perimeterWidth;
      perimeter.style.borderRadius =
        `${perimeterWidth}px/${perimeterLength}px`;
    }
  }
}