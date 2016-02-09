module.exports = {
  add: function(s, p, o){
    if(p === null){
      console.log("<" + s + "> <has> <" + o + "> .");
    } else {
      console.log("<" + s + "> " + p + " <" + o + "> .");
    }
  },

  finish: function(){
    //finish
  }
}
