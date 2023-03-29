var ee = require('@google/earthengine');


module.exports = {
    getRockOutcrop: async(req, res) => {

        var assetAfl = 'users/jailson/mapbiomas/afloramento_theme';
        var assetAmz = 'projects/mapbiomas-workspace/AUXILIAR/biomas-2019';
      
        var amzBiome = ee.FeatureCollection(assetAmz).filter(ee.Filter.eq('Bioma', 'Amazônia')); 
        var afl = ee.ImageCollection(assetAfl);
            afl = afl.toBands()
            afl = afl.unmask(0)
      
        var freqAfl = afl.reduce(ee.Reducer.sum()).rename('freq').clip(amzBiome);
      
        /**
         * rock outcrop mask 
        */
      
        var thres = 10
      
        var rockMask = freqAfl.where(freqAfl.lt(thres), 0).selfMask();
      
        // vis param
        var visAfl = {
          min:0,
          max:35,
          palette:["042333","2c3395","744992","b15f82","eb7958","fbb43d","e8fa5b"],
          bands:['freq']
        }
      
        rockMask = rockMask.visualize(visAfl);
        
        var urlRock = rockMask.getMap()['urlFormat']

        console.log(urlRock)

        res.render('index.ejs', {urlRock:urlRock})
      
    }
}

