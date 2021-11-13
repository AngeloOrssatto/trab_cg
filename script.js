let r = 0
let r2 = 0
let a = 0
let n = 0
let h = 0

let vrp = [0,0,0]
let p = [0,0,0]
let vecU = []
let vecV = []
let vecN = []

let points = [
    [],
    [],
    [],
    []
]

let near = 0; //user parameter
let far = 0; //user parameter
let dp = 0; //user parameter
let Zvp = dp*(-1);
let Zprp = 0; //centro de projeção coincide com origem do SRC

let altura = 0//user parameter
let largura = 0//user parameter

let xmax = 0
let xmin = 0
let ymax = 0
let ymin = 0

let umax = 0//user parameter
let umin = 0//user parameter
let vmax = 0//user parameter
let vmin = 0//user parameter

let MatrixSRU2SRC = []
let perspectiveProj = []
let ortographicProj = []
let Mjp = []
let MatrixSRU2SRT = []
let SRTpoints = []

// parametros iluminacao
let L = [0,0,0]
let KaR, KaG, KaB, KdR, KdG, KdB, KsR, KsG, KsB
let ILuzAmbR, ILuzAmbG, ILuzAmbB, IFonteLumR, IFonteLumG, IFonteLumB
let nLuz

// parametros tranformações geometricas
let dx = 0
let dy = 0
let dz = 0
let sx = 1
let sy = 1
let sz = 1
let ax = 0
let ay = 0
let az = 0


function cleanScence(){
    r = 0
    r2 = 0
    a = 0
    n = 0
    h = 0

    vrp = [0,0,0]
    p = [0,0,0]
    vecU = []
    vecV = []
    vecN = []

    points = [
        [],
        [],
        [],
        []
    ]

    ax = 0, ay = 0, az = 0, dx = 0, dy = 0, dz = 0, sx = 1, sy = 1, sz = 1

    near = 0; //user parameter
    far = 0; //user parameter
    dp = 0; //user parameter
    Zvp = dp*(-1);
    Zprp = 0; //centro de projeção coincide com origem do SRC

    altura = 0//user parameter
    largura = 0//user parameter

    xmax = 0
    xmin = 0
    ymax = 0
    ymin = 0

    L = [0,0,0]

    umax = 0//user parameter
    umin = 0//user parameter
    vmax = 0//user parameter
    vmin = 0//user parameter

    MatrixSRU2SRC = []
    perspectiveProj = []
    ortographicProj = []
    Mjp = []
    MatrixSRU2SRT = []
    SRTpoints = []
    setup()
}

document.addEventListener('keypress', (event) => {
    let keyName = event.code
    if (keyName == 'KeyQ') {
        dx += 1
    }
    if (keyName == 'KeyA') {
        dx-=1
    }
    if (keyName == 'KeyW') {
        dz += 1
    }
    if (keyName == 'KeyS') {
        dz -= 1
    }
    if (keyName == 'KeyE') {
        dy += 1
    }
    if (keyName == 'KeyD') {
        dy -= 1
    }
    if (keyName == 'KeyR') {
        sx += 0.5
    }
    if (keyName == 'KeyF') {
        if (sx <= 1 && sx > 0) {
            sx -= 0.1
        } else if (sx <= 0) {
            sx = 0
        } else {
            sx -= 0.5
        } 
    }
    if (keyName == 'KeyT') {
        sz += 0.5
    }
    if (keyName == 'KeyG') {
        if (sz <= 1 && sz > 0) {
            sz -= 0.1
        } else if (sz <= 0) {
            sz = 0
        } else {
            sz -= 0.5
        } 
    }
    if (keyName == 'KeyY') {
        sy += 0.5
    }
    if (keyName == 'KeyH') {
        if (sy <= 1 && sy > 0) {
            sy -= 0.1
        } else if (sy <= 0) {
            sy = 0
        } else {
            sy -= 0.5
        } 
    }
    if (keyName == 'KeyU') {
        ax += 10
    }
    if (keyName == 'KeyJ') {
        ax -= 10
    }
    if (keyName == 'KeyI') {
        az += 10
    }
    if (keyName == 'KeyK') {
        az -= 10
    }
    if (keyName == 'KeyO') {
        ay += 10
    }
    if (keyName == 'KeyL') {
        ay -= 10
    }
})

function constructScene(){
    let aux = ''
    aux = document.getElementById('nSides').value
    n = parseInt(aux)
    aux = document.getElementById('height').value
    h = parseFloat(aux)
    aux = document.getElementById('radius').value
    r = parseFloat(aux)
    aux = document.getElementById('radius2').value
    r2 = parseFloat(aux)
  
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

    aux = document.getElementById('altura').value
    altura = parseFloat(aux)
    aux = document.getElementById('largura').value
    largura = parseFloat(aux)

    aux = document.getElementById('dn').value
    near = parseFloat(aux)
    aux = document.getElementById('df').value
    far = parseFloat(aux)
    aux = document.getElementById('dp').value
    dp = parseFloat(aux)

    aux = document.getElementById('umax').value
    umax = parseFloat(aux)
    aux = document.getElementById('umin').value
    umin = parseFloat(aux)
    aux = document.getElementById('vmax').value
    vmax = parseFloat(aux)
    aux = document.getElementById('vmin').value
    vmin = parseFloat(aux)

    aux = document.getElementById('Lx').value
    L[0] = parseFloat(aux)
    aux = document.getElementById('Ly').value
    L[1] = parseFloat(aux)
    aux = document.getElementById('Lz').value
    L[2] = parseFloat(aux) 
    aux = document.getElementById('ilaR').value
    ILuzAmbR = parseFloat(aux)
    aux = document.getElementById('ilaG').value
    ILuzAmbG = parseFloat(aux)
    aux = document.getElementById('ilaB').value
    ILuzAmbB = parseFloat(aux)
    aux = document.getElementById('iliR').value
    IFonteLumR = parseFloat(aux)
    aux = document.getElementById('iliG').value
    IFonteLumG = parseFloat(aux)
    aux = document.getElementById('iliB').value
    IFonteLumB = parseFloat(aux)
    aux = document.getElementById('kaR').value
    KaR = parseFloat(aux)
    aux = document.getElementById('kaG').value
    KaG = parseFloat(aux)
    aux = document.getElementById('kaB').value
    KaB = parseFloat(aux)
    aux = document.getElementById('kdR').value
    KdR = parseFloat(aux)
    aux = document.getElementById('kdG').value
    KdG = parseFloat(aux)
    aux = document.getElementById('kdB').value
    KdB = parseFloat(aux)
    aux = document.getElementById('ksR').value
    KsR = parseFloat(aux)
    aux = document.getElementById('ksG').value
    KsG = parseFloat(aux)
    aux = document.getElementById('ksB').value
    KsB = parseFloat(aux)
    aux = document.getElementById('nLuz').value
    nLuz = parseFloat(aux)

    L = normalizaVetor(L)

    xmax = largura/2
    xmin = -largura/2
    ymax = altura/2
    ymin = -altura/2

    a = 0
    for (let i = 0; i < n; i++){
        points[0].push(Math.cos(degrees_to_radians(a))*r2)
        points[1].push(0)
        points[2].push(Math.sin(degrees_to_radians(a))*r2)
        points[3].push(1)
        a+=(360/n)
    }
    a = 0
    for (let i = n; i < n*2; i++){
        points[0].push(Math.cos(degrees_to_radians(a))*r)
        points[1].push(h)
        points[2].push(Math.sin(degrees_to_radians(a))*r)
        points[3].push(1)
        a+=(360/n)
    }
        
    console.log('raios: ', r, r2)
    console.log('lados: ', n, 'altura: ', h)
    console.log('vrp: ', vrp, 'p: ', p)
    console.log('objeto: ', points)

    let N = subVector(vrp, p)
    vecN = normalizaVetor(N)

    let Y = [0,1,0]
    let V = prodEscalar(Y, vecN)
    V = multByScalar(vecN, V)
    V = subVector(Y, V)
    vecV = normalizaVetor(V)

    vecU = prodVetorial(vecV, vecN)

    console.log('n', vecN)
    console.log('v', vecV)
    console.log('u', vecU)

    MatrixSRU2SRC = [
        [vecU[0], vecU[1], vecU[2], -prodEscalar(vrp, normalizaVetor(vecU))],
        [vecV[0], vecV[1], vecV[2], -prodEscalar(vrp, normalizaVetor(vecV))],
        [vecN[0], vecN[1], vecN[2], -prodEscalar(vrp, normalizaVetor(vecN))],
        [0, 0, 0, 1]
    ]
    console.log('SRU -> SRC', MatrixSRU2SRC)

    perspectiveProj = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, -(Zvp/dp), Zvp*(Zprp/dp)],
        [0, 0, -1/dp, Zprp/dp]
    ]

    ortographicProj = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ]

    Mjp = [
        [(umax-umin)/(xmax-xmin), 0, 0, -xmin*((umax-umin)/(xmax-xmin))+umin],
        [0, (vmin-vmax)/(ymax-ymin), 0, ymin*((vmax-vmin)/(ymax-ymin))+vmax],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]

    console.log('Mjp', Mjp)

    if(document.getElementById('perspectiva').checked){
        MatrixSRU2SRT = matmul(Mjp, perspectiveProj)
    } else if (document.getElementById('ortografica').checked){
        MatrixSRU2SRT = matmul(Mjp, ortographicProj)
    }

    MatrixSRU2SRT = matmul(MatrixSRU2SRT, MatrixSRU2SRC)

    console.log('SRU -> SRT', MatrixSRU2SRT)

    setup()
}

function degrees_to_radians(degrees){
    var pi = Math.PI;
    return degrees * (pi/180);
}


function setup() {
    createCanvas(umax-umin, vmax-vmin);
    pixelDensity(1);
}

let projected = [];
function draw() {
    background(0);

    let rotationX = [
        [1, 0, 0, 0],
        [0, Math.cos(degrees_to_radians(ax)), -Math.sin(degrees_to_radians(ax)), 0],
        [0, Math.sin(degrees_to_radians(ax)), Math.cos(degrees_to_radians(ax)), 0],
        [0, 0, 0, 1]
    ]
    let rotationY = [
        [Math.cos(degrees_to_radians(ay)), 0, Math.sin(degrees_to_radians(ay)), 0],
        [0, 1, 0, 0],
        [-Math.sin(degrees_to_radians(ay)), 0, Math.cos(degrees_to_radians(ay)), 0],
        [0, 0, 0, 1]
    ]
    let rotationZ = [
        [Math.cos(degrees_to_radians(az)), -Math.sin(degrees_to_radians(az)), 0, 0],
        [Math.sin(degrees_to_radians(az)), Math.cos(degrees_to_radians(az)), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
    let translacao = [
        [1, 0, 0, dx],
        [0, 1, 0, dy],
        [0, 0, 1, dz],
        [0, 0, 0, 1]
    ]
    let escala = [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ]

    if(MatrixSRU2SRT[0] != undefined) {

        pointsRotated = matmul(rotationX, points)
        pointsRotated = matmul(rotationY, pointsRotated)
        pointsRotated = matmul(rotationZ, pointsRotated)

        pointsRotated = matmul(escala, pointsRotated)
        pointsRotated = matmul(translacao, pointsRotated)
        
        SRTpoints = matmul(MatrixSRU2SRT, pointsRotated)
        
        for (let i = 0; i < n*2; i++){
            SRTpoints[0][i] = SRTpoints[0][i]/SRTpoints[3][i]
            SRTpoints[1][i] = SRTpoints[1][i]/SRTpoints[3][i]
            SRTpoints[3][i] = SRTpoints[3][i]/SRTpoints[3][i]
        }
        
        console.log('SRTpoints', SRTpoints)

        for (let i = 0; i < n*2; i++) {
            let projected2d = [SRTpoints[0][i], SRTpoints[1][i], SRTpoints[2][i]]
            
            projected[i] = createVector(projected2d[0], projected2d[1], projected2d[2]);
      
          }
    }

    //Connecting
    for(let i = 0; i < n; i++) {
      connect(i, (i+1)%n, projected)
      connect(i+n, ((i + 1) % n) + n, projected)
      connect(i, i+n, projected)
    }    

    if (projected.length > 0) {

        let normal;
        let ItotalR, ItotalG, ItotalB;
        let IambR = 0, IambG = 0, IambB = 0;
        let IdifR = 0, IdifG = 0, IdifB = 0;
        let IspecR = 0, IspecG = 0, IspecB = 0;

        let xmin, xmax;
        let ymin, ymax;
        let zmin, zmax;

        let cg = [0,0,0];
        // face inferior
        v1 = [pointsRotated[0][0], pointsRotated[1][0], pointsRotated[2][0]];
        v2 = [pointsRotated[0][1], pointsRotated[1][1], pointsRotated[2][1]];
        v3 = [pointsRotated[0][2], pointsRotated[1][2], pointsRotated[2][2]]
        if (faceVisivelPoints(v3, v2, v1)){
            // 1) calculo centro geometrico
            xmin = pointsRotated[0][0]
            xmax = pointsRotated[0][0]
            ymin = pointsRotated[1][0]
            ymax = pointsRotated[1][0]
            zmin = pointsRotated[2][0]
            zmax = pointsRotated[2][0]

            for (let i = 0; i < n; i++) {
                if (pointsRotated[0][i] < xmin){
                    xmin = pointsRotated[0][i]
                }
                if (pointsRotated[0][i] > xmax){
                    xmax = pointsRotated[0][i]
                }
                if (pointsRotated[1][i] < ymin){
                    ymin = pointsRotated[1][i]
                }
                if (pointsRotated[1][i] > ymax){
                    ymax = pointsRotated[1][i]
                }
                if (pointsRotated[2][i] < zmin){
                    zmin = pointsRotated[2][i]
                }
                if (pointsRotated[2][i] > zmax){
                    zmax = pointsRotated[2][i]
                }
            }
            
            cg[0] = (xmin+xmax)/2
            cg[1] = (ymin+ymax)/2
            cg[2] = (zmin+zmax)/2
            
            // 2) vetor normal da face unitario
            v1 = [pointsRotated[0][0], pointsRotated[1][0], pointsRotated[2][0]];
            v2 = [pointsRotated[0][1], pointsRotated[1][1], pointsRotated[2][1]];
            v3 = [pointsRotated[0][2], pointsRotated[1][2], pointsRotated[2][2]]
            normal = normalFacePoints(v3, v2, v1)

            // 3) It = Ia + Id + Is
            // Iluminacao ambiente
            IambR = ILuzAmbR * KaR
            IambG = ILuzAmbG * KaG
            IambB = ILuzAmbB * KaB

            // Iluminação difusa
            vecL = subVector(L, cg)
            vecL = normalizaVetor(vecL)

            if (prodEscalar(normal, vecL) > 0) {
                IdifR = IFonteLumR * KdR * prodEscalar(normal, vecL)
                IdifG = IFonteLumG * KdG * prodEscalar(normal, vecL)
                IdifB = IFonteLumB * KdB * prodEscalar(normal, vecL)

                esc = prodEscalar(vecL, normal) * 2
                vecR = multByScalar(normal, esc)
                vecR = subVector(vecR, vecL)

                vecS = subVector(vrp, cg)
                vecS = normalizaVetor(vecS)

                if (prodEscalar(vecR, vecS) > 0) {
                    IspecR = IFonteLumR * KsR * Math.pow(prodEscalar(vecR, vecS), nLuz)
                    IspecG = IFonteLumG * KsG * Math.pow(prodEscalar(vecR, vecS), nLuz)
                    IspecB = IFonteLumB * KsB * Math.pow(prodEscalar(vecR, vecS), nLuz)
                }
            }

            ItotalR = IambR + IdifR + IspecR
            ItotalG = IambG + IdifG + IspecG
            ItotalB = IambB + IdifB + IspecB
            fill(ItotalR, ItotalG, ItotalB)
            beginShape()
            for (let i = 0; i < n; i++){
                vertex(projected[i].x, projected[i].y)
            }
            endShape(CLOSE)
        }
        // // face superior
        v1 = [pointsRotated[0][n], pointsRotated[1][n], pointsRotated[2][n]];
        v2 = [pointsRotated[0][n+1], pointsRotated[1][n+1], pointsRotated[2][n+1]];
        v3 = [pointsRotated[0][n+2], pointsRotated[1][n+2], pointsRotated[2][n+2]]
        if (faceVisivelPoints(v3, v2, v1)){
            // 1) calculo centro geometrico
            xmin = pointsRotated[0][n]
            xmax = pointsRotated[0][n]
            ymin = pointsRotated[1][n]
            ymax = pointsRotated[1][n]
            zmin = pointsRotated[2][n]
            zmax = pointsRotated[2][n]

            for (let i = n; i < 2*n; i++) {
                if (pointsRotated[0][i] < xmin){
                    xmin = pointsRotated[0][i]
                }
                if (pointsRotated[0][i] > xmax){
                    xmax = pointsRotated[0][i]
                }
                if (pointsRotated[1][i] < ymin){
                    ymin = pointsRotated[1][i]
                }
                if (pointsRotated[1][i] > ymax){
                    ymax = pointsRotated[1][i]
                }
                if (pointsRotated[2][i] < zmin){
                    zmin = pointsRotated[2][i]
                }
                if (pointsRotated[2][i] > zmax){
                    zmax = pointsRotated[2][i]
                }
            }

            cg[0] = (xmin+xmax)/2
            cg[1] = (ymin+ymax)/2
            cg[2] = (zmin+zmax)/2

            // 2) vetor normal da face unitario
            v1 = [pointsRotated[0][n], pointsRotated[1][n], pointsRotated[2][n]];
            v2 = [pointsRotated[0][n+1], pointsRotated[1][n+1], pointsRotated[2][n+1]];
            v3 = [pointsRotated[0][n+2], pointsRotated[1][n+2], pointsRotated[2][n+2]]
            normal = normalFacePoints(v3, v2, v1)

            // 3) It = Ia + Id + Is
            // Iluminacao ambiente
            IambR = ILuzAmbR * KaR
            IambG = ILuzAmbG * KaG
            IambB = ILuzAmbB * KaB

            // Iluminação difusa
            vecL = subVector(L, cg)
            vecL = normalizaVetor(vecL)

            if (prodEscalar(normal, vecL) > 0) {
                IdifR = IFonteLumR * KdR * prodEscalar(normal, vecL)
                IdifG = IFonteLumG * KdG * prodEscalar(normal, vecL)
                IdifB = IFonteLumB * KdB * prodEscalar(normal, vecL)

                esc = prodEscalar(vecL, normal) * 2
                vecR = multByScalar(normal, esc)
                vecR = subVector(vecR, vecL)

                vecS = subVector(vrp, cg)
                vecS = normalizaVetor(vecS)

                if (prodEscalar(vecR, vecS) > 0) {
                    IspecR = IFonteLumR * KsR * Math.pow(prodEscalar(vecR, vecS), nLuz)
                    IspecG = IFonteLumG * KsG * Math.pow(prodEscalar(vecR, vecS), nLuz)
                    IspecB = IFonteLumB * KsB * Math.pow(prodEscalar(vecR, vecS), nLuz)
                }
            }

            ItotalR = IambR + IdifR + IspecR
            ItotalG = IambG + IdifG + IspecG
            ItotalB = IambB + IdifB + IspecB

            fill(ItotalR, ItotalG, ItotalB)
            beginShape()
            for (let i = n; i < n*2; i++){
                vertex(projected[i].x, projected[i].y)
            }
            endShape(CLOSE)
        }
        
        // faces laterais
        for (let i = 0; i < n; i++) {

            v1 = [pointsRotated[0][i], pointsRotated[1][i], pointsRotated[2][i]];
            v2 = [pointsRotated[0][(i+1)%n], pointsRotated[1][(i+1)%n], pointsRotated[2][(i+1)%n]];
            v3 = [pointsRotated[0][((i+1)%n)+n], pointsRotated[1][((i+1)%n)+n], pointsRotated[2][((i+1)%n)+n]]            
            if (faceVisivelPoints(v3, v2, v1)){
                // 1) calculo centro geometrico
                xmin = pointsRotated[0][i]
                xmax = pointsRotated[0][i]
                ymin = pointsRotated[1][i]
                ymax = pointsRotated[1][i]
                zmin = pointsRotated[2][i]
                zmax = pointsRotated[2][i]

                if (pointsRotated[0][(i+1)%n] > xmax) {
                    xmax = pointsRotated[0][(i+1)%n]
                }
                if (pointsRotated[0][((i+1)%n)+n] > xmax) {
                    xmax = pointsRotated[0][((i+1)%n)+n]
                }
                if (pointsRotated[0][i+n] > xmax) {
                    xmax = pointsRotated[0][i+n]
                }
                if (pointsRotated[0][(i+1)%n] < xmin) {
                    xmin = pointsRotated[0][(i+1)%n]
                }
                if (pointsRotated[0][((i+1)%n)+n] < xmin) {
                    xmin = pointsRotated[0][((i+1)%n)+n]
                }
                if (pointsRotated[0][i+n] < xmin) {
                    xmin = pointsRotated[0][i+n]
                }
                
                if (pointsRotated[1][(i+1)%n] > ymax) {
                    ymax = pointsRotated[1][(i+1)%n]
                }
                if (pointsRotated[1][((i+1)%n)+n] > ymax) {
                    ymax = pointsRotated[1][((i+1)%n)+n]
                }
                if (pointsRotated[1][i+n] > ymax) {
                    ymax = pointsRotated[1][i+n]
                }
                if (pointsRotated[1][(i+1)%n] < ymin) {
                    ymin = pointsRotated[1][(i+1)%n]
                }
                if (pointsRotated[1][((i+1)%n)+n] < ymin) {
                    ymin = pointsRotated[1][((i+1)%n)+n]
                }
                if (pointsRotated[1][i+n] < ymin) {
                    ymin = pointsRotated[1][i+n]
                }

                if (pointsRotated[2][(i+1)%n] > zmax) {
                    zmax = pointsRotated[2][(i+1)%n]
                }
                if (pointsRotated[2][((i+1)%n)+n] > zmax) {
                    zmax = pointsRotated[2][((i+1)%n)+n]
                }
                if (pointsRotated[2][i+n] > zmax) {
                    zmax = pointsRotated[2][i+n]
                }
                if (pointsRotated[2][(i+1)%n] < zmin) {
                    zmin = pointsRotated[2][(i+1)%n]
                }
                if (pointsRotated[2][((i+1)%n)+n] < zmin) {
                    zmin = pointsRotated[2][((i+1)%n)+n]
                }
                if (pointsRotated[2][i+n] < zmin) {
                    zmin = pointsRotated[2][i+n]
                }

                cg[0] = (xmin+xmax)/2
                cg[1] = (ymin+ymax)/2
                cg[2] = (zmin+zmax)/2

                // 2) vetor normal da face unitario
                normal = normalFacePoints(v3, v2, v1)

                // 3) It = Ia + Id + Is
                // Iluminacao ambiente
                IambR = ILuzAmbR * KaR
                IambG = ILuzAmbG * KaG
                IambB = ILuzAmbB * KaB

                // Iluminação difusa
                vecL = subVector(L, cg)
                vecL = normalizaVetor(vecL)

                if (prodEscalar(normal, vecL) > 0) {
                    IdifR = IFonteLumR * KdR * prodEscalar(normal, vecL)
                    IdifG = IFonteLumG * KdG * prodEscalar(normal, vecL)
                    IdifB = IFonteLumB * KdB * prodEscalar(normal, vecL)

                    esc = prodEscalar(vecL, normal) * 2
                    vecR = multByScalar(normal, esc)
                    vecR = subVector(vecR, vecL)

                    vecS = subVector(vrp, cg)
                    vecS = normalizaVetor(vecS)

                    if (prodEscalar(vecR, vecS) > 0) {
                        IspecR = IFonteLumR * KsR * Math.pow(prodEscalar(vecR, vecS), nLuz)
                        IspecG = IFonteLumG * KsG * Math.pow(prodEscalar(vecR, vecS), nLuz)
                        IspecB = IFonteLumB * KsB * Math.pow(prodEscalar(vecR, vecS), nLuz)
                    }
                }

                ItotalR = IambR + IdifR + IspecR
                ItotalG = IambG + IdifG + IspecG
                ItotalB = IambB + IdifB + IspecB
                fill(ItotalR, ItotalG, ItotalB) 
                beginShape()
                vertex(projected[i].x, projected[i].y)
                vertex(projected[(i+1)%n].x, projected[(i+1)%n].y)
                vertex(projected[((i+1)%n)+n].x, projected[((i+1)%n)+n].y)
                vertex(projected[i+n].x, projected[i+n].y)
                endShape(CLOSE)
            } 
        }
    }
}
    
function faceVisivelPoints(p1, p2, p3) {
    let A = [
        p1[0]-p2[0],
        p1[1]-p2[1],
        p1[2]-p2[2]
    ]
    let B = [
        p3[0]-p2[0],
        p3[1]-p2[1],
        p3[2]-p2[2]
    ]

    let N = prodVetorial(B, A)
    N = normalizaVetor(N)
    if (prodEscalar(vecN, N) > 0){
        return true
    } else {
        return false
    }
}

function normalFace(p1, p2, p3){
    let A = [
        p1.x-p2.x,
        p1.y-p2.y,
        p1.z-p2.z
    ]
    let B = [
        p3.x-p2.x,
        p3.y-p2.y,
        p3.z-p2.z
    ]

    let N = prodVetorial(B, A)
    N = normalizaVetor(N)

    return N;
}

function normalFacePoints(p1, p2, p3){
    let A = [
        p1[0]-p2[0],
        p1[1]-p2[1],
        p1[2]-p2[2]
    ]
    let B = [
        p3[0]-p2[0],
        p3[1]-p2[1],
        p3[2]-p2[2]
    ]

    let N = prodVetorial(B, A)
    N = normalizaVetor(N)

    return N;
}

function connect(i, j, points) {
    const a = points[i];
    const b = points[j];
    strokeWeight(1);
    stroke(0,0,0);
    line(a.x, a.y, b.x, b.y);
}