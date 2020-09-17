library(dplyr)
library(raster)
library(mlr)

# Read as Shapefile -------------------------------------------------------
amostras <- shapefile("~/Documents/curso_rf/samples_final.shp")
amostras_df <- as.data.frame(amostras)
amostras_df <- dplyr::select(amostras_df, -coords.x1, -coords.x2) # remove coordinates columns

# MLR ---------------------------------------------------------------------
rTask <- mlr::makeClassifTask(data = amostras_df, target = "class") # create task
rf = mlr::makeLearner("classif.randomForest", predict.type = "prob") # create learner
rfModel <- mlr::train(rf, rTask) # train the model
kFold <- mlr::makeResampleDesc("RepCV", folds = 10, reps = 100) # cross validation parameters
rfFoldCV <- mlr::resample(learner = rf, task = rTask, resampling = kFold, measures = list(mmce, kappa)) 

mlr::calculateConfusionMatrix(rfFoldCV$pred) # confusion matrix
mlr::getFeatureImportance(rfModel) # Show the bands that contributed the most for the final result


# Advanced - in this particular case its probably not ideal because we dont have enough input data
fv <- mlr::generateFilterValuesData(rTask, method = "FSelectorRcpp_information.gain") # filter the most important bands
plotFilterValues(fv)
filtered_task <- filterFeatures(rTask, method = "FSelectorRcpp_information.gain", abs = 4)


  

