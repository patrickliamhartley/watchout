// start slingin' some d3 here.

var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');
var gameboard = svg.append('g');
console.log(gameboard);

class Asteroids {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  changeLocation(xSize, ySize) {
    this.x = Math.random * xSize;
    this.y = Math.random * ySize;
  }
}

var asteroids = [];

for (var i = 0; i < 10; i++) {
  asteroids.push(new Asteroids(Math.random() * 400 + 50, Math.random() * 400 + 50));
}

var update = function(asteroids) {
  // var trans = d3.transition().duration(1);

  var selection = gameboard.selectAll('svg').data(asteroids, function(d) { return d; });

  console.log(selection);

  selection.enter()
    .append("svg:image")
    .attr("class", "asteroids")
    .attr('width', 30)
    .attr('height', 30)
    //.attr('r', 20)
    .attr('xlink:href', 'asteroid.png')
    // .attr("dy", ".35em")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });
    

  selection.exit()
    .remove();
};

update(asteroids);