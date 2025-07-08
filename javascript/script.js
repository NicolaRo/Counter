// 1. Funzione per creare elementi
function newElement(parent, tag, className, content) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = content;
  parent.appendChild(el);
  return el;
}
// 2. Funzione per il copy-to-clipboard (che potrà essere assegnata a qualisasi altro elemento in futuro)
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => console.log('Copied to clipboard'))
    .catch(err => console.error('Error copying:', err));
}

// 3. Seleziono il <main>
const mainTag = document.querySelector('main');

// 3. Dichiaro il valore iniziale del counter
let counterNumber = 0;

// 4. Creo il contenitore (vuoto) instructions a scomparsa (settato nel .scss)
const instructions = newElement(mainTag, 'div', 'instructions', '');

// 4.a. Aggiungo il titolo <h3>
const instructionsTitle = newElement(instructions, 'h3', '', 'Instructions');

// 4.b. Aggiungo il testo descrittivo dentro un <p>
const instructionsText = newElement(
  instructions,
  'p',
  'instructionsText',
  `Click the buttons "+" / "-" to increase or decrease the counter value.
Click "Record" to save the current counter value.
Click "Reset" to reset the counter to zero.`
);

// 5. Creo il contenitore dei bottoni secondari
const counterSecondary = newElement(instructions, 'div', 'counterSecondary', '');

// 6. Aggiungo i bottoni dentro il contenitore secondario
const resetButton = newElement(counterSecondary, 'button', 'secondaryButton', 'Reset');
resetButton.setAttribute('title', 'Reset the counter to 0'); // Aggiungo: "title" per tooltip visivo per migliorare acessibilità.
resetButton.setAttribute('aria-label', 'Reset the counter to 0'); // Aggiungo: "aria-label" letto da screen-reader per migliorare acessibilità.
const recordButton = newElement(counterSecondary, 'button', 'secondaryButton', 'Record');
recordButton.setAttribute('title', 'Save the current counter value');// Aggiungo: "title" con descrizione bottone per migliorare acessibilità.
recordButton.setAttribute('aria-label', 'Save the current counter value')// Aggiungo: "aria-label" letto da screen-reader per migliorare acessibilità.

// 7. Creo il contenitore dei bottoni e del display
const counterPrimary = newElement(mainTag, 'div', 'counterPrimary', '');

// 8. Creo i bottoni +, display, e - nello stesso contenitore
const plusButton = newElement(counterPrimary, 'button', 'primaryButton', '+');
plusButton.setAttribute('title', 'Increase the counter by 1'); // Aggiungo: "title" per tooltip visivo per migliorare acessibilità.
plusButton.setAttribute('aria-label', 'Increase the counter by 1'); // Aggiungo: "aria-label" letto da screen-reader per migliorare acessibilità.
const counterDisplay = newElement(counterPrimary, 'div', 'counterDisplay', counterNumber);
const minusButton = newElement(counterPrimary, 'button', 'primaryButton', '-');
minusButton.setAttribute('title', 'Decrease the counter by 1');// Aggiungo: "title" con descrizione bottone per migliorare acessibilità.
minusButton.setAttribute ('aria-label', 'Decrease the counter by 1'); // Aggiungo: "aria-label" letto da screen-reader per migliorare acessibilità.


// 9. Aggiungo funzionalità ai bottoni
plusButton.addEventListener('click', () => {
  counterNumber++;
  counterDisplay.textContent = counterNumber;
});

minusButton.addEventListener('click', () => {
  if (counterNumber >= 1) {
    counterNumber--;
    counterDisplay.textContent = counterNumber;
  }

  else if (counterNumber === 0) {
    const messageDiv = newElement(document.body, 'div', 'error-message', "Can't count negative values"); //Creo il messaggio di errore, migliora UX.
    messageDiv.setAttribute('role', 'alert'); // Aggiungo "role" per migliorare l'accessibilità.
    counterDisplay.classList.add("counter-red"); // Aggiungo classe che cambia colore al display, migliorando la UX.
    
    setTimeout(() => { // Imposto timer per il messaggio di errore.
      messageDiv.remove();
    }, 850);
    setTimeout(() => {
      counterDisplay.classList.remove("counter-red"); // Rimuovo la classe che cambia colore al display.
    }, 500);
  }
});

resetButton.addEventListener('click', () => {
  if (counterNumber !== 0) {
      counterNumber = 0;
      counterDisplay.textContent = 0;
  }
});

// 10. Creo il contenitore dei record registrati
const counterRecordsContainer = newElement(mainTag, 'div', 'counterRecordsContainer', '');

// 10.a. Aggiungo il titolo <h3>
const recordsTitle = newElement(counterRecordsContainer, 'h3', '', 'Recorded clicks');

// 10.b. Aggiungo il testo descrittivo dentro un <p>
const counterRecordsText = newElement(
  counterRecordsContainer,
  'p',
  'instructionsText',
  `See below the counted clicks recorded to keep track of your counting.`
);

// 12. Funzione per formato data

function formatRecord(counterNumber) {
  return `Value: ${counterNumber} - ${new Date().toLocaleString()}`;
}

// 12.a. Creo le card per la visualizzazione dei record e della data
recordButton.addEventListener('click', () => {
  if (counterNumber !== 0) {
    counterRecordsContainer.classList.add('visible');

    const recordText =  formatRecord(counterNumber);
    const recordCard = newElement(counterRecordsContainer, 'div', 'recordCard', recordText);
    recordCard.setAttribute('data-record', recordText);
    
    const deleteButton = newElement(recordCard, 'button', 'deleteButtons', 'X');
    deleteButton.setAttribute('title', 'Delete this record');
    deleteButton.setAttribute('aria-label', 'Delete this record'); // Aggiungo: "aria-label" letto da screen-reader per migliorare acessibilità.

    const copyButton = newElement(recordCard, 'button', 'copyButtons', 'COPY');
    copyButton.setAttribute('title', 'Copy this record to clipboard');
    copyButton.setAttribute('aria-label', 'Copy this record to clipboard'); // Aggiungo: "aria-label" letto da screen-reader per migliorare acessibilità.
    
  } else if (counterNumber === 0) {
    const messageDiv = newElement(document.body, 'div', 'error-message', 'Can not record a value of 0') // Creo il messaggio di errore, migliora la UX.
    messageDiv.setAttribute('role', 'alert'); // Aggiungo "role" per migliorare l'accessibilità.
      setTimeout(()=> {
        messageDiv.remove();
      }, 700);
    }
});


   

counterRecordsContainer.addEventListener('click', (event) => {
  const target = event.target;

  // 13 Cancella la recordCard (parentElement indica quale specifica card eliminare: la parent)
  const deleteButton = target.closest('.deleteButtons');
    if (deleteButton) {
      deleteButton.parentElement.remove();
    }

 // Copia il testo dal data-record
  const copyButton = target.closest('.copyButtons');
  if (copyButton) { 
    const recordText = copyButton.parentElement.getAttribute('data-record');
    navigator.clipboard.writeText(recordText);
    const messageDiv = newElement(document.body, 'div', 'copy-message', 'The value has been copied to your clipboard');
  setTimeout(() => {
    messageDiv.remove();
  }, 700);    
  }
});


