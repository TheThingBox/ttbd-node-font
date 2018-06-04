module.exports = function(RED) {
  "use strict";

  function tsa_font(n) {
    RED.nodes.createNode(this, n);
    this.font = n.font;
    this.font_type = n.font_type
    var node = this;

    this.on("input", function(msg) {
      msg.font = node.font + (this.font_type || "");
      node.send(msg);
    });
  }
  RED.nodes.registerType("tsa_font", tsa_font);

  RED.httpAdmin.get("/font/list", function(req, res) {
    var fonts = {
      "arial": {
        "Classic": "",
        "Bold": "bd",
        "Italic": "i",
        "Bold italic": "bi"
      },
      "Roboto": {
        "Classic": "-Regular",
        "Bold": "-Bold",
        "Italic": "-Italic",
        "Light": "-Light"
      },
      "Times": {
        "Classic": "",
        "Bold": "bd",
        "Italic": "i",
        "Bold italic": "bi"
      },
      "Ubuntu": {
        "Classic": "-C",
      }
    }
    res.status(200).json({ fonts: fonts });
  })
}
