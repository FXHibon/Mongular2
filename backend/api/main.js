/**
 * Created by fx on 10/11/15.
 */



module.exports.getDbs = function (req, resp) {
    var dbs = [];
    for (var i = 0; i < 10; i++) {
        dbs.push({name: 'DB ' + i});
    }
    resp.end(JSON.stringify(dbs));
};

