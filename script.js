/**
 * displaying source codes
 */
(function () {
  var displayCode = function (sources) {
    sources.forEach(function (source) {
      var insertTo = document.querySelector(
        '[data-js-selector="' + source.dataset.jsAttributes + '"]'
      );
      if (!insertTo) return;

      var codes = source.innerHTML.split('\n').filter(function (code) {
        return !/^\s*$/.test(code);
      });
      var indentMatched = codes[0].match(/^\s+/);
      var indentLength = indentMatched ? indentMatched[0].length : 0;
      var replaceReg = new RegExp('^\\s{' + indentLength + '}');
      codes = codes
        .map(function (code) {
          return code.replace(replaceReg, '');
        })
        .join('\n');
      insertTo.innerText = codes;
      Prism.highlightElement(insertTo);
    });
  };
  displayCode(document.querySelectorAll('[data-js-selector="source"]'));
  window.addEventListener('DOMContentLoaded', (event) => {
    displayCode(document.querySelectorAll('[data-js-selector="sourceLazy"]'));
  });
})();

/**
 * copy to clipboard
 */
(function () {
  var triggers = document.querySelectorAll('[data-js-selector="copy"]');
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var codes = document.querySelector(
        '[data-js-selector="' + this.dataset.jsAttributes + '"]'
      ).innerText;
      navigator.clipboard.writeText(codes).then(function () {
        alert('コピーしました。');
      });
    });
  });
})();

/**
 * quote jscopyand
 */
(function () {
  var quoters = document.querySelectorAll('[data-js-selector="quote"]');
  window.addEventListener('DOMContentLoaded', (event) => {
    quoters.forEach(function (quoter) {
      var attributes = quoter.dataset.jsAttributes.split(',').map(function (v) {
        return v.trim();
      });
      var target = document.querySelector(
        '[data-js-selector="' + attributes[0] + '"]'
      );
      var lineFrom = Number(attributes[1]);
      var lineTo = Number(attributes[2]) || lineFrom;
      quoter.innerText = target.innerText
        .split('\n')
        .slice(lineFrom - 1, lineTo)
        .join('\n');
      Prism.highlightElement(quoter);
    });
  });
})();

/**
 * accordion
 */
(function () {
  var triggers = document.querySelectorAll('[data-js-selector="accordion"]');
  triggers.forEach(function (trigger) {
    trigger.nextElementSibling.style.display = 'none';
    trigger.addEventListener('click', function () {
      this.nextElementSibling.style.display = this.nextElementSibling.style
        .display
        ? ''
        : 'none';
      if (this.dataset.jsAttributes === 'remove') {
        this.style.display = 'none';
      }
    });
  });
})();

/**
 * back link
 */
(function () {
  var trigger = document.querySelector('[data-js-selector="back"]');
  if (!trigger) return;

  if (history.length < 2) {
    trigger.remove();
    return;
  }

  trigger.addEventListener('click', function () {
    history.back();
  });
})();

/**
 * keyword filter
 */
(function () {
  var keywordFilter = document.querySelector(
    '[data-js-selector="keywordFilter"]'
  );
  if (!keywordFilter) return;
  var input = keywordFilter.querySelector('input');
  var indexes = Array.from(keywordFilter.nextElementSibling.children);
  input.addEventListener('input', function () {
    var value = this.value;
    var reg = new RegExp(value);
    indexes.forEach(function (item) {
      if (!value) {
        item.style.display = '';
        return;
      }
      var hasValue =
        reg.test(item.innerText) || reg.test(item.dataset.jsAttributes);
      item.style.display = hasValue ? '' : 'none';
    });
  });
})();

/**
 * for root
 */
(function () {
  if (window === window.parent) return;
  document.body.classList.add('as-iframe');
  Array.from(document.querySelector('.container').children).forEach(function (
    element
  ) {
    if (!element.classList.contains('main')) {
      element.style.display = 'none';
    }
  });
})();
