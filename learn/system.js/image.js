/*
    Image plugin
*/
exports.build = false;
exports.fetch = function(load){
    return new Promise(function(resolve, reject){
        var img = load.metadata.img = new Image();
        img.onerror = reject;
        img.onload = function(){
            try {
                delete img.onload;
            } catch(err) {
                img.onload = function(){}; // IE7
            }
            resolve('');
        }
        img.src = load.address;
    });
};

exports.instantiate = function(load) {
    return load.metadata.img;
};
