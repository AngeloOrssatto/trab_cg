let angle = degrees_to_radians(0);

let index = 0
let r = 0
let r2 = 0
let a = 0
let n = 0
let h = 0

function constructScene(){
  let aux = ''
  aux = document.getElementById('nSides').value
  n = parseFloat(aux)
  aux = document.getElementById('height').value
  h = parseFloat(aux)
  aux = document.getElementById('radius').value
  r = parseFloat(aux)
  aux = document.getElementById('radius2').value
  r2 = parseFloat(aux)
  console.log(n, h, r, r2)
  
  console.log('a ', a)
  a = 0
  while (a < 360) {
    console.log(a, index, cos(degrees_to_radians(a)), sin(degrees_to_radians(a)))
    points[index] = createVector(cos(degrees_to_radians(a))*r, sin(degrees_to_radians(a))*r, 0);
    index++
    a+=(360/n)
  } 
  a = 0
  while (a < 360) {
    console.log(a, index, cos(degrees_to_radians(a)), sin(degrees_to_radians(a)))
    points[index] = createVector(cos(degrees_to_radians(a))*r2, sin(degrees_to_radians(a))*r2, h);
    index++
    a+=(360/n)
  }
  console.log('pontos:', points)
}

function cleanScence() {
  index = 0
  r = 0
  r2 = 0
  a = 0
  n = 0
  h = 0
  points = []
}

let points = [];


function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

function setup() {
  createCanvas(1200, 900);
  
}


function draw() {
  background(0);
  translate(width / 2, height / 2);

  const rotationZ = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1]
  ];

  const rotationX = [
    [1, 0, 0],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)]
  ];

  const rotationY = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
  ];

  let projected = [];


  for (let i = 0; i < points.length; i++) {
    
    let rotated = matmul(rotationY, points[i]);
    // rotated = matmul(rotationX, rotated);
    // rotated = matmul(rotationZ, rotated);

    const distance = 5
    const z = 1/(distance-rotated.z)

    const projection = [
      [1, 0, 0],
      [0, 1, 0]
    ];

    let projected2d = matmul(projection, rotated);
    projected2d.mult(10);
    projected[i] = projected2d;
    //point(projected2d.x, projected2d.y);
    //angle+=0.0005
  }

  //console.log(projected)


  for (let i = 0; i < projected.length; i++) {
    stroke(255);
    strokeWeight(16);
    noFill();
    const v = projected[i];
    point(v.x, v.y);
  }

  //Connecting

  for(let i = 0; i < n; i++) {
    connect(i, (i+1)%n, projected)
    connect(i+n, ((i + 1) % n) + n, projected)
    connect(i, i+n, projected)
  }

  // connect(0, 1, projected)
  // connect(1, 2, projected)
  // connect(2, 0, projected)
  // connect(3, 4, projected)
  // connect(4, 5, projected)
  // connect(5, 3, projected)
  // connect(0, 3, projected)
  // connect(1, 4, projected)
  // connect(2, 5, projected)
  // for (let i = 0; i < 4; i++) {
  //   connect(i, (i + 1) % 4, projected);
  //   connect(i + 4, ((i + 1) % 4) + 4, projected);
  //   connect(i, i + 4, projected);
  // }

  //angle += 0.03;
}

function connect(i, j, points) {
  const a = points[i];
  const b = points[j];
  strokeWeight(1);
  stroke(255);
  line(a.x, a.y, b.x, b.y);
}