var geet = require('users/elacerda/geet:geet');
var image_col = ee.ImageCollection(ls8.filterBounds(roi).filterDate('2019-01-01', '2019-12-31'))

var mask_clouds = function(image) {
  return (geet.cloudmask_ls8(image)); 
}

var masked_image_col = image_col.map(mask_clouds);
var image = masked_image_col.median();

Map.addLayer(image)

Export.image.toDrive({
  image: image,
  description: 'my_image',
  scale: 30,
  maxPixels: 1e13
})