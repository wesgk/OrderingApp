var fs=require("fs");module.exports.get=function(e,t){var n=fs.readFileSync("app/data/users/"+e.params.id+".json","utf8");t.setHeader("Content-Type","application/json");t.send(n)};module.exports.save=function(e,t){var n=e.body;fs.writeFileSync("app/data/users/"+e.params.id+".json",JSON.stringify(n));t.send(n)};module.exports.getAll=function(e,t){var n="app/data/users/",r=[];try{r=fs.readdirSync(n)}catch(i){t.send("[]");t.end("[]")}var s="[";for(var o=0;o<r.length;o++)r[o].indexOf(".json")==r[o].length-5&&(s+=fs.readFileSync(n+"/"+r[o])+",");s=s.substr(0,s.length-1);s+="]";t.setHeader("Content-Type","application/json");t.send(s);t.end()};module.exports.getNextId=function(e,t){var n="app/data/users/",r=[];try{r=fs.readdirSync(n)}catch(i){t.send("[]");t.end("[]")}fileNames=new Array;for(var s=0;s<r.length;s++)r[s].indexOf(".json")==r[s].length-5&&fileNames.push(r[s].substr(0,r[s].length-5));console.log("fileNames: "+fileNames);fileNames.sort(function(e,t){return t-e});console.log("files post: "+fileNames);var o="[";fileName=parseInt(fileNames[0])+1;o+=String(fileName);o+="]";t.setHeader("Content-Type","application/json");t.sendStatus(o);t.end()};