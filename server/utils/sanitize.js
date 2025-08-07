const sanitizeHtml = require('sanitize-html');

module.exports = (str = '') =>
  sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} });
