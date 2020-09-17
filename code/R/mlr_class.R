library(dplyr)
library(raster)
library(mlr)

# Read as Shapefile -------------------------------------------------------
amostras <- raster::shapefile("~/Documents/curso_rf/samples_final.shp")
amostras_df <- as.data.frame(amostras)
amostras_df <- dplyr::select(amostras_df, -coords.x1, -coords.x2) # remove coordinates columns

# MLR ---------------------------------------------------------------------
rTask <- mlr::makeClassifTask(data = amostras_df, target = "class") # create task
rf = mlr::makeLearner("classif.randomForest", predict.type = "prob") # create learner
rfModel <- mlr::train(rf, rTask) # train the model
kFold <- mlr::makeResampleDesc("RepCV", folds = 10, reps = 50) # cross validation parameters
rfFoldCV <- mlr::resample(learner = rf, task = rTask, resampling = kFold, measures = list(mmce, kappa)) 

mlr::calculateConfusionMatrix(rfFoldCV$pred) # confusion matrix
mlr::getFeatureImportance(rfModel) # Show the bands that contributed the most for the final result


# Advanced (optional) - in this particular case its probably not ideal because we dont have enough input data
# Lets filter the most important predictors to speedup the model training
fv <- mlr::generateFilterValuesData(rTask, method = "FSelectorRcpp_information.gain") # filter the most important bands
mlr::plotFilterValues(fv)
filtered_task <- mlr::filterFeatures(rTask, method = "FSelectorRcpp_information.gain", abs = 4)


# Raster Classification ---------------------------------------------------
in_raster <- stack("Documents/curso_rf/mosaic.tif")
in_raster <- in_raster[[c(2,3,4,5,6,7)]]
names(in_raster) <- c("B2", "B3", "B4", "B5", "B6", "B7")
r_df <- as.data.frame(as.matrix(in_raster)) # transform the raster in data.frame
r_df$value <- 0 # add and extra column with all zeros 
pred_raster_rf <- predict(object = rfModel, newdata = r_df) # create the classification
pred_raster <- in_raster[[1]] # create the output raster
pred_raster[] <- pred_raster_rf$data$response # set the values to the output raster
plot(pred_raster) # plot the final classification raster
writeRaster(pred_raster, "~/Documents/curso_rf/output_class.tif") # Save the output raster as .tif