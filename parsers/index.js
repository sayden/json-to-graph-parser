module.exports = {
  parse: function(o, origin, printer, finishCallback){
    for(var k in o){
      if(o.hasOwnProperty(k)){
        if( Object.prototype.toString.call( o[k] ) === '[object Object]' ) {
          printer(origin, null, k);
          this.parse(o[k], k, printer);
        } else {
          if(o[k].toString().indexOf(",") != -1){
            o[k].forEach(function(i){
              printer(origin, k, i);
            })
          } else {
            printer(origin, k, o[k]);
          }
        }
      }
    }
    if (finishCallback !== undefined){
        finishCallback();
    }
  }
}
