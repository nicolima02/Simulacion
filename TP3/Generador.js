
// Clase para los datos del formulario
class DatosFormulario {
    constructor(tamaño, tipos, asesor) {
        this.tamaño = tamaño;
        this.tipos = tipos;
        this.asesor = asesor;
    }
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

    if (datosFormulario.tipos.some(valor => valor < 0) || datosFormulario.asesor.some(valor => valor < 0)) {
        alert('Los valores deben ser positivos.');
        return false; // La validación no pasó
    }

    // Si la validación pasa, retornar true
    return true;
}

// Función para generar los datos con base en los datos del formulario
function generarDatos(datosFormulario) {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
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

    // Crear un objeto de la clase DatosFormulario con los valores obtenidos
    const datosFormulario = new DatosFormulario(tamaño, tipos, asesor);

    return datosFormulario;
}

