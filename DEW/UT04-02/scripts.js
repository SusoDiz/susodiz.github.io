// Definir el objeto DOM para centralizar el acceso a los elementos del formulario
const DOM = {
    formulario: document.getElementById("formulario-registro"),
    passwordInput: document.getElementById("contrasena"),
    mostrarContrasenaCheckbox: document.getElementById("mostrar-contrasena"),
    tipoCuentaRadios: document.querySelectorAll('input[name="tipo-cuenta"]'),
    aficionesCheckboxes: document.querySelectorAll('input[name="aficiones[]"]'),
};

// Función para mostrar/ocultar la contraseña
const togglePasswordVisibility = () => {
    DOM.mostrarContrasenaCheckbox.addEventListener("change", () => {
        DOM.passwordInput.type = DOM.mostrarContrasenaCheckbox.checked ? "text" : "password";
    });
};

// Función para validar que se ha seleccionado una opción en "Crear cuenta como"
const validateTipoCuenta = () => {
    const tipoCuentaSeleccionado = Array.from(DOM.tipoCuentaRadios).some(radio => radio.checked);
    if (!tipoCuentaSeleccionado) {
        alert("Por favor, selecciona una opción en 'Crear cuenta como'.");
        return false;
    }
    return true;
};

// Función para validar que se ha seleccionado al menos una afición
const validateAficiones = () => {
    const aficionSeleccionada = Array.from(DOM.aficionesCheckboxes).some(checkbox => checkbox.checked);
    if (!aficionSeleccionada) {
        alert("Por favor, selecciona al menos una afición.");
        return false;
    }
    return true;
};

// Función para validar el formulario
const validateForm = (event) => {
    if (!validateTipoCuenta() || !validateAficiones()) {
        event.preventDefault(); // Evitar el envío del formulario si las validaciones fallan
    }
};

// Configuración inicial
const init = () => {
    togglePasswordVisibility(); // Mostrar/ocultar la contraseña

    // Validación del formulario al enviar
    DOM.formulario.addEventListener("submit", validateForm);
};

// Ejecutar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", init);