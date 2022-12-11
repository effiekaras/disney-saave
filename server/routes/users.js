const {User} = require('../models/user.js');
const {List} = require('../models/list.js');
//var mongoose = require("mongoose");
//https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58
//https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58
//https://www.w3schools.com/js/js_json_parse.asp
module.exports = function (router) {

    var userRoute = router.route("/users");

    var specRoute = router.route("/users/:username");
    
    userRoute.get(async function (req, res) {
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
        var limit = parseInt(req.query.limit);
        var users  = await User.find(where, select, {skip: skip, limit: limit}).sort(sort);

        var count = req.query.count;
        var num_users = await users.length;
        if (count === "true") {
            res.status(200);
            res.json({message: "Count Found", data: num_users});
        } else {
            res.status(200);
            res.json({message: "User(s) Found", data: users});
        }
    });

    userRoute.post(async function(req, res) {
        var date = new Date();
        await User.countDocuments({username:{$eq: req.body.username}}, async function(err, count) {
            if (count === 0) {
                var user = new User({username: req.body.username, name: req.body.name, email: req.body.email, 
                    password: req.body.password, bio: "", avatar: "default", lists: [], following: [], followers: [],
                    data: date});
                await user.save();
                
                //create favorites list
                var list = new List({name: "Favorites", owner: user.username});
                list = await list.save();
                
                var userlists = user.lists;
                userlists.push(list._id);
                await User.findByIdAndUpdate(user._id, {lists: userlists});
                var actuallychangeduser = await User.findById(user._id);
                res.status(200);
                res.json({message: "User created", data: actuallychangeduser});
            } else {
                res.status(500);
                res.json({message: "Username already exists", data: []});
            }
        });
    });
    
    specRoute.get(async function (req, res) {
        //const byteSize = str => new Blob([str]).size;
        var username = req.params.username;
        try {
            await User.find({username: username}, function(err, user) {
                if (!err) {
                    if (!user.length) {
                        res.status(404);
                        res.json({message: "User not Found", data: []});
                    } else {
                        res.status(200);
                        res.json({message: "User Found", data: user});
                    }
                }
            });
        } catch (error) {
            res.status(404);
            res.json({message: "User not Found", data: []});
        }
    });

    //https://coursework.vschool.io/mongoose-crud/
    specRoute.put(async function (req, res) {
        var user = await User.find({username: req.params.username.toString()});

        var name = ""
        if (req.body.name) {
            name = req.body.name;
        } else {
            name = user[0].name;
        }

        var password = user[0].password;
        if (req.body.password) {
            password = req.body.password;
        }

        var bio = "";
        if (req.body.bio) {
            bio = req.body.bio;
        } else {
            bio = user[0].bio;
        }

        var avatar = "";
        if (req.body.avatar) {
            avatar = req.body.avatar;
        } else {
            avatar = user[0].avatar;
        }

        var following = [];
        if (req.body.following) {
            following = user[0].following;
            following.push(req.body.following);

            //await User.findByIdAndUpdate(user[0]._id, {following: following});

            var followeduser = await User.find({username: user[0].following.toString()});

            followeduser[0].followers.push(user[0].username);

            await User.findByIdAndUpdate(followeduser[0]._id, {followers: followeduser[0].followers.toString()});
        } else {
            following = user[0].following;
        }

        if (req.body.unfollowing) {
            following = user[0].following;
            var unfollowing = req.body.unfollowing;
            const index1 = user[0].following.indexOf(unfollowing);
            following.splice(index1, 1);

            var unfolloweduser = await User.find({username: unfollowing});

            const index = unfolloweduser[0].followers.indexOf(user[0].username);
            unfolloweduser[0].followers.splice(index, 1);

            await User.findByIdAndUpdate(unfolloweduser[0]._id, {followers: unfolloweduser[0].followers});
        } 

        var lists = [];
        if (req.body.lists) {
            lists = user[0].lists;
            lists.push(req.body.lists);
        } else {
            lists = user[0].lists;
        }

        if (req.body.deletedlist) {
            lists = user[0].lists;
            const index = lists.indexOf(req.body.deletedlist);
            lists.splice(index, 1);
        }


        await User.findByIdAndUpdate(user[0]._id, {name: name, password: password, bio: bio, avatar: avatar, following: following, lists: lists});
        var newuser = await User.findById(user[0]._id);
        res.status(200);
        res.json({message: "User updated", data: newuser});
    });

    specRoute.delete(async function (req, res) {
        //const byteSize = str => new Blob([str]).size;
        var requsername = req.params.username;
        try {
            var user = await User.find({username: requsername});
            if (user.length > 0) {
                await User.findByIdAndDelete(user[0]._id);
                res.status(200);
                res.json({message: "User Deleted", data: []});
            } else {
                throw "User not found";
            }
        } catch (error) {
            res.status(404);
            res.json({message: "User not Found", data: []});
        }
    });

    userRoute.delete(async function (req, res) {
        await User.remove();
        res.status(200);
        res.json({message: "All users deleted"});
    });
    

    return router;
}