
document.addEventListener('DOMContentLoaded', () => {

    // creamos un objeto que contiene los campos del formulario para luego que esten llenos habilitar el boton de enviar
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // seleccionamos los elementos del formulario
    const inputEmail = document.querySelector('#email');
    const inputEmail2 = document.querySelector('#email2');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');

    // asignar eventos a los inputs
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail (e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            // creamos la alerta de envio exitoso 
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10','font-bold', 'text-sm','uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);

        
    }

    function validar (e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email [e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id ==='email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido' , e.target.parentElement)
            email [e.target.name] = '';
            comprobarEmail();
            return;
        }; 

        limpiarAlerta(e.target.parentElement);

        // asignar los valores al objero
        email [e.target.name] = e.target.value.trim().toLowerCase();
        //  comprobamos el onjeto de email
        comprobarEmail();
    }

    function mostrarAlerta (mensaje , referencia) {

        limpiarAlerta(referencia);

        // Generamos la alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // mostramos el error en pantalla
        referencia.appendChild(error);
    }

    // funcion para eliminar el mensaje de alerta luego de llenar el campo
    function limpiarAlerta (referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail (email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail () {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario () {
        // Reiniciamos el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        
        formulario.reset();
        comprobarEmail();
    }
});