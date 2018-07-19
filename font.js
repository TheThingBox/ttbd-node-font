module.exports = function(RED) {
  "use strict";
  var path = require("path");
  const fontPath = require('./package.json').fontsLib
  const font = require(path.join(__dirname, fontPath))

  function tsa_font(n) {
    RED.nodes.createNode(this, n);
    this.font = n.font;
    this.font_type = n.font_type
    var node = this;

    this.on("input", function(msg) {
      msg.font = node.font + (node.font_type || "");
      node.send(msg);
    });
  }
  RED.nodes.registerType("tsa_font", tsa_font);

  RED.httpAdmin.get("/font/list", function(req, res) {
    font.get(fonts => {
      res.status(200).json({ fonts: fonts });
    })
  })
}
