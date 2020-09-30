var geet = require('users/elacerda/geet:geet');

var image_col = ee.ImageCollection(ls8.filterBounds(roi).filterDate('2019-01-01', '2019-12-31'))

var mask_clouds = function(image) {
  return (geet.cloudmask_ls8(image)); 
}

// Create single landsat image
var masked_image_col = image_col.map(mask_clouds);
var image = masked_image_col.median()

// Merge samples
var newfc = urbano.merge(agua).merge(floresta).merge(pasto)

// Collect Samples
var input_features = image.sampleRegions({
  collection: newfc,
  properties: ['cobertura'],
  scale: 30
});

// Train classifier(model) with training dataset
var classifier = ee.Classifier.smileRandomForest(10).train({
  features: input_features,
  classProperty: 'cobertura',
  inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']
});

// Model/Classify with training dataset 
var classified = image.classify(classifier);

// Clip final result
var classified_clip = classified.clip(roi);

// Show classification result
Map.addLayer(classified_clip)
