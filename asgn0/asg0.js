// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('cnv1');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color

  const v1 = new Vector3([2.25, 2.25, 0]);

  drawVector(ctx, v1, "red");
}

function drawVector(ctx, v, color) {
  const scale = 20;
  const orgX = 200;
  const orgY = 200;

  const x = v.elements[0] * scale;
  const y = v.elements[1] * scale;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.moveTo(orgX, orgY);

  ctx.lineTo(orgX + x, orgY - y);

  ctx.stroke();
}

function handleDrawEvent() {
  var canvas = document.getElementById('cnv1');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  const x1 = parseFloat(document.getElementById("v1x").value);
  const y1 = parseFloat(document.getElementById("v1y").value);
  const v1 = new Vector3([x1,y1, 0]);

  const x2 = parseFloat(document.getElementById("v2x").value);
  const y2 = parseFloat(document.getElementById("v2y").value);
  const v2 = new Vector3([x2,y2, 0]);



  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");



}



function angleBetween(v1, v2) {
  const d = Vector3.dot(v1, v2);
  const m1 = v1.magnitude();
  const m2 = v2.magnitude();
  const angle = Math.acos(d/(m1*m2)) * 180 / Math.PI;
  console.log("Angle:", angle);
}

function areaTriangle(v1, v2) {
  const c = Vector3.cross(v1, v2);
  const area = c.magnitude() / 2;
  console.log("Area:", area);
}



function handleDrawOperationEvent() {
  var canvas = document.getElementById('cnv1');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  const x1 = parseFloat(document.getElementById("v1x").value);
  const y1 = parseFloat(document.getElementById("v1y").value);
  const v1 = new Vector3([x1,y1, 0]);
  drawVector(ctx, v1, "red");

  const x2 = parseFloat(document.getElementById("v2x").value);
  const y2 = parseFloat(document.getElementById("v2y").value);
  const v2 = new Vector3([x2,y2, 0]);
  drawVector(ctx, v2, "blue");

  const op = document.getElementById("operation").value;
  const s = parseFloat(document.getElementById("scalar").value);

  if (op === "add") {
    const v3 = new Vector3(v1.elements);
    v3.add(v2);
    drawVector(ctx, v3, "green");
  }

  if (op === "sub") {
    const v3 = new Vector3(v1.elements);
    v3.sub(v2);
    drawVector(ctx, v3, "green");
  }
  
  if (op === "mul") {
    const v3 = new Vector3(v1.elements);
    v3.mul(s);
    drawVector(ctx, v3, "green");

    const v4 = new Vector3(v2.elements);
    v4.mul(s);
    drawVector(ctx, v4, "green");
  }
  
  if (op === "div") {
    const v3 = new Vector3(v1.elements);
    v3.div(s);
    drawVector(ctx, v3, "green");

    const v4 = new Vector3(v2.elements);
    v4.div(s);
    drawVector(ctx, v4, "green");
  }

  if (op === "mag") {
    console.log("Magnitude v1:", v1.magnitude());
    console.log("Magnitude v2:", v2.magnitude());
  }

  if (op === "norm") {
    console.log("Magnitude v1:", v1.magnitude());
    console.log("Magnitude v2:", v2.magnitude());

    const nv1 = new Vector3(v1.elements);
    const nv2 = new Vector3(v2.elements);

    nv1.normalize();
    nv2.normalize();

    drawVector(ctx, nv1, "green");
    drawVector(ctx, nv2, "green");

    
  }
  if (op === "angle") {
      angleBetween(v1, v2);
    }

    if (op === "area") {
      areaTriangle(v1, v2);
    }
}