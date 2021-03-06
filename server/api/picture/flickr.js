/** flickr.js **/

var request = require('request');
var Picture = require('./picture.js');

var FlickrLoader = function (page, per_page) {
  this.options = {
    uri: 'https://api.flickr.com/services/rest/',
    timeout: 10000,
    qs: {
      method: 'flickr.photos.search',
      api_key: '36862b3eb779f31ad749a8b561b730b6',
      tags: 'aston+martin',
      format: 'json',
      extras: 'url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o',
      nojsoncallback: 1,
      per_page: per_page,
      page: page
    }
  };
};

FlickrLoader.prototype.mapToResponse = mapToResponse;

function mapToResponse(data) {
  var payload = JSON.parse(data);

  return {
    "pictures": mapPictures(payload.photos.photo),
    "meta": {
      "paging": {
        "perpage": payload.photos.perpage,
        "page": payload.photos.page,
        "pages": payload.photos.pages,
        "total": payload.photos.total
      },
      "result": {
        "status": payload.stat,
        "code": payload.code,
        "message": payload.message
      }
    }
  };
}

function mapPictures(pictures) {
  var mappedPictures = [];

  pictures.forEach(function(element) {
    mappedPictures.push(new Picture({id: element.id, title: element.title, url: element.url_m, width: element.width_m, height: element.height_m }));
  });

  return mappedPictures;
}

module.exports = FlickrLoader;
