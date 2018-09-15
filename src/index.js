console.log('loaded');
var $ = require("jquery");

$.getJSON("./data.json", function(data) {
    console.log(data);
});