# WIP json-to-graph-parser
A parser that takes a json and generates insert commands for common graph databases.

Right now it has strategies for Cayley and OrientDB. Taking the following JSON as an example input format:

```json
{
  "a":"b",
  "c":["d","e","f"],
  "g":{
    "h":"i",
    "j":[
      {
        "k":"l"
      }
    ]
  }
}
```

## Cayley
In Cayley, the previous JSON will generate a vertex for every key and value and relation them in an expected format. For example an array like `c` will have out edges to `d`, `e` and `f`:
```bash
<origin> <has> <a> .
<a> <has> <b> .
<origin> <has> <c> .
<c> <has> <d> .
<c> <has> <e> .
<c> <has> <f> .
<origin> <has> <g> .
<g> <has> <h> .
<h> <has> <i> .
<g> <has> <j> .
<j> <has> <k> .
<k> <has> <l> .
```
"Origin" root node name and predicate name can be changed.

## OrientDB
A working solution for OrientDB that works similar to Cayley can also be reproduce. It will prefix the info needed to use with the `console` command line tool that comes with OrientDB.

```bash
CREATE VERTEX V SET name='origin';
CREATE VERTEX V SET name='a';
CREATE EDGE has FROM (SELECT FROM V WHERE name='origin') TO (SELECT FROM V WHERE name='a');
CREATE VERTEX V SET name='b';
CREATE EDGE has FROM (SELECT FROM V WHERE name='a') TO (SELECT FROM V WHERE name='b');
CREATE VERTEX V SET name='c';
CREATE VERTEX V SET name='d';
CREATE VERTEX V SET name='e';
CREATE VERTEX V SET name='f';
CREATE EDGE has FROM (SELECT FROM V WHERE name='c') TO (SELECT FROM V WHERE name='d');
CREATE EDGE has FROM (SELECT FROM V WHERE name='c') TO (SELECT FROM V WHERE name='e');
CREATE EDGE has FROM (SELECT FROM V WHERE name='c') TO (SELECT FROM V WHERE name='f');
... and so on and so for
```
