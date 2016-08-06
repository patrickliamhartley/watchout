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
var highscore = 0;

var scoring = function() {
  currentScore++;
  d3.selectAll('.current').select('span').text(currentScore);
};

var reset = function() {
  if (currentScore > highscore) {
    highscore = currentScore;
  }
  currentScore = 0;
  d3.selectAll('.highscore').select('span').text(highscore);
  d3.selectAll('.current').select('span').text(currentScore);
};

var collisions = 0;


var collide = function() {
  collisions++;
  d3.selectAll('.collisions').select('span').text(collisions);
};



var createPlayer = function() {

  gameboard.data(player)
    .append('circle')
    .attr('class','player')
    .attr('r', 15)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
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

// function isPointInPoly(poly, pt){
//   console.log(poly, pt);
//     for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
//         ((poly[i].__data__.y <= pt.y && pt.y < poly[j].__data__.y) || (poly[j].__data__.y <= pt.y && pt.y < poly[i].__data__.y))
//         && (pt.x < (poly[j].__data__.x - poly[i].__data__.x) * (pt.y - poly[i].__data__.y) / (poly[j].__data__.y - poly[i].__data__.y) + poly[i].__data__.x)
//         && (c = !c);
//     return c;
// }

var colDetect = function(ast, pl, padding) {
  var pad = 2 * padding;
  var test = false;
  console.log(ast);
  gameboard.selectAll(".asteroids").each( function (d) {
    if ((Math.sqrt((pl.x - d.x) * (pl.x - d.x) + (pl.y - d.y) * (pl.y - d.y))) <= pad) {
      test = true;
    }
  });
  return test;
 

};


var update = function(asteroids) {
  var trans = d3.transition().duration(900);

  var selection = gameboard.selectAll(".asteroids").data(asteroids, function(d) { return d.id; });

  console.log(selection);

  selection
    .transition(trans)
    .attr('cx', function(d) { d.changeLocation(); return d.x; })
    .attr('cy', function(d) { return d.y; });
    // .on("mouseenter",function(){
    //   console.log("mouseover");
    //   collide();
    // });




  selection.enter()
    .append("circle")
    .attr("class", "asteroids")
    // .attr('width', 30)
    // .attr('height', 30)
    .attr('r', 15)
    .attr('xlink:href', 'asteroid.png')
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
    

  selection.exit()
    .remove();


};




var selection = gameboard.selectAll(".asteroids");
update(asteroids);
createPlayer();
//isPointInPoly(selection._enter, player[0]);
d3.interval(function() {
  scoring();
  if (colDetect(selection, player[0], 15)) {
    reset();
    collide();
  }
  //console.log(isPointInPoly(selection.attr('x'), player[0]));
}, 100);
d3.interval(function() {
  console.log("updating");
  update(asteroids);
}, 2000);

