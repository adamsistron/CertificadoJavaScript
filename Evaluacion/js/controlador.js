var jsonText = '{"estudiantes":[' +
'{"codigo":"0001","nombre":"Angel Guevara","nota":4.9},' +
'{"codigo":"0002","nombre":"William Buitrago","nota":2.1},' +
'{"codigo":"0003","nombre":"Andres Santos","nota":3.9},' +
'{"codigo":"0004","nombre":"Manuel Pastrana","nota":3.8},' +
'{"codigo":"0005","nombre":"Timoteo Uribe","nota":4.7},' +
'{"codigo":"0006","nombre":"Alvaro Romero","nota":4.2},' +
'{"codigo":"0007","nombre":"Leidy Arango","nota":2.6},' +
'{"codigo":"0008","nombre":"Paola Cortes","nota":2.3},' +
'{"codigo":"0009","nombre":"Maria Bonilla","nota":2.8},' +
'{"codigo":"0010","nombre":"Diego Castillejo","nota":3.1}' +
']}';
//Se convierte el texto en formato JSon
var jsObj = JSON.parse(jsonText);

//Funcion que convierte el Json en Tabla para mostrar alumnos
function jsonToTable(json, caption) {
  var tabla = '<table>';
  tabla += '<caption>' + caption + '</caption>';
  tabla += '<tr><th>Nro.</th><th>Codigo</th><th>Nombre</th><th>Nota</th></tr>';
  var i;
  var j = 1;
  for (i = 0; i < json.estudiantes.length; i++) {
    tabla += '<tr>' +
    '<td>' + j + '</td>' +
    '<td>' + json.estudiantes[i].codigo + '</td>' +
    '<td>' + json.estudiantes[i].nombre + '</td>' +
    '<td>' + json.estudiantes[i].nota + '</td>' +
    '</tr>';
    j++;
  }
  tabla += '</table>';
  document.getElementById('tabla').innerHTML = tabla;
}
/*Funcion que es ejecutada por la accion del boton y a su vez llama a la funncion de que construye la tabla a partir del Json*/
function mostrarEstudiantes() {
  var caption = 'ESTUDIANTES';
  jsonToTable(jsObj, caption);
}
/*Funcion que calcula la nota mas Alta o mas Baja, funciona en ambos casos segun el parametro que se pase al momento de invocarla*/
function notaMas(json, mas) {
  var notas = Array();
  for (i = 0; i < json.estudiantes.length; i++) {
    notas[i] = json.estudiantes[i].nota;
  }
  if (mas == 'alta') {
    document.getElementById('alta').innerHTML = "Nota mas Alta: " + Math.max.apply(Math, notas);
  } else {
    document.getElementById('baja').innerHTML = "Nota mas Baja: " + Math.min.apply(Math, notas);
  }
}
function mostrarNotaMas(mas) {
  notaMas(jsObj, mas);
}
function promedioNotas(json) {
  var sumarNotas = 0;
  for (i = 0; i < json.estudiantes.length; i++) {
    sumarNotas += parseFloat(json.estudiantes[i].nota);
  }
  document.getElementById('promedio').innerHTML = "Promedio: " + (sumarNotas / json.estudiantes.length);
}
function mostrarPromedio() {
  promedioNotas(jsObj);
}
function limpiarResultados() {
  var pS = document.getElementsByTagName('div');
  for (var i = 0; i < pS.length; ++i) {
    pS[i].innerHTML = '';
  }
}