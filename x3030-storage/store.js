var redis = require('redis');
var fs = require('fs');
var client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

fs.readFile('../x3030-generator/mazes.json', 'utf8', function (err,data) {
	if (err) {
    	return console.log(err);
    }

    maze_data = JSON.parse(data);
    
    for (var id in maze_data) {
		if (maze_data.hasOwnProperty(id)) {
			client.set(id, JSON.stringify(maze_data[id]));
		};
	}
});
