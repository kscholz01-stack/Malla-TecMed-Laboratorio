document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE LA CARRERA DE TECNOLOGÍA MÉDICA ---
    // He convertido tu lista de ramos y requisitos a un formato que JavaScript puede usar.
    // 'id' es un identificador único que he creado para cada ramo.
    // 'requisitos' usa estos 'id' para enlazar las dependencias.

    const mallaData = [
        // Semestre 1
        { id: 'GIS1', nombre: 'Gestión e investigación en salud I', semestre: 1, requisitos: [] },
        { id: 'ITM1', nombre: 'Introducción a Tecnología Médica', semestre: 1, requisitos: [] },
        { id: 'MORF1', nombre: 'Morfología I', semestre: 1, requisitos: [] },
        { id: 'FMPB1', nombre: 'Fundamentos moleculares de los procesos biológicos I', semestre: 1, requisitos: [] },
        { id: 'MAT1', nombre: 'Matemáticas', semestre: 1, requisitos: [] },
        { id: 'QUIM1', nombre: 'Química', semestre: 1, requisitos: [] },

        // Semestre 2
        { id: 'GIS2', nombre: 'Gestión e investigación en salud II', semestre: 2, requisitos: ['GIS1'] },
        { id: 'MORF2', nombre: 'Morfología II', semestre: 2, requisitos: ['MORF1'] },
        { id: 'FMPB2', nombre: 'Fundamentos moleculares de los procesos biológicos II', semestre: 2, requisitos: ['FMPB1'] },
        { id: 'FIS1', nombre: 'Física general', semestre: 2, requisitos: [] },

        // Semestre 3
        { id: 'GIS3', nombre: 'Gestión e investigación en salud III', semestre: 3, requisitos: ['GIS2'] },
        { id: 'PFI1', nombre: 'Principios fundamentales de instrumentación', semestre: 3, requisitos: ['FIS1'] },
        { id: 'FBPF1', nombre: 'Fundamentos biológicos de procesos funcionales', semestre: 3, requisitos: ['FMPB2'] },
        { id: 'EFG1', nombre: 'Electivo de formación general', semestre: 3, requisitos: [] },

        // Semestre 4
        { id: 'GIS4', nombre: 'Gestión e investigación en salud IV', semestre: 4, requisitos: ['GIS3'] },
        { id: 'BQC1', nombre: 'Bioquímica clínica I', semestre: 4, requisitos: ['QUIM1'] },
        { id: 'PARA1', nombre: 'Parasitología I', semestre: 4, requisitos: [] },
        { id: 'INMU1', nombre: 'Inmunología', semestre: 4, requisitos: ['FBPF1'] },
        { id: 'MGU1', nombre: 'Módulo genito-urinario', semestre: 4, requisitos: ['MORF2'] },

        // Semestre 5
        { id: 'BQC2', nombre: 'Bioquímica clínica II', semestre: 5, requisitos: ['BQC1'] },
        { id: 'HEMA1', nombre: 'Hematología I', semestre: 5, requisitos: ['INMU1'] },
        { id: 'SDIG1', nombre: 'Sistema digestivo', semestre: 5, requisitos: ['MORF2'] },
        { id: 'EFP1', nombre: 'Electivo de formación profesional', semestre: 5, requisitos: [] },

        // Semestre 6
        { id: 'INV1', nombre: 'Investigación I', semestre: 6, requisitos: ['GIS4'] },
        { id: 'BQC3', nombre: 'Bioquímica clínica III', semestre: 6, requisitos: ['BQC2'] },
        { id: 'HEMA2', nombre: 'Hematología II', semestre: 6, requisitos: ['HEMA1'] },
        { id: 'SCV1', nombre: 'Sistema cardiovascular', semestre: 6, requisitos: ['MORF2'] },

        // Semestre 7
        { id: 'INV2', nombre: 'Investigación II', semestre: 7, requisitos: ['INV1'] },
        { id: 'PARA2', nombre: 'Parasitología II', semestre: 7, requisitos: ['PARA1'] },
        { id: 'MICRO1', nombre: 'Microbiología I', semestre: 7, requisitos: [] },
        { id: 'SEND1', nombre: 'Sistema endocrino y reproductor', semestre: 7, requisitos: ['MORF2'] },

        // Semestre 8
        { id: 'SGI1', nombre: 'Seminario, gestión o investigación I', semestre: 8, requisitos: ['INV2'] },
        { id: 'BS1', nombre: 'Banco de sangre I', semestre: 8, requisitos: ['HEMA2'] },
        { id: 'MICRO2', nombre: 'Microbiología II', semestre: 8, requisitos: ['MICRO1'] },
        { id: 'SINM1', nombre: 'Sistema inmune', semestre: 8, requisitos: ['INMU1'] },

        // Semestre 9
        { id: 'SGI2', nombre: 'Seminario, gestión o investigación II', semestre: 9, requisitos: ['SGI1'] },
        { id: 'BS2', nombre: 'Banco de sangre II', semestre: 9, requisitos: ['BS1'] },
        { id: 'MIEP1', nombre: 'Módulo integrado Enfermedades prioritarias', semestre: 9, requisitos: ['SINM1'] },

        // Semestre 10
        { id: 'PPC1', nombre: 'Práctica profesional controlada', semestre: 10, requisitos: [
            // Todos los ramos de S1 a S9 son requisitos
            'GIS1', 'ITM1', 'MORF1', 'FMPB1', 'MAT1', 'QUIM1', 'GIS2', 'MORF2', 'FMPB2', 'FIS1',
            'GIS3', 'PFI1', 'FBPF1', 'EFG1', 'GIS4', 'BQC1', 'PARA1', 'INMU1', 'MGU1', 'BQC2',
            'HEMA1', 'SDIG1', 'EFP1', 'INV1', 'BQC3', 'HEMA2', 'SCV1', 'INV2', 'PARA2', 'MICRO1',
            'SEND1', 'SGI1', 'BS1', 'MICRO2', 'SINM1', 'SGI2', 'BS2', 'MIEP1'
        ]},
    ];

    // --- LÓGICA DE LA APLICACIÓN ---

    const mallaContainer = document.getElementById('malla-container');
    const notificationContainer = document.getElementById('notification-container');
    const resetButton = document.getElementById('reset-button');
    let aprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobadosTM')) || []);
    const ramosMap = new Map(mallaData.map(ramo => [ramo.id, ramo]));

    const motivationalMessages = [
        "¡Excelente! Un paso más cerca de la meta.",
        "¡Sigue así! El esfuerzo de hoy es el éxito de mañana.",
        "¡Ramo aprobado! Cada logro cuenta.",
        "¡Felicidades! Estás construyendo un gran futuro.",
        "¡Lo lograste! La perseverancia rinde frutos.",
        "¡Un ramo menos! Tu dedicación es admirable."
    ];

    function guardarEstado() {
        localStorage.setItem('ramosAprobadosTM', JSON.stringify(Array.from(aprobados)));
    }

    function mostrarNotificacion(mensaje, tipo = 'error') {
        const notificacion = document.createElement('div');
        notificacion.className = `notification ${tipo}`;
        notificacion.textContent = mensaje;
        notificationContainer.appendChild(notificacion);

        // Forzar la animación de entrada
        setTimeout(() => notificacion.classList.add('show'), 10);

        // Ocultar y eliminar la notificación después de 4 segundos
        setTimeout(() => {
            notificacion.classList.remove('show');
            notificacion.addEventListener('transitionend', () => notificacion.remove());
        }, 4000);
    }

    function verificarRequisitos(ramoId) {
        const ramo = ramosMap.get(ramoId);
        if (!ramo || !ramo.requisitos || ramo.requisitos.length === 0) {
            return { cumplidos: true, faltantes: [] };
        }
        const faltantes = ramo.requisitos.filter(reqId => !aprobados.has(reqId));
        return {
            cumplidos: faltantes.length === 0,
            faltantes: faltantes.map(reqId => ramosMap.get(reqId)?.nombre || reqId)
        };
    }

    function actualizarVisualizacionRamos() {
        document.querySelectorAll('.ramo').forEach(div => {
            const ramoId = div.dataset.id;
            const check = verificarRequisitos(ramoId);
            div.classList.remove('aprobado', 'bloqueado');

            if (aprobados.has(ramoId)) {
                div.classList.add('aprobado');
            } else if (!check.cumplidos) {
                div.classList.add('bloqueado');
            }
        });
    }

    function handleClickRamo(e) {
        const ramoDiv = e.target.closest('.ramo');
        if (!ramoDiv) return;

        const ramoId = ramoDiv.dataset.id;
        if (aprobados.has(ramoId)) {
            aprobados.delete(ramoId);
        } else {
            const { cumplidos, faltantes } = verificarRequisitos(ramoId);
            if (cumplidos) {
                aprobados.add(ramoId);
                const mensajeMotivacional = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
                mostrarNotificacion(mensajeMotivacional, 'success');
            } else {
                mostrarNotificacion(`Requisitos faltantes: ${faltantes.join(', ')}`);
                return;
            }
        }
        guardarEstado();
        actualizarVisualizacionRamos();
    }

    function generarMalla() {
        const maxSemestre = Math.max(...mallaData.map(r => r.semestre));
        for (let i = 1; i <= maxSemestre; i++) {
            const columna = document.createElement('div');
            columna.className = 'semestre-columna';
            columna.innerHTML = `<h2 class="semestre-titulo">Semestre ${i}</h2>`;
            mallaContainer.appendChild(columna);
            
            mallaData.filter(r => r.semestre === i).forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.className = 'ramo';
                ramoDiv.dataset.id = ramo.id;
                ramoDiv.textContent = ramo.nombre;
                columna.appendChild(ramoDiv);
            });
        }
    }

    // --- INICIALIZACIÓN DE LA APLICACIÓN ---
    generarMalla();
    actualizarVisualizacionRamos();
    mallaContainer.addEventListener('click', handleClickRamo);
    resetButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro/a de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
            aprobados.clear();
            guardarEstado();
            actualizarVisualizacionRamos();
        }
    });
});
