// Przykład na bazie przelewów na konta bankowe

let mutex = Promise.resolve(); // Own mutex by using Promise.resolve()

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
  mutex = mutex
    .then(async () => {
      const accountBalance = await withdrawCash();
      console.log(`Current account balance: ${accountBalance}`);
      const newAccountBalance = accountBalance + amount;
      await confirmTransaction(newAccountBalance);
      console.log(`Account balance after transaction: ${newAccountBalance}`);
    })
    .catch((err) => console.log(err));

  return mutex;
}

async function main() {
  // teraz mozemy odpalic operacje concurrently, nie przejmując konflitkami bo kazda operacja będzie czekała na zakończenie poprzedniej

  // oczekujemy wyniku 500
  await Promise.all([
    depositCash(100),
    depositCash(100),
    depositCash(100),
    depositCash(100),
    depositCash(100),
  ]);

  const balance = await withdrawCash();
  console.log(`Account balance: ${balance}`);
}

main();
