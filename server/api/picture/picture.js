/** picture.js **/

var Picture = function (data) {
  this.data = data;
};

Picture.prototype.data = {};

// Id
Picture.prototype.get = function (id) {
  return this.data[id];
};

Picture.prototype.set = function (id, value) {
  this.data[id] = value;
};

// Title
Picture.prototype.get = function (title) {
  return this.data[title];
};

Picture.prototype.set = function (title, value) {
  this.data[title] = value;
};

// Url
Picture.prototype.get = function (url) {
  return this.data[url];
};

Picture.prototype.set = function (url, value) {
  this.data[url] = value;
};

// Width
Picture.prototype.get = function (width) {
  return this.data[width];
};

Picture.prototype.set = function (width, value) {
  this.data[width] = value;
};

// Height
Picture.prototype.get = function (height) {
  return this.data[height];
};

Picture.prototype.set = function (height, value) {
  this.data[height] = value;
};

module.exports = Picture;
