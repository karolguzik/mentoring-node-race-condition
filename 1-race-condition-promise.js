// Przykład na bazie przelewów na konta bankowe

// funkcja do opóźnienia wykonania funkcji
const randomDelay = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 500));

let accountBalance = 0;

async function withdrawCash() {
  await randomDelay();
  return accountBalance;
}

async function confirmTransaction(amount) {
  await randomDelay();
  accountBalance = amount;
}

async function depositCash(amount) {
  const accountBalance = await withdrawCash();
  console.log(`Current account balance: ${accountBalance}`);
  const newAccountBalance = accountBalance + amount;
  await confirmTransaction(newAccountBalance);
  console.log(`Account balance after transaction: ${newAccountBalance}`);
}

async function mainBad() {
  // wazne -> nie dodajemy await bo chcemy uruchomić je "concurrently"
  // albo await Promise.all([depositCash(100), depositCash(200)]);
  const firstTransaction = depositCash(100);
  const secondTransaction = depositCash(200);

  // wazne -> dopiero tutaj czekamy po tym jak zostały odpalone
  await firstTransaction;
  await secondTransaction;
  const balance = await withdrawCash();
  console.log(`Account balance: ${balance}`);
}

async function mainOk() {
  // wazne -> czekamy na wykonanie operacji jedna po drugiej dodakjąc `await` -> zmienne zbędne
  // promise -> then -> catch -> finally tez tutaj bedzie pozytywnym rozwiazaniem
  const firstTransaction = await depositCash(100);
  const secondTransaction = await depositCash(200);

  const balance = await withdrawCash();
  console.log(`Account balance: ${balance}`);
}

main();
