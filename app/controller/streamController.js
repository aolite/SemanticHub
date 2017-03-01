"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rx");
var source = Rx.Observable.interval(1000).take(9)
    .map(function (i) { return ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][i]; });
var stream = new Rx.Subject();
function getReactiveStream(req, res) {
    res.setHeader("content-type", "text/plaincl");
    source.subscribe(function (x) {
        console.log('Next:' + x);
        res.write(JSON.stringify({ info: 'Users found successfully', data: '' + x }));
    }, function (err) {
        console.log('Error:' + err);
        res.write({ info: 'Users found Error', data: '' + err });
    }, function () {
        console.log('Completed');
        res.end("End");
    });
}
exports.getReactiveStream = getReactiveStream;
//# sourceMappingURL=streamController.js.map