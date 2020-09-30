library(raster)
library(sf)

r <- stack("Documents/lulc_ml_methods_course/exercices/data/mosaic_clip.tif")  # Load raster
v <- read_sf("Documents/lulc_ml_methods_course/exercices/data/input_samples.shp") # Load shapefile

r_subset <- r[[c(2,3,4,5,6,7)]] # Select just the bands that i want
# names(r_subset) <- c("B2", "B3", "B4", "B5", "B6", "B7") # Rename it (optional)
r_vals_extract <- extract(r_subset, v)  # extract values from rasters using the shapefile points
vals_table <- cbind(v, r_vals_extract) # create the final table with the values extracted and the class column

st_write(vals_table, "Documents/lulc_ml_methods_course/exercices/data/samples_final.shp")
