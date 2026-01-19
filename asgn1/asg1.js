// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform float u_Size;

  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor; // uniform変数
  void main() {
    gl_FragColor = u_FragColor;
  }`

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL(){
    // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  //gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }

}
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
//globals for UI
let g_selectedColor = [1.0,1.0,1.0,1.0];
let g_selectedSize = 5;
let g_selectedType=POINT;

function addActionsForHtmlUI () {
  //button
  document.getElementById('green').onclick = function() {g_selectedColor = [0.0, 1.0,0.0,1.0]; };
  document.getElementById('red').onclick = function() {g_selectedColor = [1.0, 0.0,0.0,1.0]; };
  document.getElementById('clearButton').onclick = function() {g_shapesList=[]; renderAllShapes();};

  document.getElementById('pointButton').onclick = function() {g_selectedType=POINT};
  document.getElementById('triButton').onclick = function() {g_selectedType=TRIANGLE};
  document.getElementById('circleButton').onclick = function() {g_selectedType=CIRCLE};
  document.getElementById('drawFruitButton').onclick = function() {
  drawFruitScene();
};
  //slider
  document.getElementById('redSlide').addEventListener('mouseup', function() {g_selectedColor[0] = this.value/100;});
  document.getElementById('greenSlide').addEventListener('mouseup', function() {g_selectedColor[1] = this.value/100;});
  document.getElementById('blueSlide').addEventListener('mouseup', function() {g_selectedColor[2] = this.value/100;});

  document.getElementById('sizeSlide').addEventListener('mouseup', function() {g_selectedSize = this.value;});

  //GALLARY 
  document.getElementById('saveButton').onclick = function() {
    renderAllShapes();

    const img = new Image();
    img.src = canvas.toDataURL("image/png");
    img.style.width = "120px";
    img.style.border = "1px solid #fff";
    img.style.margin = "6px";
    img.style.display = "inline-block";

    //frame
    img.style.border = "4px solid gold";
    img.style.padding = "4px";
    img.style.background = "#c69c3a";
    img.style.borderRadius = "6px";
    
    document.getElementById("gallery").appendChild(img);
};

}


function main() {

  setupWebGL()
  connectVariablesToGLSL()
  addActionsForHtmlUI()

  
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  //canvas.onmousemove = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) {click(ev)}};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}




var g_shapesList = [];

//var g_points = [];  // The array for the position of a mouse press
//var g_colors = [];  // The array to store the color of a point
//var g_sizes = [];


function click(ev) {
  
  let [x,y] = convertCoordinatesEventToGL(ev);
  // Store the coordinates to g_points array
 // g_points.push([x, y]);
  
  let point;
  if (g_selectedType===POINT) {
    point = new Point();
  } else if (g_selectedType===TRIANGLE) {
    point = new Triangle();
  } else {
    point = new Circle();
  }
  
  point.position=[x,y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);

  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x,y]);
}

function renderAllShapes(){
  var startTime = performance.now();
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  var len = g_shapesList.length;

  for(var i = 0; i < len; i++) {
    //had to fix bug with gpt
    g_shapesList[i].render();
  }

  var duration = performance.now() - startTime;
  sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps:" + Math.floor(10000/duration)/10, "numdot");

}

function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}


/////----------------------------------


//used gpt for help undestand tthe start and adding const
function drawFruitScene() {

  
  const addTri = (x, y, size, color) => {
    let t = new Triangle();
    t.position = [x, y];
    t.size = size;
    t.color = color;
    g_shapesList.push(t);
  };


    const SKY = [0.53, 0.81, 0.92, 1.0];
 
     addTri(-1.0, -1.0, 800, SKY);



  const eyes = 10;

  const RED   = [1, 0, 0, 1];
  const BROWN = [0.4, 0.2, 0, 1];
  const GREEN = [0, 0.7, 0.2, 1];
    const YELLOW = [1.0, 0.9, 0.2, 1];
  const DARKBROWN = [0.3, 0.15, 0.0, 1];


  //APPLEEEEEEEEE
  addTri(-0.16, -0.16, 130, RED);
  addTri(-0.03, -0.03, 130, RED);

  //stem
  addTri(-0.01, 0.08, 45, BROWN);
  addTri(-0.01, 0.14, 45, BROWN);

  // leaf
  addTri(0.03, 0.14, 55, GREEN);


  //eyes
    addTri(0.03, 0.00, eyes, DARKBROWN);
  addTri(0.1, 0.0, eyes, DARKBROWN);


// BANNANANANA
  addTri(0.22, -0.08, 60, YELLOW);
  addTri(0.26, -0.07, 60, YELLOW);
  addTri(0.30, -0.06, 60, YELLOW);
  addTri(0.34, -0.04, 60, YELLOW);
  addTri(0.38, -0.02, 60, YELLOW);
  addTri(0.42,  0.00, 60, YELLOW);
  addTri(0.46,  0.02, 60, YELLOW);
  addTri(0.50,  0.04, 60, YELLOW);

  addTri(0.5, 0.1, eyes, DARKBROWN);
  addTri(0.4, 0.1, eyes, DARKBROWN);

  // Banana tip
  addTri(0.62, 0.16, 30, DARKBROWN);

  // GRAPESSSSSS
  const GRAPE = [0.2, 0.7, 0.3, 1];
  const gSize = 40;


  addTri(-0.78, -0.62, gSize, GRAPE);
  addTri(-0.68, -0.62, gSize, GRAPE);
  addTri(-0.68, -0.52, eyes, DARKBROWN);
  addTri(-0.61, -0.52, eyes, DARKBROWN);
  addTri(-0.58, -0.62, gSize, GRAPE);

  addTri(-0.78, -0.50, gSize, GRAPE);
  addTri(-0.68, -0.50, gSize, GRAPE);
  addTri(-0.58, -0.50, gSize, GRAPE);

  // stem on top 
  addTri(-0.68, -0.40, 25, BROWN);

  renderAllShapes();
}

