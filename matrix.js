function vecToMatrix(v) {
    let m = [];
    for (let i = 0; i < 3; i++) {
      m[i] = [];
    }
    m[0][0] = v.x;
    m[1][0] = v.y;
    m[2][0] = v.z;
    return m;
  }
  
  function matrixToVec(m) {
    return createVector(m[0][0], m[1][0], m.length > 2 ? m[2][0] : 0);
  }
  
  function logMatrix(m) {
    const cols = m[0].length;
    const rows = m.length;
    console.log(rows + 'x' + cols);
    console.log('----------------');
    let s = '';
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        s += m[i][j] + ' ';
      }
      console.log(s);
    }
    console.log();
  }
  
  function matmulvec(a, vec) {
    let m = vecToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec(r);
  }
  
  function matmul(a, b) {
    if (b instanceof p5.Vector) {
      return matmulvec(a, b);
    }
  
    let colsA = a[0].length;
    let rowsA = a.length;
    let colsB = b[0].length;
    let rowsB = b.length;

    //console.log('col a', colsA)
    //console.log('rows b', rowsB)
  
    if (colsA !== rowsB) {
      console.error('Columns of A must match rows of B');
      return null;
    }
  
    result = [];
    for (let j = 0; j < rowsA; j++) {
      result[j] = [];
      for (let i = 0; i < colsB; i++) {
        let sum = 0;
        for (let n = 0; n < colsA; n++) {
          sum += a[j][n] * b[n][i];
        }
        result[j][i] = sum;
      }
    }
    return result;
  }

function prodEscalar(a, b){
  if (a.length != b.length){
    console.log('Vectors doesnt match');
    return null;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++){
    result += (a[i]*b[i]);
  }
  return result;
}

function prodVetorial(a, b){
  if (a.length != b.length){
    console.log('Vectors doesnt match');
    return null;
  }
  let prodVect = []
  for (let i = 0; i < a.length; i++){
    prodVect[i] = (a[(i+1)%a.length]*b[(i+2)%b.length])-(b[(i+1)%b.length]*a[(i+2)%a.length])
    console.log(prodVect[i])
  }
  return prodVect;
}

function normalizaVetor(a){ 
  let module = 0
  for (let i = 0; i < a.length; i++){
    module+=(a[i]*a[i])
  }
  module = Math.sqrt(module)
  for (let i = 0; i < a.length; i++){
    a[i] = a[i]/module
  }
  return a;
}

function subVector(a, b){
  if (a.length != b.length){
    console.log('Vectors doesnt match');
    return null;
  }
  let result = []
  for (let i = 0; i < a.length; i++){
    result[i] = a[i]-b[i]
  }
  return result;
}

function multByScalar(vec, k) {
  for(let i = 0; i < vec.length; i++){
    vec[i] = vec[i]*k
  }
  return vec
}