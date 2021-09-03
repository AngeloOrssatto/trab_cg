let angle = degrees_to_radians(30);

let index = 0
let r = 0
let r2 = 0
let a = 0
let n = 0
let h = 0

let vrp = []
let p = []
let vecU = [1,1,1]
let vecV = []
let vecN = []

// MatrixSRU2SRC = [
//   [vecU[0], vecU[1], vecU[2], -prodEscalar(vrp, normalizaVetor(vecU))],
//   [vecV[0], vecV[1], vecV[2], -prodEscalar(vrp, normalizaVetor(vecV))],
//   [vecN[0], vecN[1], vecN[2], -prodEscalar(vrp, normalizaVetor(vecN))],
//   [0,0,0,1]
// ]


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

  aux = document.getElementById('xVRP').value
  vrp[0] = parseFloat(aux)
  aux = document.getElementById('yVRP').value
  vrp[1] = parseFloat(aux)
  aux = document.getElementById('zVRP').value
  vrp[2] = parseFloat(aux)

  aux = document.getElementById('xP').value
  p[0] = parseFloat(aux)
  aux = document.getElementById('yP').value
  p[1] = parseFloat(aux)
  aux = document.getElementById('zP').value
  p[2] = parseFloat(aux)

  console.log(vrp, p)
  a = 0
  while (a < 360) {
    points[index] = createVector(cos(degrees_to_radians(a))*r, 0, sin(degrees_to_radians(a))*r);
    //points[index] = [cos(degrees_to_radians(a))*r, sin(degrees_to_radians(a))*r, 0, 1];
    index++
    a+=(360/n)
  } 
  a = 0
  while (a < 360) {
    points[index] = createVector(cos(degrees_to_radians(a))*r2, h, sin(degrees_to_radians(a))*r2);
    //points[index] = [cos(degrees_to_radians(a))*r2, sin(degrees_to_radians(a))*r2, h, 1];
    index++
    a+=(360/n)
  }

  let N = subVector(vrp, p)
  vecN = normalizaVetor(N)

  let Y = [0,1,0]
  let V = prodEscalar(Y, vecN)
  V = multByScalar(vecN, V)
  V = subVector(Y, V)
  vecV = normalizaVetor(V)

  vecU = prodVetorial(vecV, vecN)

  console.log('n', vecN, 'v', vecV)

  MatrixSRU2SRC = [
    [vecU[0], vecV[0], vecN[0]],
    [vecU[1], vecV[1], vecN[1]],
    [vecU[2], vecV[2], vecN[2]],
    [-prodEscalar(vrp, vecU), -prodEscalar(vrp, vecV), -prodEscalar(vrp, vecN)]
  ]


  
  console.log('pontos:', points)
  console.log(MatrixSRU2SRC)
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
    
    let rotated = matmul(MatrixSRU2SRC, points[i])
    //rotated = matmul(rotationY, rotated);
    //rotated = matmul(rotationX, rotated);
    //let rotated = matmul(rotationZ, points[i]);

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
    angle+=0.0005
  }

  //console.log(projected)


  for (let i = 0; i < projected.length; i++) {
    stroke(255);
    strokeWeight(8);
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

  //angle += 0.03;
}

function connect(i, j, points) {
  const a = points[i];
  const b = points[j];
  strokeWeight(1);
  stroke(255);
  line(a.x, a.y, b.x, b.y);
}