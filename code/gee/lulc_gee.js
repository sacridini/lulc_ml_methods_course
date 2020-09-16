var geet = require('users/elacerda/geet:geet');
var image_temp = ee.Image('COPERNICUS/S2/20161110T130242_20161110T165117_T23KPQ');
var image = geet.sentinel2_indices(image_temp, 'ndvi');
var newfc = urbano.merge(agua).merge(floresta).merge(pasto);

var input_features = image.sampleRegions({
  collection: newfc,
  properties: ['cobertura'],
  scale: 30
});

// Split data in (train - test) datasets
input_features = input_features.randomColumn();
var split = 0.7;  // 70% training, 30% testing.
var trainingPartition = input_features.filter(ee.Filter.lt('random', split));
var testingPartition = input_features.filter(ee.Filter.gte('random', split));

// Train classifier(model) with training dataset
var classifier = ee.Classifier.smileRandomForest(10).train({
  features: trainingPartition,
  classProperty: 'cobertura',
  inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'NDVI']
});

// Model/Classify with training dataset 
var classified = image.classify(classifier);

// Validation
var validation = testingPartition.classify(classifier);
var testAccuracy = validation.errorMatrix('cobertura', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());
print('kappa: ', testAccuracy.kappa())

// Train final model (all data)
var classifier_final = ee.Classifier.smileRandomForest(10).train({
  features: input_features,
  classProperty: 'cobertura',
  inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'NDVI']
});

// Generate final result
var classified_final = image.classify(classifier_final);

// Clip final result
var classified_final_clip = classified_final.clip(roi);

// Show classification result
Map.addLayer(classified_final_clip)

// Export final classification to Google Drive
Export.image.toDrive({
    image: classified_final_clip,
    description: 'lt-classified_final',
    folder: 'ee',
    fileNamePrefix: 'classified_final',
    region: roi,
    scale: 30,
    maxPixels: 1e13
});