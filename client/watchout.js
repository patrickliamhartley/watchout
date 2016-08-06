// start slingin' some d3 here.

var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');
var gameboard = svg.append('g');
console.log(gameboard);

class Asteroids {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
  changeLocation() {
    this.x = Math.random() * 400 + 50;
    this.y = Math.random() * 400 + 50;
  }
}

class Player {
  constructor() {
    this.x = 250;
    this.y = 250;
  }
}
var player = [new Player];


var asteroids = [];

for (var i = 0; i < 10; i++) {
  asteroids.push(new Asteroids(i, Math.random() * 400 + 50, Math.random() * 400 + 50));
}

var currentScore = 0;

var scoring = function() {
  currentScore++;
  d3.selectAll('.current').select('span').text(currentScore);
};

var createPlayer = function() {

  gameboard.data(player)
    .append('circle')
    .attr('r', 15)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
};


//collisions
// var simulation = d3.forceSimulation([player,asteroids])
//     .velocityDecay(0.2)
//     .force("x", d3.forceX().strength(0.002))
//     .force("y", d3.forceY().strength(0.002))
//     .force("collide", d3.forceCollide(10))
//     .on("tick", ticked);





///drag and drop controls///
var ticked = function(){
  console.log("collision detected");
};

var dragstarted = function(d) {
  d3.select(this).classed("dragging", true);
};

var dragged = function (d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
};

var dragended = function(d) {
  d3.select(this).classed("dragging", false);
};



var update = function(asteroids) {
  var trans = d3.transition().duration(900);

  var selection = gameboard.selectAll(".asteroids").data(asteroids, function(d) { return d.id; });

  console.log(selection);

  selection
    .transition(trans)
    .attr('x', function(d) { d.changeLocation(); return d.x; })
    .attr('y', function(d) { return d.y; });


  selection.enter()
    .append("svg:image")
    .attr("class", "asteroids")
    .attr('width', 30)
    .attr('height', 30)
    .attr('r', 20)
    .attr('xlink:href', 'asteroid.png')
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });
    

  selection.exit()
    .remove();
};

update(asteroids);
createPlayer();
d3.interval(function() {
  scoring();
}, 50);
d3.interval(function() {
  console.log("updating");
  update(asteroids);
}, 1000);

