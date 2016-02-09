var messagesToPrint = [];
var triplets = [];
var edgePrefix = "has_";

module.exports = {
  host: null,
  db_name: null,
  username: null,
  password: null,

  init:function(host, db_name, username, password){
    if (host === undefined || db_name === undefined || username === undefined || password === undefined){
      console.log("You must call init function in Orientdb with the following parameters:\nhost, db_name, username and password");
      process.exit(1)
    } else {
      this.host = host;
      this.db_name = db_name;
      this.username = username;
      this.password = password;

      //TODO Create all needed classes 'has' class

      messagesToPrint.push("connect remote://" + host + "/" + db_name + " " + username + " " + password + ";");
      messagesToPrint.push("SET ignoreErrors TRUE;");
    }

  },

  add: function(s, p, o){
    if (p === null){
      triplets.push([s, "son", o]);
    } else {
      triplets.push([s, p, o]);
    }
  },

  finish: function(){

    messagesToPrint.forEach(function(m){
      process.stdout.write(m);
    });

    //create vertices classes
    // var classes = triplets.map(function(t){
    //   return t[1];
    // });
    //
    // //remove duplicates
    // classes.filter(function(item, pos){
    //   return classes.indexOf(item) == pos;
    // }).forEach(function(c){
    //   process.stdout.write(orientCreateClass(c, "V"));
    //   process.stdout.write(orientCreateClass(edgePrefix + c, "E"));
    // });

    //create vertices
    var res = triplets.map(function(t){
      return [ t[0], t[2] ];
    }).reduce(function(a, b){
      return a.concat(b);
    });


    //remove duplicates
    res.filter(function(item, pos) {
      var i = res.indexOf(item);
      return i === pos;
    }).forEach(function(s){
      process.stdout.write(orientCreateVertex(s, "V"));
    });

    //create edges
    triplets.map(function(t){
      process.stdout.write(orientCreateEdge(t[0], t[1], t[2]));
    });
  }
}

/**
  * @param n: name of the class
  */
function orientCreateClass(n, e){
  return "CREATE CLASS " + n + " EXTENDS " + e + ";"
}

function orientCreateVertex (o, vType){
  return "CREATE VERTEX " + vType + " SET name='" + o + "';";
}

function orientCreateEdge(s, p, o){
  return "CREATE EDGE " + p + " FROM (SELECT FROM V WHERE name='" + s + "') TO (SELECT FROM V WHERE name='" + o + "');";
}
