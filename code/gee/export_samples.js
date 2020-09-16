var newfc = urbano.merge(agua).merge(floresta).merge(pasto);

Export.table.toDrive({
  collection: newfc,
  folder: 'ee',
  description:'newfc',
  fileFormat: 'SHP'
});