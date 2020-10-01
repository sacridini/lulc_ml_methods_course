var image_col = ee.ImageCollection(ls8.filterBounds(roi).filterDate('2019-01-01', '2019-12-31'))
var rio = image_col.sort('CLOUD_COVER').first()
Map.addLayer(rio)

var newfc = forest.merge(water).merge(urban)

var input_features = rio.sampleRegions({
  collection: newfc,
  properties: ['class'],
  scale: 30
})

input_features = input_features.randomColumn()
var split = 0.7
var trainingPartition = input_features.filter(ee.Filter.lt('random', split))
var testingPartition = input_features.filter(ee.Filter.gte('random', split))

// Train classifier(model) with training dataset
var classifier = ee.Classifier.smileRandomForest(10).train({
  features: trainingPartition,
  classProperty: 'class',
  inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']
});

// Model/Classify with training dataset 
var classified = rio.classify(classifier);

// Validation
var validation = testingPartition.classify(classifier);
var testAccuracy = validation.errorMatrix('class', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());
print('kappa: ', testAccuracy.kappa())



Export.image.toDrive({
  image: rio,
  scale: 30,
  maxPixels: 1e13
})