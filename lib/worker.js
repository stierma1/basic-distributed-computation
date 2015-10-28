"use strict"
var EE = require("events").EventEmitter;

class Worker extends EE{
  constructor(path, parent){
    super();
    this.path = path;
    this.parent = parent;
    this.on("work", (req) => {
      this.work(req);
    });
    this.on("post-work", (req) => {
      this.postWork(req);
    });
    this.on("return-to-application-manager", (req) => {
      this.returnToApplication(req);
    });
    this.on("get-path", (handler) => {
      handler(this.path);
    })
  }

  work(){
    throw new Error("Not Implemented");
  }

  postWork(req){
    req.next();
  }

  returnToApplication(req){
    req.currentIdx++;
    this.parent.emit("send-to-application-manager",req.origination, req);
  }

}

module.exports = Worker;
