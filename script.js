/**
 * displaying source codes
 */
(function () {
  var sources = document.querySelectorAll('[data-js-selector="source"]');
  sources.forEach(function (source) {
    var codes = source.innerHTML
      .split('\n')
      .filter(function (code) {
        return !/^\s*$/.test(code);;
      });
    var indentMatched = codes[0].match(/^\s+/);
    var indentLength = indentMatched ? indentMatched[0].length : 0;
    var replaceReg = new RegExp('^\\s{' + indentLength + '}');
    codes = codes
      .map(function (code) {
        return code.replace(replaceReg, '');
      })
      .join('\n');
    var insertTo = document.querySelector('[data-js-selector="' + source.dataset.jsAttributes + '"]');
    insertTo.innerText = codes;
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
      this.nextElementSibling.style.display = this.nextElementSibling.style.display ? '' : 'none';
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
