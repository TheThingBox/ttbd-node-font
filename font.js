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
    var fonts = [
      {
        "font": {
          "name": "Arial",
          "value": 'arial'
        },
        "types": [
          { "name": "Classic", "value": "" },
          { "name": "Bold", "value": "bd" },
          { "name": "Italic", "value": "i" },
          { "name": "Bold italic", "value": "bi" }
        ]
      },
      {
        "font": {
          "name": "Roboto",
          "value": 'Roboto'
        },
        "types": [
          { "name": "Classic", "value": "-Regular" },
          { "name": "Bold", "value": "-Bold" },
          { "name": "Italic", "value": "-Italic" },
          { "name": "Light", "value": "-Light" }
        ]
      },
      {
        "font": {
          "name": "Times",
          "value": 'times'
        },
        "types": [
          { "name": "Classic", "value": "" },
          { "name": "Bold", "value": "bd" },
          { "name": "Italic", "value": "i" },
          { "name": "Bold italic", "value": "bi" }
        ]
      },
      {
        "font": {
          "name": "Ubuntu",
          "value": 'Ubuntu'
        },
        "types": [
          { "name": "Classic", "value": "-C" }
        ]
      }
    ]
    res.status(200).json({ fonts: fonts });
  })
}
