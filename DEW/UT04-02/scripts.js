document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-registro");
    const mostrarContrasenaCheckbox = document.getElementById("mostrar-contrasena");
    const inputContrasena = document.getElementById("contrasena");
    const aficionesWrapper = document.getElementById("aficiones-wrapper");
    const aficionesCheckboxes = document.querySelectorAll('input[name="Aficiones"]');
    const mensajeErrorAficiones = document.querySelector(".mensaje-error");

    // Mostrar u ocultar contraseña
    mostrarContrasenaCheckbox.addEventListener("change", () => {
        inputContrasena.type = mostrarContrasenaCheckbox.checked ? "text" : "password";
    });

    // Configurar las reglas de validación personalizadas
    const setValidationMessage = () => {
        // Validar contraseña
        if (!/^\d{8}$/.test(inputContrasena.value)) {
            inputContrasena.setCustomValidity("La contraseña debe ser exactamente 8 dígitos numéricos.");
        } else {
            inputContrasena.setCustomValidity("");
        }

        // Validar DNI/NIE
        const tipoDocumento = document.getElementById("tipo-documento").value;
        const numeroDNI = document.getElementById("numero-dni");

        if (tipoDocumento === "dni" && !/^\d{8}[A-Z]$/.test(numeroDNI.value)) {
            numeroDNI.setCustomValidity("El DNI debe tener 8 números y una letra mayúscula.");
        } else if (tipoDocumento === "nie" && !/^[XYZ]\d{7}[A-Z]$/.test(numeroDNI.value)) {
            numeroDNI.setCustomValidity("El NIE debe comenzar con X, Y o Z seguido de 7 números y una letra.");
        } else {
            numeroDNI.setCustomValidity("");
        }

        // Validar aficiones (debe haber al menos dos seleccionadas)
        const seleccionadas = Array.from(aficionesCheckboxes).filter((checkbox) => checkbox.checked);
        if (seleccionadas.length < 2) {
            mensajeErrorAficiones.textContent = "Debe seleccionar al menos dos aficiones.";
            aficionesWrapper.setCustomValidity("Debe seleccionar al menos dos aficiones.");
        } else {
            mensajeErrorAficiones.textContent = "";
            aficionesWrapper.setCustomValidity("");
        }
    };

    // Mostrar mensajes de error junto al campo correspondiente
    const actualizarMensajes = () => {
        const elementos = form.querySelectorAll("input, select, #aficiones-wrapper");

        elementos.forEach((elemento) => {
            const mensajeExistente = elemento.nextElementSibling;
            if (mensajeExistente && mensajeExistente.classList.contains("error-mensaje")) {
                mensajeExistente.remove(); // Limpiar mensajes previos
            }

            if (!elemento.checkValidity()) {
                const error = document.createElement("span");
                error.textContent = elemento.validationMessage;
                error.classList.add("error-mensaje");
                elemento.insertAdjacentElement("afterend", error);
            }
        });
    };

    // Validar formulario al enviar
    form.addEventListener("submit", (event) => {
        setValidationMessage();
        actualizarMensajes();
        if (!form.checkValidity()) {
            event.preventDefault(); // Evitar envío si hay errores
        } else {
            alert("Formulario enviado correctamente.");
        }
    });

    // Validar dinámicamente al escribir o cambiar
    form.addEventListener("input", () => {
        setValidationMessage();
        actualizarMensajes();
    });

    form.addEventListener("change", () => {
        setValidationMessage();
        actualizarMensajes();
    });
});