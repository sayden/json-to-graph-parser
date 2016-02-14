module.exports = {
  parse: function(origin, o, printer, finishCallback){
    var self = this;
    for(var k in o){
      if(o.hasOwnProperty(k)){
        if( Object.prototype.toString.call( o[k] ) === '[object Object]') {
          // console.log("1:", origin, k, o[k])
          this.parse(origin, k, printer);
          this.parse(k, o[k], printer);

        } else if(Object.prototype.toString.call( o[k] ) === '[object Array]') {
          // console.log("2:", origin, k, o[k])
          this.parse(origin, k, printer);
          o[k].forEach(function(arObject){
            var temp = {};
            temp[k] = arObject;
            self.parse(k, arObject, printer);
          });

        } else {
          if(k == 0){
            // console.log("3.1:", origin, k, o[k], ", print:", origin, "has", o[k])
            printer(origin, "has", o[k]);
          } else {
            // console.log("3.2:", origin, k, o[k], ", print:", origin, "has", k, ",", k, "has", o[k])
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
