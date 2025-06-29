// 1. Funzione per creare elementi
function newElement(parent, tag, className, content) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = content;
  parent.appendChild(el);
  return el;
}

// 2. Seleziono il <main>
const mainTag = document.querySelector('main');

// 3. Numero iniziale
let counterNumber = 0;

// 4. Creo il contenitore instructions a scomparsa (vuoto)
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
const recordButton = newElement(counterSecondary, 'button', 'secondaryButton', 'Record');

// 7. Creo il contenitore dei bottoni e del display
const counterPrimary = newElement(mainTag, 'div', 'counterPrimary', '');

// 8. Creo i bottoni +, display, e - nello stesso contenitore
const plusButton = newElement(counterPrimary, 'button', 'primaryButton', '+');
const counterDisplay = newElement(counterPrimary, 'div', 'counterDisplay', counterNumber);
const minusButton = newElement(counterPrimary, 'button', 'primaryButton', '-');

// 9. Aggiungo funzionalità ai bottoni
plusButton.addEventListener('click', () => {
  counterNumber++;
  counterDisplay.textContent = counterNumber;
});

minusButton.addEventListener('click', () => {
  counterNumber--;
  counterDisplay.textContent = counterNumber;
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

// 11. Funzione per gestire il copy
function setupRecordCard(recordCard, recordText) {
  const copyRecordsButton = newElement(recordCard, 'button', 'copyButtons', 'COPY');
  
  copyRecordsButton.addEventListener('click', () => {
      navigator.clipboard.writeText(recordText)
          .then(() => {
              console.log('Copied to clipboard');
          })
          .catch(err => {
              console.error('Error, retry', err);
          });
  });
  
  return copyRecordsButton;
}

// 12. Creo le card per la visualizzazione dei record e della data
recordButton.addEventListener('click', () => {
  if (counterNumber !== 0) {
      counterRecordsContainer.style.display = 'flex';
      counterRecordsContainer.style.flexDirection = 'column';
      
      const recordCard = document.createElement('div');
      recordCard.className = 'recordCard';
      
      const recordText = `Value: ${counterNumber} - ${new Date().toLocaleString()}`;
      recordCard.textContent = recordText;
      
      counterRecordsContainer.appendChild(recordCard);
      
      const deleteRecordsButton = newElement(recordCard, 'button', 'deleteButtons', 'X');
      deleteRecordsButton.addEventListener('click', (event) => {
          event.target.parentElement.remove();
      });
      
      // Uso la funzione per gestire il copy button
      setupRecordCard(recordCard, recordText);
  }
});