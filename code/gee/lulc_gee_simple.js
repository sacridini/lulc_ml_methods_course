var geet = require('users/elacerda/geet:geet');
var image_temp = ee.Image('COPERNICUS/S2/20161110T130242_20161110T165117_T23KPQ');
var image = geet.sentinel2_indices(image_temp, 'ndvi');
var newfc = urbano.merge(agua).merge(floresta).merge(pasto);

var input_features = image.sampleRegions({
  collection: newfc,
  properties: ['cobertura'],
  scale: 30
});

// Train classifier(model) with training dataset
var classifier = ee.Classifier.smileRandomForest(10).train({
  features: input_features,
  classProperty: 'cobertura',
  inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'NDVI']
});

// Model/Classify with training dataset 
var classified = image.classify(classifier);

// Clip final result
var classified_clip = classified.clip(roi);

// Show classification result
Map.addLayer(classified_clip)