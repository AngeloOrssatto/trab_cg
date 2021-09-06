let angleX = degrees_to_radians(0);
let angleY = degrees_to_radians(0);
let angleZ = degrees_to_radians(0);

let dx = 0
let dy = 0
let dz = 0

let index = 0
let r = 0
let r2 = 0
let a = 0
let n = 0
let h = 0

let vrp = []
let p = []
let vecU = []
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

function transformations(e) {
  if(e.code === 'KeyA'){
    // movimento em X - direita
    dx+=1
  }
  if(e.code === 'KeyQ'){
    // movimento em X - esquerda
    dx-=1
  }
  if(e.code === 'KeyW'){
    // movimento em Z - frente
    dz+=1
  }
  if(e.code === 'KeyS'){
    // movimento em Z - tras
    dz-=1
  }
  if(e.code === 'KeyE'){
    // movimento em Y - cima
    dy+=1
  }
  if(e.code === 'KeyD'){
    // movimento em Y - baixo
    dy-=1
  }

  if(e.code === 'KeyR'){
    // diminui em X
  }
  if(e.code === 'KeyF'){
    // aumenta em X 
  }
  if(e.code === 'KeyT'){
    // diminui em Z 
  }
  if(e.code === 'KeyG'){
    // aumenta em Z 
  }
  if(e.code === 'KeyY'){
    // diminui em Y 
  }
  if(e.code === 'KeyH'){
    // aumenta em Y 
  }

  if(e.code === 'KeyU'){
    // rotaciona em X - pos
    angleX+=10
    console.log(angleX)
  }
  if(e.code === 'KeyJ'){
    // rotaciona em X - neg 
    angleX-=10
    console.log(angleX)
  }
  if(e.code === 'KeyI'){
    // rotaciona em Z - pos
    angleZ+=10
    console.log(angleZ) 
  }
  if(e.code === 'KeyK'){
    // rotaciona em Z - neg 
    angleZ-=10
    console.log(angleZ)
  }
  if(e.code === 'KeyO'){
    // rotaciona em Y - pos
    angleY+=10
    console.log(angleY)
  }
  if(e.code === 'KeyL'){
    // rotaciona em Y - neg
    angleY-=10
    console.log(angleY)
  }

}

document.addEventListener('keypress', transformations);

function setup() {
  createCanvas(1200, 900);
  
}


function draw() {
  background(0);

  translate(width / 2, height / 2);

  const rotationZ = [
    [Math.cos(angleZ), -Math.sin(angleZ), 0],
    [Math.sin(angleZ), Math.cos(angleZ), 0],
    [0, 0, 1]
  ];
  
  const rotationX = [
    [1, 0, 0],
    [0, Math.cos(angleX), -Math.sin(angleX)],
    [0, Math.sin(angleX), Math.cos(angleX)]
  ];
  
  const rotationY = [
    [Math.cos(angleY), 0, Math.sin(angleY)],
    [0, 1, 0],
    [-Math.sin(angleY), 0, Math.cos(angleY)]
  ];

  const translateZ = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, dz]
  ];
  
  const translateX = [
    [1, 0, dx],
    [0, 1, 0],
    [0, 0, 0]
  ];
  
  const translateY = [
    [1, 0, 0],
    [0, 1, dy],
    [0, 0, 0]
  ];

  let projected = [];


  for (let i = 0; i < points.length; i++) {
    
    let rotated = matmul(MatrixSRU2SRC, points[i])
    rotated = matmul(rotationY, rotated);
    rotated = matmul(rotationX, rotated);
    rotated = matmul(rotationZ, rotated);
    rotated = matmul(translateY, rotated);
    rotated = matmul(translateX, rotated);
    rotated = matmul(translateZ, rotated);

    const distance = 5
    //const z = 1/(distance-rotated.z)

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