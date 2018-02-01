'use strict';

window.onload = () => {
  let optimizationStatus = document
    .querySelector('#opt-quantity')
    .checked;

  // $forEach('[data-type]', function(item) {
  //   new Perimeter(item)
  //     .initPerimeter({
  //       optimization: optimizationStatus
  //     });
  // });
  /**
   * Обработчик формы
   */
  $forEach('.for-input', item => {
    let optimizationStatus = 1;
  if (item.type === 'checkbox') {
    item.onchange = function() {
      optimizationStatus = this.checked;
      $forEach('[data-type]', function(item) {
        new Perimeter(item)
          .initPerimeter({
            optimization: optimizationStatus
          });
        $forEach('.scheme-header', function(item) {
          item.classList.add('top');
        });
      });
    };
  }
  item.oninput = () => {
    let name = item.name;
    let dataValue = item.value || item.dataset.default;
    $forEach('.scheme', item => {
      item.dataset[name] = dataValue;
  });
    item.placeholder = dataValue;

    let empty = $filter(
      '.for-input:not([type="checkbox"])',
      function(item) {
        if (item.value === '') {
          item.classList.add('border-red');
        } else {
          item.classList.remove('border-red');
        }
        return item.value === '';
      }).length;
    if (empty) return false;

    new Perimeter('.scheme-parent_perimeter_disk')
      .initPerimeter(
        'disk',
        document.querySelector('#opt-quantity').checked
      );
    new Perimeter('.scheme-parent_perimeter_rectangle')
      .initPerimeter(
        'rectangle',
        document.querySelector('#opt-quantity').checked
      );
    new Perimeter('.scheme-parent_perimeter_ellipse')
      .initPerimeter('ellipse');
    new Perimeter('.scheme-parent_perimeter_area')
      .initPerimeter('area');
    new Perimeter('.scheme-parent_perimeter_scale')
      .initPerimeter(document
        .querySelector('.scheme-parent_perimeter_scale')
        .dataset.type);
  };
});
  $forEach('.scheme-js', item => {
    item.onclick = function() {
    let schemeActive = 'scheme-active';
    $forEach(`.${schemeActive}`, function(item) {
      item.classList.remove(schemeActive);
    });
    item.classList.add('scheme-active');
    document
      .querySelector('.scheme-parent_perimeter_scale')
      .dataset.type = this.dataset.type;
    new Perimeter('.scheme-parent_perimeter_scale')
      .initPerimeter({
        optimization: document
          .querySelector('#opt-quantity')
          .checked
      });
  };
});

  document
    .querySelector('.scheme-grid__toggle-grid').onclick =
    function() {
      let $obj = document.querySelector('.scheme-grid');
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
};
