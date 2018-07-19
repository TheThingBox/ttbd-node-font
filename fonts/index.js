var fs = require("fs");
var path = require("path");

const fontDescriptionPath = path.join(__dirname, 'description.json')

let fonts = null;

function isObject(val) {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
}

function readFonts(done){
  let options = { encoding: "utf8" }
  if (typeof done !== 'function') {
    done = function(){};
  }
  fs.access(fontDescriptionPath, fs.constants.F_OK | fs.constants.R_OK, function(errAccess) {
    if(!errAccess){
      fs.readFile(fontDescriptionPath, options, function(errRead, data) {
        if (!errRead) {
          try{
            data = JSON.parse(data)
          } catch(e){}
          if(!Array.isArray(data)) {
            data = [data]
          }
          fonts = data.filter(e => isObject(e) && e.hasOwnProperty('font'))
        }
        done()
      })
    } else {
      done()
    }
  })
}

module.exports = {
  get: function(callback){
    if (typeof callback !== 'function') {
      return
    }
    if(fonts){
      callback(fonts);
    } else {
      readFonts( () => {
        callback(fonts);
      })
    }
  }
}
