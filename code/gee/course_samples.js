var ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    rio_city = ee.FeatureCollection("users/elacerda/mun_rj"),
    roi = /* color: #98ff00 */ee.Geometry.Point([-43.26285773654947, -22.896399625820518]),
    forest = 
    /* color: #08ac24 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-43.481100687952576, -22.93307230003813]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.482130656214295, -22.919791805759]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.454664835901795, -22.93433704110714]),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.28520497437712, -22.954823133089366]),
            {
              "class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.29550465699431, -22.936802184817118]),
            {
              "class": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.25258931275603, -22.966835765168696]),
            {
              "class": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.262202349865404, -22.97600258216835]),
            {
              "class": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.22787007447478, -22.94660334906782]),
            {
              "class": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.469002989104446, -22.941023247606232]),
            {
              "class": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.44445541220015, -22.93801961660915]),
            {
              "class": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.46436813192671, -22.95319517503754]),
            {
              "class": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.45645151832786, -22.908221496220666]),
            {
              "class": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.51407757315993, -22.974823801713192]),
            {
              "class": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.52332262940455, -22.827137213379732]),
            {
              "class": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.51353793091822, -22.824763941090467]),
            {
              "class": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.4989467138772, -22.82951044429161]),
            {
              "class": 0,
              "system:index": "15"
            })]),
    water = 
    /* color: #186aff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-43.19124172411958, -22.84973389587595]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.187808496580516, -22.772515038704228]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.18643520556489, -22.74845432991601]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.15690944872895, -22.847202824377238]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.351723901297675, -23.024902885059188]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.2432339110633, -23.014791404305996]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.14504360344611, -22.99203780135137]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.15053676750861, -22.895292243174193]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.173196069266425, -22.85796667564472]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.39086269524299, -23.028062567292437]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.20919926973215, -22.967339847410155]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.2119458517634, -22.97334574086077]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.20748265596262, -22.976664672752236]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.212632497271215, -22.97682271509491]),
            {
              "class": 1,
              "system:index": "13"
            })]),
    urban = 
    /* color: #ff1d06 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-43.23556095263289, -22.91748288371655]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.24225574633406, -22.913846268918853]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.212386666744216, -22.911632629531425]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.274674871050664, -22.895934446885036]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.28823611982996, -22.897199534542562]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.30299899824793, -22.889925119415434]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.29125021590621, -22.875235426197317]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.356830664257195, -22.87060802465266]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.41433722553649, -22.879623198868686]),
            {
              "class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.413307257274774, -22.885158535562958]),
            {
              "class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.47690529080567, -22.871174685956017]),
            {
              "class": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.566855852329105, -22.891734649607862]),
            {
              "class": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.11121750023456, -22.903695673743776]),
            {
              "class": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.10177612450214, -22.902746904547392]),
            {
              "class": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.08993148949237, -22.915870955838667]),
            {
              "class": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.06511022991319, -22.93731734830057]),
            {
              "class": 2,
              "system:index": "15"
            })]);