
var scene = new Scene(root, {"width":800, "height":600});
var rnd = new Rnd(45);

// for (var i = 0; i < 400; i++)
// {
//   var mask = new Rect({x:rnd.val(800), y:rnd.val(600), width:30, height:30, rx:5, ry:5}, {fill:"white"});
//   scene.addMask("masked", mask);
//   scene.add(mask.clone().sty("fill", "#f0e9a4"));
// }
//
// for (var i = 0; i < 300; i++)
// {
//   var masked = new Rect({x:rnd.val(800), y:rnd.val(600), width:60, height:40, rx:5, ry:5, "mask":"url(#masked)"},
//                         {fill:"#eddc32", "stroke":"grey", "stroke-width":"2px"});
//   scene.add(masked.clone().removeAttr("mask").sty("fill", "#f0e9a4").sty("stroke", "white").sty("stroke-width", "2px"));
//   scene.add(masked);
// }

var points = Layout.Grid ({xrows: 10, yrows:10,  width:800, height: 600});
points = Layout.Rossler ({
  a: 0.24, b: 0.1, c: 7, h: 0.05,
  points: 2000,
  x0: 350, y0: 350,
  scale: 20,
  width:800,
  height:600
});

points.forEach (function (point)
{
  var rect = new Rect ({width:15+rnd.val(10), height:15+rnd.val(5)},
                         {fill: rnd.pick(["#f0b607","#c4cc33","#eb9008"]), stroke:"#2a240f", "stroke-width":rnd.pick(["0px", "2px", "1px"]), opacity:rnd.pick([0.3,0.6,1])})
      .rot(rnd.pick([10,45]))
      .moveTo(point, 0, rnd.pick([4,16,-3]));
  scene.add (rect);
});

//console.log(D3.scale.linear().domain([1, 10]).range(["#000000","#FFFFFF"])(6));

return scene.exportContent();
