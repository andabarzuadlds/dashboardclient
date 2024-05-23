window.addEventListener('load', function() {
    
    // PRIMER CONTENEDOR
    function actualizarKPIConTotalPedidos1() {
        let filas = document.querySelectorAll('tr');
    
        if (filas.length === 0) {
            return;
        }
    
        let sumaTotal = 0;
        let totalFilas = filas.length;
    
        filas.forEach(fila => {
            // Obtener la celda de estado (celda 6)
            let celdaEstado = fila.cells[6];
    
            // Verificar si la celda de estado contiene el texto "9.4 Cancelado" o "Cancelado Gestión Interna"
            if (celdaEstado && (celdaEstado.textContent.trim() === "9.4 Cancelado" || celdaEstado.textContent.trim() === "Cancelado gestión interna")) {
                return; // Ignora esta fila y continúa con la siguiente
            }
    
            // Continuar con la obtención y procesamiento del valor como antes
            let celdaValor = fila.cells[5];
            if (celdaValor) {
                let valorTexto = celdaValor.textContent.trim();
                valorTexto = valorTexto.replace(/\./g, '') // Elimina el punto que se usa como separador de miles
                                      .replace(/[^0-9]/g, ''); // Elimina cualquier otro carácter que no sea un número
    
                let valor = parseInt(valorTexto, 10);
                if (!isNaN(valor)) {
                    sumaTotal += valor;
                } else {
                    // Manejo de casos en los que el valor no es un número, si es necesario
                }
            }
        });
    
        let titulo = document.querySelector('#box-conversion-rate .kpi-content .title');
        let subtitulo = document.querySelector('#box-conversion-rate .kpi-content .subtitle');
        let valorElemento = document.querySelector('#box-conversion-rate .kpi-content .value');
    
        if (titulo && subtitulo && valorElemento) {
            titulo.textContent = 'Total de Pedidos';
            subtitulo.textContent = 'Valor Total';
            valorElemento.textContent = `${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(sumaTotal)}`;
        } else {
            // Manejo de casos en los que no se encuentran los elementos del DOM, si es necesario
        }
    }
    
    // Ejecutar la función después de 1 segundo
    setTimeout(actualizarKPIConTotalPedidos1, 1000);


    
    //TERCER CONTENEDOR
    function actualizarKPIConTotalPedidos3() {
        fetch('https://dlds.cl/obtenerPedidos/obtenerPedidos.php') // Reemplaza 'URL_DE_TU_API' con la URL real de tu API
            .then(response => response.json()) // Asume que la respuesta es un objeto JSON
            .then(data => {
                // Acceder al primer elemento del arreglo y a la propiedad 'total_sales_today_clp'
                let totalSalesTodayClp = data[0].total_sales_today_clp;
    
                // Convertir la cadena a un número
                let totalSales = parseInt(totalSalesTodayClp, 10);
    
                if (isNaN(totalSales)) {
                    return;
                }
    
                // Selecciona los elementos del KPI en el DOM
                let titulo = document.querySelector('#box-average-order .kpi-content .title');
                let subtitulo = document.querySelector('#box-average-order .kpi-content .subtitle');
                let valorElemento = document.querySelector('#box-average-order .kpi-content .value');
    
                // Actualiza los elementos del KPI con el valor obtenido de la API
                if (titulo && subtitulo && valorElemento) {
                    titulo.textContent = 'Total de Ventas del Día';
                    subtitulo.textContent = 'Valor de Venta';
                    valorElemento.textContent = `${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(totalSales)}`;
                } else {

                }
            })
            .catch(error => {

            });
    }
    
    // Ejecutar la función después de 1 segundo
    setTimeout(actualizarKPIConTotalPedidos3, 500);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //CONTENEDOR CLIENTE 1
    function actualizarKPIClientes1() {
        fetch('https://dlds.cl/obtenerPedidos/obtenerClientes.php')
            .then(response => response.json()) // Asume que la respuesta es un objeto JSON
            .then(data => {
                // Acceder a las propiedades 'avgOrderValue' y 'totalCustomers' del objeto
                let avg_order_value = data.avgOrderValue;
                let total_customers = data.totalCustomers;
    
                // Convertir las cadenas a números
                let avg_value = parseInt(avg_order_value, 10);
                let total_customers_value = parseInt(total_customers, 10);
    
                if (isNaN(avg_value) || isNaN(total_customers_value)) {
                    return;
                }
    
                // Selecciona los elementos del KPI en el DOM
                let titulo = document.querySelector('#box-gender .kpi-content .title');
                let subtitulo = document.querySelector('#box-gender .kpi-content .subtitle');
                let valorElemento = document.querySelector('#box-gender .kpi-content .value');
                let cantidadClientesElemento = document.querySelector('#box-gender .kpi-content .customer-count'); // Asegúrate de que este elemento exista
    
                // Si el elemento para la cantidad de clientes no existe, créalo
                if (!cantidadClientesElemento) {
                    cantidadClientesElemento = document.createElement('div');
                    cantidadClientesElemento.classList.add('customer-count');
                    document.querySelector('#box-gender .kpi-content').appendChild(cantidadClientesElemento);
                }
    
                // Actualiza los elementos del KPI con los valores obtenidos de la API
                if (titulo && subtitulo && valorElemento && cantidadClientesElemento) {
                    titulo.textContent = 'Club DLDS';
                    subtitulo.textContent = 'Ticket Promedio';
                    valorElemento.textContent = `${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(avg_value)}`;
                    cantidadClientesElemento.textContent = `Clientes en el grupo: ${total_customers_value}`;
                }
            })
            .catch(error => {
                // Manejo de error de la solicitud
                console.error('Error al actualizar KPI de clientes:', error);
            });
    }
    
    // Ejecutar la función después de 1 segundo
    setTimeout(actualizarKPIClientes1, 100); // Cambiado a 1000 para esperar 1 segundo


    //CONTENEDOR CLIENTE 2
    function actualizarKPIClientes2() {
    fetch('https://dlds.cl/obtenerPedidos/obtenerClientes2.php')
        .then(response => response.json()) // Asume que la respuesta es un objeto JSON
        .then(data => {
            // Acceder a las propiedades 'avgOrderValue' y 'totalCustomers' del objeto
            let avg_order_value = data.avgOrderValue;
            let total_customers = data.totalCustomers;

            // Convertir las cadenas a números
            let avg_value = parseInt(avg_order_value, 10);
            let total_customers_value = parseInt(total_customers, 10);

            if (isNaN(avg_value) || isNaN(total_customers_value)) {
                return;
            }
            
            var elemento = document.getElementById('box-age');
            elemento.classList.remove('-color2');

            // Selecciona los elementos del KPI en el DOM
            let titulo = document.querySelector('#box-age .kpi-content .title');
            let subtitulo = document.querySelector('#box-age .kpi-content .subtitle');
            let valorElemento = document.querySelector('#box-age .kpi-content .value');
            let cantidadClientesElemento = document.querySelector('#box-age .kpi-content .customer-count'); // Asegúrate de que este elemento exista

            // Si el elemento para la cantidad de clientes no existe, créalo
            if (!cantidadClientesElemento) {
                cantidadClientesElemento = document.createElement('div');
                cantidadClientesElemento.classList.add('customer-count');
                document.querySelector('#box-age .kpi-content').appendChild(cantidadClientesElemento);
            }

            // Actualiza los elementos del KPI con los valores obtenidos de la API
            if (titulo && subtitulo && valorElemento && cantidadClientesElemento) {
                let icono = document.querySelector('#box-age .kpi-content .material-icons');
    
                // Actualiza el icono cambiando el texto dentro del elemento <i>
                if (icono) {
                    icono.textContent = 'person'; // Reemplaza 'new_icon' con el nombre del nuevo icono que deseas
                }
                titulo.textContent = 'Franquicias';
                subtitulo.textContent = 'Ticket Promedio';
                valorElemento.textContent = `${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(avg_value)}`;
                cantidadClientesElemento.textContent = `Clientes en el grupo: ${total_customers_value}`;
            }
        })
        .catch(error => {
            // Manejo de error de la solicitud
            console.error('Error al actualizar KPI de clientes:', error);
        });
        }
        
        // Ejecutar la función después de 1 segundo
        setTimeout(actualizarKPIClientes2, 100); // Cambiado a 1000 para esperar 1 segundo

        //CONTENEDOR CLIENTE 3
        function actualizarKPIClientes3() {
        fetch('https://dlds.cl/obtenerPedidos/obtenerClientes3.php')
            .then(response => response.json()) // Asume que la respuesta es un objeto JSON
            .then(data => {
                // Acceder a las propiedades 'avgOrderValue' y 'totalCustomers' del objeto
                let avg_order_value = data.avgOrderValue;
                let total_customers = data.totalCustomers;
    
                // Convertir las cadenas a números
                let avg_value = parseInt(avg_order_value, 10);
                let total_customers_value = parseInt(total_customers, 10);
    
                if (isNaN(avg_value) || isNaN(total_customers_value)) {
                    return;
                }
                
                // Selecciona los elementos del KPI en el DOM
                let titulo = document.querySelector('#box-orders .kpi-content .title');
                let subtitulo = document.querySelector('#box-orders .kpi-content .subtitle');
                let valorElemento = document.querySelector('#box-orders .kpi-content .value');
                let cantidadClientesElemento = document.querySelector('#box-orders .kpi-content .customer-count'); // Asegúrate de que este elemento exista
    
                // Si el elemento para la cantidad de clientes no existe, créalo
                if (!cantidadClientesElemento) {
                    cantidadClientesElemento = document.createElement('div');
                    cantidadClientesElemento.classList.add('customer-count');
                    document.querySelector('#box-orders .kpi-content').appendChild(cantidadClientesElemento);
                }
    
                // Actualiza los elementos del KPI con los valores obtenidos de la API
                if (titulo && subtitulo && valorElemento && cantidadClientesElemento) {
                    let icono = document.querySelector('#box-orders .kpi-content .material-icons');
        
                    // Actualiza el icono cambiando el texto dentro del elemento <i>
                    if (icono) {
                        icono.textContent = 'person'; // Reemplaza 'new_icon' con el nombre del nuevo icono que deseas
                    }
                    titulo.textContent = 'Silver';
                    subtitulo.textContent = 'Ticket Promedio';
                    valorElemento.textContent = `${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(avg_value)}`;
                    cantidadClientesElemento.textContent = `Clientes en el grupo: ${total_customers_value}`;
                }
            })
            .catch(error => {
                // Manejo de error de la solicitud
                console.error('Error al actualizar KPI de clientes:', error);
            });
            }
            
            // Ejecutar la función después de 1 segundo
            setTimeout(actualizarKPIClientes3, 100); // Cambiado a 1000 para esperar 1 segundo
            
            //CONTENEDOR CLIENTE 3
            function actualizarKPIClientes4() {
            fetch('https://dlds.cl/obtenerPedidos/obtenerClientes4.php')
                .then(response => response.json()) // Asume que la respuesta es un objeto JSON
                .then(data => {
                    // Acceder a las propiedades 'avgOrderValue' y 'totalCustomers' del objeto
                    let avg_order_value = data.avgOrderValue;
                    let total_customers = data.totalCustomers;
        
                    // Convertir las cadenas a números
                    let avg_value = parseInt(avg_order_value, 10);
                    let total_customers_value = parseInt(total_customers, 10);
        
                    if (isNaN(avg_value) || isNaN(total_customers_value)) {
                        return;
                    }

                    // Selecciona los elementos del KPI en el DOM
                    let titulo = document.querySelector('#box-newsletter .kpi-content .title');
                    let subtitulo = document.querySelector('#box-newsletter .kpi-content .subtitle');
                    let valorElemento = document.querySelector('#box-newsletter .kpi-content .value');
                    let cantidadClientesElemento = document.querySelector('#box-newsletter .kpi-content .customer-count'); // Asegúrate de que este elemento exista
        
                    // Si el elemento para la cantidad de clientes no existe, créalo
                    if (!cantidadClientesElemento) {
                        cantidadClientesElemento = document.createElement('div');
                        cantidadClientesElemento.classList.add('customer-count');
                        document.querySelector('#box-newsletter .kpi-content').appendChild(cantidadClientesElemento);
                    }
        
                    // Actualiza los elementos del KPI con los valores obtenidos de la API
                    if (titulo && subtitulo && valorElemento && cantidadClientesElemento) {
                        let icono = document.querySelector('#box-newsletter .kpi-content .material-icons');
            
                        // Actualiza el icono cambiando el texto dentro del elemento <i>
                        if (icono) {
                            icono.textContent = 'person'; // Reemplaza 'new_icon' con el nombre del nuevo icono que deseas
                        }
                        titulo.textContent = 'Gold';
                        subtitulo.textContent = 'Ticket Promedio';
                        valorElemento.textContent = `${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(avg_value)}`;
                        cantidadClientesElemento.textContent = `Clientes en el grupo: ${total_customers_value}`;
                    }
                })
                .catch(error => {
                    // Manejo de error de la solicitud
                    console.error('Error al actualizar KPI de clientes:', error);
                });
                }
                
                // Ejecutar la función después de 1 segundo
                setTimeout(actualizarKPIClientes4, 100); // Cambiado a 1000 para esperar 1 segundo
                
                
                //AGREGAR NUEVO DIV PARA CLIENTE 5
            function agregarDivKPI() {
                const kpiRows = document.querySelectorAll('#box-gender');
                
                if (kpiRows.length === 0) {
                  console.error('No se encontraron filas de KPI con la clase .kpi-row.');
                } else {
                  kpiRows.forEach((row) => {
                    if (!row.parentNode) {
                      console.error('No se encontró el nodo padre para una fila de KPI:', row);
                      return; // Continúa con el siguiente elemento de kpiRows
                    }
                
                    // Crea el nuevo div como antes
                    const newDiv = document.createElement('div');
                    newDiv.className = 'container text-center';
                    newDiv.innerHTML = `
                        <div class="row">
                            <div id="box-black" class="kpi-container box-stats">
                                <div class="kpi-content -color1" data-original-title="" data-toggle="pstooltip">
                                    <i class="material-icons">person</i>
                                    <span class="title">Black</span>
                                    <span class="subtitle">Ticket Promedio</span>
                                    <span class="value">$0</span>
                                    <div class="customer-count">Clientes en el grupo: 0
                                    
                                    </div>
                                </div>
                            </div>
                        </div>`;
                
                    // Inserta el nuevo div justo después de la fila actual de KPIs
                    row.parentNode.insertBefore(newDiv, row.nextSibling);
                  });
                }
                setTimeout(agregarDivKPI, 100);
            }
                
                
                //AGREGAR NUEVO DIV PARA CLIENTE 6
                const kpiRows = document.querySelectorAll('#box-age');
                
                if (kpiRows.length === 0) {
                  console.error('No se encontraron filas de KPI con el id #box-age.');
                } else {
                  kpiRows.forEach((row) => {
                    if (!row.parentNode) {
                      console.error('No se encontró el nodo padre para una fila de KPI:', row);
                      return; // Continúa con el siguiente elemento de kpiRows
                    }
                
                    // Crea el nuevo div como antes
                    const newDiv = document.createElement('div');
                    newDiv.className = 'container text-center';
                    newDiv.innerHTML = `
                        <div class="row">
                            <div id="box-astro" class="kpi-container box-stats">
                                <div class="kpi-content -color1" data-original-title="" data-toggle="pstooltip">
                                    <i class="material-icons">person</i>
                                    <span class="title">Astro SPA</span>
                                    <span class="subtitle">Ticket Promedio</span>
                                    <span class="value">$0</span>
                                    <div class="customer-count">Clientes en el grupo: 0
                                    
                                    </div>
                                </div>
                            </div>
                        </div>`;
                
                    // Inserta el nuevo div justo después de la fila actual de KPIs
                    row.parentNode.insertBefore(newDiv, row.nextSibling);
                  });
                }
                
                
                //AGREGAR NUEVO DIV PARA CLIENTE 7
                const kpiRows = document.querySelectorAll('#box-orders');
                
                if (kpiRows.length === 0) {
                  console.error('No se encontraron filas de KPI con la clase .kpi-row.');
                } else {
                  kpiRows.forEach((row) => {
                    if (!row.parentNode) {
                      console.error('No se encontró el nodo padre para una fila de KPI:', row);
                      return; // Continúa con el siguiente elemento de kpiRows
                    }
                
                    // Crea el nuevo div como antes
                    const newDiv = document.createElement('div');
                    newDiv.className = 'container text-center';
                    newDiv.innerHTML = `
                        <div class="row">
                            <div id="box-tabaco" class="kpi-container box-stats">
                                <div class="kpi-content -color1" data-original-title="" data-toggle="pstooltip">
                                    <i class="material-icons">person</i>
                                    <span class="title">Tabaquería</span>
                                    <span class="subtitle">Ticket Promedio</span>
                                    <span class="value">$0</span>
                                    <div class="customer-count">Clientes en el grupo: 0
                                    
                                    </div>
                                </div>
                            </div>
                        </div>`;
                
                    // Inserta el nuevo div justo después de la fila actual de KPIs
                    row.parentNode.insertBefore(newDiv, row.nextSibling);
                  });
                }
                
                //AGREGAR NUEVO DIV PARA CLIENTE 8
                const kpiRows = document.querySelectorAll('#box-newsletter');
                
                if (kpiRows.length === 0) {
                  console.error('No se encontraron filas de KPI con la clase .kpi-row.');
                } else {
                  kpiRows.forEach((row) => {
                    if (!row.parentNode) {
                      console.error('No se encontró el nodo padre para una fila de KPI:', row);
                      return; // Continúa con el siguiente elemento de kpiRows
                    }
                
                    // Crea el nuevo div como antes
                    const newDiv = document.createElement('div');
                    newDiv.className = 'container text-center';
                    newDiv.innerHTML = `
                        <div class="row">
                            <div id="box-fin" class="kpi-container box-stats">
                                <div class="kpi-content -color1" data-original-title="" data-toggle="pstooltip">
                                    <i class="material-icons">person</i>
                                    <span class="title">Por rellenar</span>
                                    <span class="subtitle">Ticket Promedio</span>
                                    <span class="value">$0</span>
                                    <div class="customer-count">Clientes en el grupo: 0
                                    
                                    </div>
                                </div>
                            </div>
                        </div>`;
                
                    // Inserta el nuevo div justo después de la fila actual de KPIs
                    row.parentNode.insertBefore(newDiv, row.nextSibling);
                  });
                }
                            

});


