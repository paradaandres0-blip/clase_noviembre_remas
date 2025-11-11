// [Español]: Inicializa el buffer mostrado en pantalla con "0". / [English]: Initializes the display buffer with "0".
let buffer = "0";

// [Español]: Guarda el valor temporal en memoria para operaciones encadenadas. / [English]: Stores the temporary value in memory for chained operations.
let memoria = null;

// [Español]: Guarda el último operador presionado (+, -, *, /). / [English]: Stores the last operator pressed (+, -, *, /).
let ultimoOperador = null;

// [Español]: Actualiza el contenido del elemento de la pantalla con el valor actual del buffer. / [English]: Updates the display element content with the current buffer value.
function updateScreen() {
  // [Español]: Selecciona el elemento con id "display" y le asigna el texto del buffer. / [English]: Selects the element with id "display" and assigns the buffer text.
  document.getElementById("display").innerText = buffer;
}

// [Español]: Maneja la entrada de números y el punto decimal. / [English]: Handles numeric input and the decimal point.
function handleNumber(value) {
  // [Español]: Si el buffer es "0" y se ingresa un número distinto de ".", reemplaza el buffer. / [English]: If buffer is "0" and a non "." number is entered, replace the buffer.
  if (buffer === "0" && value !== ".") {
    // [Español]: Asigna el nuevo número al buffer. / [English]: Assigns the new number to the buffer.
    buffer = value;
  } else if (value === "." && buffer.includes(".")) {
    // [Español]: Si ya hay un punto decimal en el buffer, no hace nada (evita múltiples puntos). / [English]: If there's already a decimal point in the buffer, do nothing (prevents multiple dots).
    return;
  } else {
    // [Español]: Concatena la entrada al buffer (agrega dígitos o el punto). / [English]: Concatenates the input to the buffer (adds digits or the dot).
    buffer += value;
  }
  // [Español]: Refresca la pantalla para mostrar el nuevo buffer. / [English]: Refreshes the screen to show the new buffer.
  updateScreen();
}

// [Español]: Maneja símbolos especiales y operadores (C, +, -, *, /, =). / [English]: Handles special symbols and operators (C, +, -, *, /, =).
function handleSymbol(symbol) {
  // [Español]: Evalúa el símbolo recibido para ejecutar la acción correspondiente. / [English]: Evaluates the received symbol to execute the corresponding action.
  switch (symbol) {
    // [Español]: Caso "C": reinicia buffer, memoria y operador. / [English]: Case "C": resets buffer, memory and operator.
    case "C":
      buffer = "0";
      memoria = null;
      ultimoOperador = null;
      break;

    // [Español]: Casos de operadores: guarda y prepara la operación. / [English]: Operator cases: store and prepare the operation.
    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(symbol);
      break;

    // [Español]: Caso "=": ejecuta la operación pendiente si existe. / [English]: Case "=": executes the pending operation if it exists.
    case "=":
      if (ultimoOperador === null || memoria === null) return;
      executeOperation(parseFloat(buffer));
      ultimoOperador = null;
      memoria = null;
      break;
  }
  updateScreen();
}

// [Español]: Prepara la operación matemática: guarda valor en memoria o encadena operaciones. / [English]: Prepares the math operation: saves value in memory or chains operations.
function handleMath(symbol) {
  const valorActual = parseFloat(buffer);

  if (memoria === null) {
    memoria = valorActual;
  } else if (ultimoOperador) {
    executeOperation(valorActual);
  }

  ultimoOperador = symbol;
  buffer = "0";
}

// [Español]: Ejecuta la operación pendiente usando 'ultimoOperador' y actualiza el buffer con el resultado. / [English]: Executes the pending operation using 'ultimoOperador' and updates the buffer with the result.
function executeOperation(valor) {
  if (ultimoOperador === "+") {
    memoria += valor;
  } else if (ultimoOperador === "-") {
    memoria -= valor;
  } else if (ultimoOperador === "*") {
    memoria *= valor;
  } else if (ultimoOperador === "/") {
    if (valor === 0) {
      alert("Error: No se puede dividir entre cero.");
      memoria = 0;
      buffer = "0";
      ultimoOperador = null;
      return;
    }
    memoria /= valor;
  }

  buffer = String(memoria);
}

// [Español]: Determina si el valor presionado corresponde a un número o a un símbolo y lo envía a la función correspondiente. / [English]: Determines if the pressed value corresponds to a number or a symbol and sends it to the corresponding function.
function buttonClick(value) {
  if (isNaN(parseFloat(value)) && value !== ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

// [Español]: Inicializa los eventos de la calculadora: captura el clic en el contenedor de botones y delega la acción. / [English]: Initializes the calculator events: captures the click on the buttons container and delegates the action.
function init() {
  document.querySelector(".buttons").addEventListener("click", function (event) {
    const value = event.target.innerText;
    if (!value) return;
    buttonClick(value);
  });
  updateScreen();
}

// [Español]: Ejecuta la inicialización al cargar el script. / [English]: Executes initialization when the script loads.
init();
