

// Clase para los datos del formulario
class DatosFormulario {
    constructor(tamaño, tipos, asesor, rango) {
        this.tamaño = tamaño;
        this.tipos = tipos;
        this.asesor = asesor;
        this.rango = rango;
    }
}

class Mail{
    constructor(numero, random1, tipo, random2, asesor, cantidaAsesores){
        this.numero = numero;
        this.random1 = random1;
        this.tipo = tipo;
        this.random2 = random2;
        this.asesor = asesor;
        this.cantidaAsesores = cantidaAsesores;
    }
}

const generarRandom = (desde, hasta) =>{
    
    if (desde >= hasta) {
        console.error('El valor "desde" debe ser menor que el valor "hasta".');
        return null;
    }

    let numeroAleatorio = Math.random() * (hasta - desde) + desde;
    return numeroAleatorio.toFixed(2); // Convierte el número en una cadena con dos decimales
} 

// Función para validar los datos del formulario
function validarDatos(datosFormulario) {
    // Verificar si algún campo está vacío
    if (!datosFormulario.tamaño || !datosFormulario.tipos[0] || !datosFormulario.tipos[1] || !datosFormulario.tipos[2] || !datosFormulario.asesor[0] || !datosFormulario.asesor[1] || !datosFormulario.asesor[2] || !datosFormulario.asesor[3] || !datosFormulario.asesor[4] || !datosFormulario.asesor[5]) {
        alert('Por favor, complete todos los campos.');
        return false; // La validación no pasó
    }

    // Verificar si algún valor es negativo
    if (datosFormulario.tamaño < 0) {
        alert('El tamaño de la muestra debe ser un numero positivo.');
        return false; // La validación no pasó
    }

    if (datosFormulario.tipos.some(valor => 1 >= valor <= 0) || datosFormulario.asesor.some(valor => 1 >= valor <= 0)) {
        alert('Los valores de las probabilidades deben ser positivos entre 0,01 y 0,99.');
        return false; // La validación no pasó
    }

    if (datosFormulario.rango[0] > datosFormulario.rango[1]){
        alert('El rango de filas es incorrecto. El valor desde debe ser menor al valor hasta.');
        return false;
    }

    if (datosFormulario.rango[0] <= 0){
        alert('El rango de filas es incorrecto. El valor desde debe ser positivo.');
        return false;
    }

    if (datosFormulario.rango[1] > datosFormulario.tamaño){
        alert('El rango de filas es incorrecto. El valor hasta debe ser Menor o igual al tamaño de la muestra.');
        return false;
    }

    if ((datosFormulario.tipos[0] + datosFormulario.tipos[1] + datosFormulario.tipos[2]) != 1){
        alert('La suma de las probabilidades de los tipos de destinatarios debe dar 1.');
        return false;
    }

    if ((datosFormulario.asesor[0] + datosFormulario.asesor[1]) != 1){
        alert('La suma de las probabilidades de los asesores para el destinatario paciente debe dar 1.');
        return false;
    }

    if ((datosFormulario.asesor[2] + datosFormulario.asesor[3]) != 1){
        alert('La suma de las probabilidades de los asesores para el destinatario que asistio a la clinica debe dar 1.');
        return false;
    }

    if ((datosFormulario.asesor[4] + datosFormulario.asesor[5]) != 1){
        alert('La suma de las probabilidades de los asesores para el destinatario que nunca asistio a la clinica debe dar 1.');
        return false;
    }
    // Si la validación pasa, retornar true
    return true;
}

const calcularTipo = (rnd1,tipos) =>{
    let tipo = "";
    if(rnd1 < tipos[0]){
        tipo = "Paciente"
    }
    if(rnd1 < tipos[0] + tipos[1]){
        tipo = "Asistio a la clinica"
    }
    else{
        tipo = "Nunca Asistio a la clinica"
    }

    return tipo
}

const calcularAsesor = (rnd2,asesores,tipo) =>{
    let asesor = "";
    if(tipo == "Paciente"){
        if(rnd2 < asesores[0]){
            asesor = "si"
        }
        else{
            asesor = "no"
        }
    }
    if(tipo == "Asistio a la clinica"){
        if(rnd2 < asesores[2]){
            asesor = "si"
        }
        else{
            asesor = "no"
        }
    }
    else{
        if(rnd2 < asesores[4]){
            asesor = "si"
        }
        else{
            asesor = "no"
        }
    }

    return asesor
}

// Función para generar los datos con base en los datos del formulario
function generarDatos(datosFormulario) {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let cont = 0;
        let datosMails = [];
        let ultimoMail = new Mail(0, 0, "", 0, "", 0);
        while (cont < datosFormulario.tamaño) {
            cont ++;
            console.log(cont)
            let rnd1 = generarRandom(0, 1);
            let rnd2 = generarRandom(0, 1);
            console.log(rnd1);
            console.log(rnd2);
            let tipo = calcularTipo(rnd1, datosFormulario.tipos);
            let asesor = calcularAsesor(rnd2, datosFormulario.asesor, tipo);
            let cantidad = ultimoMail.cantidaAsesores;
            if (asesor == "si") {
                cantidad = cantidad + 1;
            }
            const mail = new Mail(cont, rnd1, tipo, rnd2, asesor, cantidad);
            
            if ((cont >= datosFormulario.rango[0] && cont <= datosFormulario.rango[1]) || cont == datosFormulario.tamaño) {
                datosMails.push(mail);
                console.log("Mail agregado:", mail);
            } else {
                console.log("Mail no agregado.");
            }

            ultimoMail = mail;
        console.log(datosMails)

        let tablaMails = document.querySelector('.tbody');

        // Limpiamos el contenido actual de la tabla
        tablaMails.innerHTML = '';
    
        // Iteramos sobre la lista de mails y creamos las filas de la tabla
        datosMails.forEach(mail => {
            let fila = tablaMails.insertRow();
    
            // Insertamos las celdas con la información de cada mail
            fila.insertCell().textContent = mail.numero;
            fila.insertCell().textContent = mail.random1;
            fila.insertCell().textContent = mail.tipo;
            fila.insertCell().textContent = mail.random2;
            fila.insertCell().textContent = mail.asesor;
            fila.insertCell().textContent = mail.cantidaAsesores;
        });
    } 



        // Por ejemplo, puedes realizar cálculos, operaciones, etc.
    } else {
        console.log('Los datos ingresados no son válidos.');
        // Aquí puedes mostrar un mensaje al usuario indicando que los datos no son válidos
    }
}

// Obtener los valores de los inputs y crear un objeto de la clase DatosFormulario
function obtenerDatosFormulario() {
    const tamaño = parseInt(document.getElementById('tamaño').value);
    const tipos = [
        parseFloat(document.getElementById('tipo1').value),
        parseFloat(document.getElementById('tipo2').value),
        parseFloat(document.getElementById('tipo3').value)
    ];
    const asesor = [
        parseFloat(document.getElementById('asesorTipo1Si').value),
        parseFloat(document.getElementById('asesorTipo1No').value),
        parseFloat(document.getElementById('asesorTipo2Si').value),
        parseFloat(document.getElementById('asesorTipo2No').value),
        parseFloat(document.getElementById('asesorTipo3Si').value),
        parseFloat(document.getElementById('asesorTipo3No').value)
    ];
    const rango = [
        parseInt(document.getElementById('rangoDesde').value),
        parseInt(document.getElementById('rangoHasta').value)
    ]

    // Crear un objeto de la clase DatosFormulario con los valores obtenidos
    const datosFormulario = new DatosFormulario(tamaño, tipos, asesor, rango);

    return datosFormulario;
}

