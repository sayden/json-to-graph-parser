var DEBUG = true

module.exports = {
  parse: function(origin, o, printer, finishCallback){
    for(var k in o){
      if(o.hasOwnProperty(k)){

        // console.log("0:", origin, o, typeof origin, typeof o, Object.prototype.toString.call( o[k] ))
        if( Object.prototype.toString.call( o[k] ) === '[object Object]') {
          DEBUG ? console.log("1:", origin, k, o[k]) : null;
          if(isNumeric(k)){
            this.parse(origin, o[k], printer);
          } else {
            this.parse(origin, k, printer);
            this.parse(k, o[k], printer);
          }

        } else if(Object.prototype.toString.call( o[k] ) === '[object Array]') {
          DEBUG ? console.log("2:", origin, k, o[k]) : null;
          this.parse(origin, k, printer);
          for(var i = 0; i<o[k].length; i++){
            var temp = {};
            temp[0] = o[k][i];
            this.parse(k, temp, printer);
          }

        } else {
          //[object String]
          if(isNumeric(k)){
            DEBUG ? console.log("3.1:", origin, k, o[k], ", print:", origin, "has", o[k]) : null;
            printer(origin, "has", o[k]);
          } else {
            DEBUG ? console.log("3.2:", origin, k, o[k], ", print:", origin, "has", k, ",", k, "has", o[k]) : null;
            printer(origin, "has", k);
            printer(k, "has", o[k]);
          }
        }

      }
    }
    if (finishCallback !== undefined){
        finishCallback();
    }
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
