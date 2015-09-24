var maze_data = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0],[0,0,0,1,0,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,1,0,1,0,0,0,1,1,0,0,1,0,1,1,1,1,0,0,1,0,1,1,0,0,1,0,1,0],[0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0],[0,1,1,0,0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,1,1,0,0,1,0,1,1,1,0,1,1,0,0,1,0,0,0,1,1,0,0,1,0,1,1,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],[0,0,0,1,1,0,0,0,0,1,0,1,0,1,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0],[0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],[0,0,0,1,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,0,1,0,1,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,0,1,1,0,0,1,0],[0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0],[0,0,0,1,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,0],[0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

var door_image = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f6aa.png?v5';
var bear_image = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f43b.png?v5';
var tree_image = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f332.png?v5';
var home_image = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e0.png?v5';
var wall_image = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f6a7.png?v5';
var pot_image = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f36f.png?v5';

var good_url = 'http://pravj.github.io/blog';
var bad_url = 'http://example.org/%%30%30';

var width = 49;
var height = 13;

var generate_board = function() {
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			if ((i == 0) || (i == height - 1) || (j == 0) || (j == width - 1)) {
				// fence rectangle
				$('#' + (width*i + j) + ' a img').attr('src', wall_image);
				$('#' + (width*i + j) + ' a').attr('href', bad_url);
			} else {
				// building
				if (maze_data[i][j] == 0) {
					$('#' + (width*i + j) + ' a img').attr('src', home_image);
					$('#' + (width*i + j) + ' a').attr('href', bad_url);
				} else{
					// tree path
					$('#' + (width*i + j) + ' a img').attr('src', tree_image);
					$('#' + (width*i + j) + ' a').attr('href', good_url);
				};
			}
		}
	}

	// add the door for entry
	$('#' + width + ' a img').attr('src', door_image);
	$('#' + width + ' a').attr('href', good_url);

	// add the door for exit
	$('#' + ((height-2)*width + width-1) + ' a img').attr('src', door_image);
	$('#' + ((height-2)*width + width-1) + ' a').attr('href', good_url);

	// add the bear
	$('#' + (width + 1) + ' a img').attr('src', bear_image);
	$('#' + (width + 1) + ' a').attr('href', good_url);

	// add the honeypot
	$('#' + ((height-2)*width + width-2) + ' a img').attr('src', pot_image);
	$('#' + ((height-2)*width + width-2) + ' a').attr('href', good_url);

	// terminal elements
	$('#' + ((height-2)*width + width-1) + ' a').attr('class', 'exit');
	$('#' + ((height-3)*width + width-2) + ' a').attr('class', 'exit-friend');
	$('#' + ((height-2)*width + width-3) + ' a').attr('class', 'exit-friend');
	$('#' + ((height-2)*width + width-2) + ' a').attr('class', 'pot');
};
$(window).load(generate_board);

$(document).ready(function() {
	var first, second, third;

	$('.init').click(function() {
		$('.flash').css('visibility', 'hidden');

		maze_data = mazes[Math.floor(Math.random() * 100)]
		generate_board();

		first = false;
		second = false;
		third = false;

		$('.exit-friend').mouseover(function(){
			first = true;
		});
		$('.pot').mouseover(function() {
			if (first) {
				second = true;
			};
		});
		$('.exit').mouseover(function() {
			if (first && second) {
				third = true;
				$('.flash').css('visibility', 'visible');
			};
		});
	});
});