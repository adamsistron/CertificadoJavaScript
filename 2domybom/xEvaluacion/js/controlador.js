/*
 * 
 * @type String: Se crea los datos base a ser procesados en formato Texto.
 */
var jsonText = '{"estudiantes":[]}';
/*
 * @type Array|Object
 * Se convierte los datos que estan texto a formato JSON con el parse.
 * Asi mismo queda creada la variable de manera global, esta sera usada
 * por los todas las funciones que requieran procesarla. 
 */
var jsObj = JSON.parse(jsonText);
/*
 * Esta funcion permite crear todas filas que trae el JSON y agragarsela
 * a la tabla de estudiantes pero solo en el formato JSON de la variable
 * global.
 * @param {type} datos: Recibe la variable globa JSON con los datos de estudiantes.
 * @param {type} id: Recibe el id de la tabla donde se van a agregar las filas.
 * @returns {Boolean}
 */
function generarTabla(datos, id) {
    eliminarFilasTabla(id);
    var moduloDatos = datos.estudiantes.length;
    var table = document.getElementById(id);
    for (i = 0; i < moduloDatos; i++) {
        var row = table.insertRow(i + 1);
        row.id = "row" + (i + 1);
        var k = 0;
        for (var j in datos.estudiantes[i]) {
            row.insertCell(k).innerHTML = datos.estudiantes[i][j];
            k++;
        }
    }
    return true;
}
/*
 * 
 * @param {type} id: Recibe el id de la table donde se agregaran las filas/celdas.
 * @param {type} array: Arreglo que contiene las celdas que se agregan a las filas.
 * @returns {Boolean}
 */
function agregarRow(idTable, idRow, array) {
    var tableAddRow = document.getElementById(idTable);
    var row = document.getElementById(idRow);
    if (row) {
        row.parentNode.removeChild(row);
    }
    var row = tableAddRow.insertRow(1);
    row.id = idRow;
    for (i = 0; i < array.length; i++) {
        var celdaX = row.insertCell(i);
        celdaX.innerHTML = array[i];
    }
    return true;
}
/*
 * 
 * @param {type} datos: Recibe la variable globa JSON con los datos de estudiantes.
 * @param {type} : Recibel el objeto que acciono la funcion.
 * @param {type} arg: Recibe el argumento max/min que indicara que aperacion
 * realizar, si calcular la nota minima o maximo.
 * @returns {undefined}
 */
function buscarMaxMin(datos, arg) {

    var moduloDatos = datos.estudiantes.length;
    var notas = Array();
    /*
     * Se crea un arreglo de notas para luego calcular la nota maxima o minima
     */
    for (i = 0; i < moduloDatos; i++) {
        notas[i] = datos.estudiantes[i].nota;
    }
    var maxi = Math.max.apply(Math, notas);
    var mini = Math.min.apply(Math, notas);
    /*
     * Se valida si la tabla de estudiantes ya tiene los registros de estudiantes,
     * esto es necesario porque cuando se muestra la nota minima  maxima, se 
     * sombrea con un color distintivo a los estudiantes segun sea el caso.
     */
    var tableEst = document.getElementById("tablaEstudiantes");
    var x = tableEst.rows.length;
    if (x > 1) {
        /*
         * 
         * @type Array: Se crea el arreglo que ira la funcion de agregarRow para 
         * que se genere una nueva fila en la tabla de agregaciones (indicadores)
         */
        var arrayRow = new Array();
        if (arg === "max") {
            arrayRow[0] = "Nota mas Alta";
            arrayRow[1] = maxi + ' / ' + 5;
            arrayRow[2] = ((maxi / 5) * 100).toFixed(2);
            agregarRow("tablaIndicadores", "max", arrayRow);
        }
        if (arg === "min") {
            arrayRow[0] = "Nota mas Baja";
            arrayRow[1] = mini + ' / ' + 5;
            arrayRow[2] = ((mini / 5) * 100).toFixed(2);
            agregarRow("tablaIndicadores", "min", arrayRow);
        }
        /*
         * 
         * @type Number Se busca dentro de las lista de Estudiantes quien poseen
         * la nota Maxima o Minima para luego sombrearlo con el color distintivo
         * segun se el caso.
         */
        var notaEstudiante = 0;
        for (i = 0; i < moduloDatos; i++) {

            notaEstudiante = parseFloat(datos.estudiantes[i].nota);

            //alert(notaEstudiante);

            if (notaEstudiante === maxi && arg === "max") {

                document.getElementById("row" + (i + 1)).style.backgroundColor = '#9cfc9c';/*Verde*/
            }
            if (notaEstudiante === mini && arg === "min") {

                document.getElementById("row" + (i + 1)).style.backgroundColor = '#ff9999';/*Rojo*/
            }
        }

    } else {
        /*
         * Se lanza la alerta si la tabla de Estudiantes aun no tiene registros
         */
        alert("Debe cargar tabla de calificaciones de Estudiantes");
    }
}
/*
 * Esta funcion permite calcula el promedio de notas del total de Estudiantes
 */
function promedioNotas() {
    var json = jsObj;
    /*
     * 
     * @type jsObj.estudiantes.length: Se obtiene la numero total de estudiantes
     * este sera el DENOMINADOR para calcular el cociente (promedio)
     */
    var nEstudiantes = json.estudiantes.length;
    var sumarNotas = 0;
    /*
     * Se suman las notas de todos los Estudiante, este sera el NUMERADOR para 
     * calcular el cociente que sera igual a nuestro promedio.
     */
    for (i = 0; i < nEstudiantes; i++) {
        sumarNotas += parseFloat(json.estudiantes[i].nota);
    }
    /*
     * Se crea arreglo para luego mediante la otra funcion agregarRow
     * se genera la fila en la tabla de indicadores
     * 
     * Asi mismo se calcula el promedio y la proporcion en base a 5 que es la 
     * nota maxima alcanzable.
     */
    var arrayRow = new Array();
    arrayRow[0] = "Promedio de Notas";
    arrayRow[1] = (sumarNotas / nEstudiantes).toFixed(2) + ' / ' + 5;
    arrayRow[2] = ((sumarNotas / nEstudiantes) / 5 * 100).toFixed(2);

    agregarRow("tablaIndicadores", "avg", arrayRow);
}
/*
 * Esta funcion permite contar los Estudiantes que estan por encima o por
 * debajo del promedio segun sea el caso.
 */
function countEstudiantesPromedio(arg) {
    var json = jsObj;
    var sumarNotas = 0;
    var nEstudiantes = json.estudiantes.length;

    for (i = 0; i < nEstudiantes; i++) {
        sumarNotas += parseFloat(json.estudiantes[i].nota);
    }
    var promedio = (sumarNotas / nEstudiantes);
    var jA = 0;
    var jB = 0;
    for (i = 0; i < nEstudiantes; i++) {

        if (json.estudiantes[i].nota >= promedio) {
            jA++;
        } else {
            jB++;
        }
    }
    var arrayRow = new Array();
    /*
     * Ademas de crearse el arreglo que  luego por medio de la funcion agregarRow
     * generara la fila, se realiza el calculo de proporcion de estudiantes por 
     * encima o debajo del promedio en base al total de estudiante.
     */
    if (arg === "max") {
        arrayRow[0] = "Nro. Estudiantes sobre el promedio";
        arrayRow[1] = jA + ' / ' + nEstudiantes;
        arrayRow[2] = ((jA / nEstudiantes) * 100).toFixed(2);
        agregarRow("tablaIndicadores", "eMax", arrayRow);
    }
    if (arg === "min") {
        arrayRow[0] = "Nro. Estudiantes debajo del promedio";
        arrayRow[1] = jB + ' / ' + nEstudiantes;
        arrayRow[2] = ((jB / nEstudiantes) * 100).toFixed(2);
        agregarRow("tablaIndicadores", "eMin", arrayRow);
    }


}
/*
 * Las funciones a continuacion simplemente se encargan de recibir la accion y
 * a su vez accionar la funcion que procesa la operacion seleccionada por el 
 * Usuario
 * 
 */

function mostrarEstudiantes() {
    generarTabla(jsObj, "tablaEstudiantes");


}
function mostrarNotaMas(arg) {
    buscarMaxMin(jsObj, arg);
}
function mostrarPromedio() {
    promedioNotas();

}
function mostrarCountEstudiantesPromedio(arg) {
    countEstudiantesPromedio(arg);

}
function crearEstudiante() {

    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;
    var nota = document.getElementById('nota').value;
    jsObj.estudiantes.push(
            {"codigo": codigo, "nombre": nombre, "nota": nota}
    );
    formularioEstudiante('none');
    mostrarEstudiantes();
}
function eliminarFilasTabla(idTable) {
    var tableHeaderRowCount = 1;
    var table = document.getElementById(idTable);
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}
function formularioEstudiante(display) {

    var ccodigo = jsObj.estudiantes.length;
    document.getElementById("codigo").value = ccodigo + 1;

    var ddE, ddR, ddF;

    if (display === 'block') {
        ddE = 'none';
        ddR = 'none';
        ddF = 'block';
    } else {
        ddE = 'block';
        ddR = 'block';
        ddF = 'none';
    }
    var divEstudiante = document.getElementById('divEstudiante');
    divEstudiante.setAttribute("style", "display:" + ddE);

    var divResultados = document.getElementById('divResultados');
    divResultados.setAttribute("style", "display:" + ddR);

    var divFormulario = document.getElementById('divFormulario');
    divFormulario.setAttribute("style", "display:" + ddF);
}