const e = require('express');
const {List} = require('../models/list.js');
const {User} = require('../models/user.js');

module.exports = function (router) {

    var listRoute = router.route("/lists");

    var specRoute = router.route("/lists/:id");
      
    listRoute.get(async function (req, res) {
        var where = req.query.where;
        if (where) {
            try {
                where = JSON.parse(where);
            } catch (error) {
                res.status(404);
                res.json({message: "Invalid GET request", data: []});
            }
        }
        var select = req.query.select;
        if (select) {
            select = JSON.parse(select);
        }

        var sort = req.query.sort;
        if (sort) {
            sort = JSON.parse(sort);
        }

        var skip = parseInt(req.query.skip);
        var limit = 100;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        } 
        var lists = await List.find(where, select, {skip: skip, limit: limit}).sort(sort);

        var count = req.query.count;
        var num_lists = await lists.length;
        if (count === "true") {
            res.status(200);
            res.json({message: "OK", data: num_lists});
        } else {
            res.status(200);
            res.json({message: "List(s) Found", data: lists});
        }
        //res.json({message: limit});
    });
    
    //https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
    listRoute.post(async function(req, res) {
        var date = new Date();
        
        var name = "newlist";
        if (req.body.name) {
            name = req.body.name;
        }

        var owner = req.body.owner;

        var items = [];
        if (req.body.items) {
            items.push(req.body.items);
        } 

        if (typeof(owner) === 'string') {
            // If we're passing a string into the owner param,
            // grab the ObjectId
            const user = await User.findOne({ username: owner });
            owner = user._id;
        }

        var list = new List({name: name, owner: owner, items: items});

        await list.save();

        var actualowner = await User.findById(owner);
        var ownerlist = actualowner.lists;
        ownerlist.push(list._id);
        await User.findByIdAndUpdate(owner, {lists: ownerlist});

        res.status(200);
        res.json({message: "List created", data: list});
    });
    
    specRoute.get(async function (req, res) {
        //const byteSize = str => new Blob([str]).size;
        var reqid = req.params.id.toString();
        try {
            await List.find({_id: reqid}, function(err, list) {
                if (!err) {
                    if (!list.length) {
                        res.status(404);
                        res.json({message: "Task not Found", data: []});
                    } else {
                        res.status(200);
                        res.json({message: "Task Found", data: list[0]});
                    }
                }
            });
        } catch (error) {
            res.status(404);
            res.json({message: "Task not Found", data: []});
        }
    });

    //https://coursework.vschool.io/mongoose-crud/
    specRoute.put(async function (req, res) {
        var reqid = req.params.id.toString();
        var list = await List.findById(reqid);

        var name = ""
        if (req.body.name) {
            name = req.body.name;
        } else {
            name = list.name;
        }

        var items = list.items;
        if (req.body.item) {
            console.log(req.body.item);
            items.push(req.body.item);
        }

        if (req.body.deleteditem) {
            const index = items.indexOf(req.body.deleteditem);
            items.splice(index, 1);
        }

        // Get rid of duplicates, just in case.
        items = [...new Set(items)];

        await List.findByIdAndUpdate(reqid, {name: name, items: items});
        var newuser = await List.findById(reqid);
        res.status(200);
        res.json({message: "User changed", data: newuser});
    });

    specRoute.delete(async function (req, res) {
        //const byteSize = str => new Blob([str]).size;
        var reqid = req.params.id.toString();
        try {
            var list = await List.findById(reqid);

            var actualowner = await User.findById(list.owner);
            var ownerlist = actualowner.lists;
            var index = ownerlist.indexOf(list._id);
            ownerlist.splice(index, 1);
            await User.findByIdAndUpdate(list.owner, {lists: ownerlist});

            await List.findByIdAndDelete(reqid);
            res.status(200);
            res.json({message: "Task Deleted", data: []});
        } catch (error) {
            res.status(404);
            res.json({message: "Task not Found", data: []});
        }
    });

    listRoute.delete(async function (req, res) {
        await List.remove();
        res.status(200);
        res.json({message: "All lists deleted"});
    });
    
    return router;
}