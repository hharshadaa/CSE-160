class Model {
  constructor(objText) {
    this.vertices = [];
    this.normals = [];

    this.parseOBJ(objText);

    this.vertexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();

    this.initBuffers();
  }

  parseOBJ(data) {
    let lines = data.split('\n');

    let tempVerts = [];
    let tempNormals = [];

    for (let line of lines) {
      let parts = line.trim().split(/\s+/);

      if (parts[0] === 'v') {
        tempVerts.push([
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3])
        ]);
      }

      if (parts[0] === 'vn') {
        tempNormals.push([
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3])
        ]);
      }

      if (parts[0] === 'f') {
            for (let i = 1; i <= 3; i++) {

                let indices = parts[i].split('/');

                let vIndex = parseInt(indices[0]) - 1;

                this.vertices.push(...tempVerts[vIndex]);

                if (indices.length >= 3 && indices[2] !== "") {
                let nIndex = parseInt(indices[2]) - 1;
                this.normals.push(...tempNormals[nIndex]);
                } else {

                this.normals.push(0, 1, 0);
                }
            }
            }
    }
  }

  initBuffers() {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
  }

  render() {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);

    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
  }
}