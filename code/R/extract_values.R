library(raster)
library(sf)

r <- stack("Documents/curso_rf/mosaic.tif")  # Load raster
v <- read_sf("Documents/curso_rf/amostras_2.shp") # Load shapefile

r_subset <- r[[c(2,3,4,5,6,7)]] # Select just the bands that i want
# names(r_subset) <- c("B2", "B3", "B4", "B5", "B6", "B7") # Rename it (optional)
r_vals_extract <- extract(r_subset, v)  # extract values from rasters using the shapefile points
vals_table <- cbind(v, r_vals_extract) # create the final table with the values extracted and the class column

st_write(vals_table, "Documents/curso_rf/samples_final.shp")
