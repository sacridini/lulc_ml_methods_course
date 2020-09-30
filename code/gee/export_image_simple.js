var image_col = ee.ImageCollection(ls8.filterBounds(roi).filterDate('2019-01-01', '2019-12-31'));
var image = image.col.sort('CLOUD_COVER').first();

Map.addLayer(image)

Export.image.toDrive({
  image: image,
  description: 'my_image',
  scale: 30,
  maxPixels: 1e13
})