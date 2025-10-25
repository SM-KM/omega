// payments_simulator_interactive.ts
// Simulation of Payment Optimization with Interactive Confirmations (auto-approved with "yes"/"no")

type LedgerEntry = {
  month: number;
  type: string;
  from: string;
  to: string;
  amount: number;
  fee?: number;
  note?: string;
};

class CreditCard {
  name: string;
  balance: number;
  annual_rate: number; // Annual Percentage Rate (APR)
  due_day: number;
  min_payment_pct?: number;
  min_payment_fixed?: number;
  transfer_rate?: number;
  transfer_fee_pct: number;
  accumulated_interest: number = 0;

  constructor(
    name: string,
    balance: number,
    annual_rate: number,
    due_day: number,
    min_payment_pct?: number,
    min_payment_fixed?: number,
    transfer_rate?: number,
    transfer_fee_pct: number = 0
  ) {
    this.name = name;
    this.balance = balance;
    this.annual_rate = annual_rate;
    this.due_day = due_day;
    this.min_payment_pct = min_payment_pct;
    this.min_payment_fixed = min_payment_fixed;
    this.transfer_rate = transfer_rate;
    this.transfer_fee_pct = transfer_fee_pct;
  }

  monthlyInterest(): number {
    return (this.annual_rate / 100) / 12 * this.balance;
  }

  minimumPayment(): number {
    if (this.min_payment_fixed !== undefined) {
      return Math.min(this.balance, this.min_payment_fixed);
    }
    if (this.min_payment_pct !== undefined) {
      return Math.min(this.balance, this.balance * (this.min_payment_pct / 100));
    }
    return Math.max(1.0, this.balance * 0.03);
  }
}

function cloneCards(cards: CreditCard[]): CreditCard[] {
  return cards.map(
    (c) =>
      new CreditCard(
        c.name,
        c.balance,
        c.annual_rate,
        c.due_day,
        c.min_payment_pct,
        c.min_payment_fixed,
        c.transfer_rate,
        c.transfer_fee_pct
      )
  );
}

function calculatePriority(c: CreditCard, referenceDay: number = 28): number {
  const days = Math.max(1, c.due_day >= referenceDay ? c.due_day - referenceDay : 30 - referenceDay + c.due_day);
  const dailyCost = (c.balance * (c.annual_rate / 100)) / 365;
  const urgency = 1 / (1 + days);
  return dailyCost * (1 + 5 * urgency);
}

function applyInitialTransfersSimulated(cards: CreditCard[], ledger: LedgerEntry[], horizonDays: number = 30) {
  console.log("\n=== Starting Initial Balance Transfer Simulation ===\n");
  for (const fromCard of cards) {
    if (fromCard.balance <= 0) continue;
    for (const toCard of cards) {
      if (fromCard === toCard) continue;

      const destAPR = toCard.transfer_rate !== undefined ? toCard.transfer_rate : toCard.annual_rate;
      if (destAPR! >= fromCard.annual_rate) continue;

      const interestSaving = fromCard.balance * ((fromCard.annual_rate - destAPR!) / 100) * (horizonDays / 365);
      const fee = fromCard.balance * (toCard.transfer_fee_pct / 100);

      if (interestSaving > fee + 1.0) {
        console.log(
          `System: A transfer opportunity was detected.\n→ Move $${fromCard.balance.toFixed(2)} from "${fromCard.name}" to "${toCard.name}".\n   Estimated interest savings: $${interestSaving.toFixed(
            2
          )}, Fee: $${fee.toFixed(2)}`
        );
        console.log(`System: Would you like to proceed with this transfer? (yes/no): yes`);
        console.log("User: yes (automatically approved)\n");

        const amount = fromCard.balance;
        ledger.push({
          month: 0,
          type: "transfer",
          from: fromCard.name,
          to: toCard.name,
          amount: Math.round(amount * 100) / 100,
          fee: Math.round(fee * 100) / 100,
          note: `Auto-approved transfer executed (savings: $${interestSaving.toFixed(2)})`
        });

        fromCard.balance = 0;
        toCard.balance += amount;

        if (fee > 0) {
          ledger.push({
            month: 0,
            type: "fee",
            from: "wallet",
            to: "bank_fee",
            amount: Math.round(fee * 100) / 100,
            fee: 0,
            note: `Fee for balance transfer from ${fromCard.name} to ${toCard.name}`
          });
        }
      }
    }
  }
  console.log("\n=== Initial Transfer Simulation Completed ===\n");
}

function simulate(
  originalCards: CreditCard[],
  monthlyFunds: number,
  payday: number,
  months: number
): [any[], number, LedgerEntry[]] {
  const cards = cloneCards(originalCards);
  const ledger: LedgerEntry[] = [];

  applyInitialTransfersSimulated(cards, ledger, 30);

  const record: Record<string, { initial: number; principalPaid: number; interestPaid: number }> = {};

  cards.forEach(
    (c) =>
      (record[c.name] = {
        initial: c.balance,
        principalPaid: 0,
        interestPaid: 0
      })
  );

  for (let month = 1; month <= months; month++) {
    let available = monthlyFunds;
    const ranking = [...cards].sort(
      (a, b) => calculatePriority(b, payday) - calculatePriority(a, payday)
    );
    const active = ranking.filter((c) => c.balance > 0);

    console.log(`\n--- Month ${month}: Beginning Payment Cycle ---`);
    console.log(`Available funds: $${available.toFixed(2)}\n`);

    // Step 1: Minimum payments
    for (const c of active) {
      if (available <= 0) break;
      const minPay = c.minimumPayment();
      const payment = Math.min(minPay, available, c.balance);
      const monthInterest = (c.balance * (c.annual_rate / 100)) / 12;

      console.log(
        `System: ${c.name} requires a minimum payment of $${minPay.toFixed(2)}.\n→ Would you like to proceed with this payment? (yes/no): yes`
      );
      console.log("User: yes (automatically approved)\n");

      record[c.name].interestPaid += Math.min(monthInterest, payment);
      const unpaidInterest = Math.max(0, monthInterest - payment);
      c.balance += unpaidInterest;
      const principalPayment = Math.max(0, payment - monthInterest);
      c.balance = Math.max(0, c.balance - principalPayment);
      record[c.name].principalPaid += principalPayment;
      available -= payment;

      ledger.push({
        month,
        type: "payment",
        from: "wallet",
        to: c.name,
        amount: Math.round(payment * 100) / 100,
        note: "Auto-approved minimum payment"
      });
    }

    // Step 2: Use remaining balance
    if (available > 0) {
      for (const c of ranking) {
        if (available <= 0) break;
        if (c.balance <= 0) continue;
        const payment = Math.min(available, c.balance);
        const monthInterest = (c.balance * (c.annual_rate / 100)) / 12;

        console.log(
          `System: Allocate remaining funds to ${c.name}? Amount: $${payment.toFixed(2)} (yes/no): yes`
        );
        console.log("User: yes (automatically approved)\n");

        record[c.name].interestPaid += Math.min(monthInterest, payment);
        const unpaidInterest = Math.max(0, monthInterest - payment);
        c.balance += unpaidInterest;
        const principalPayment = Math.max(0, payment - monthInterest);
        c.balance = Math.max(0, c.balance - principalPayment);
        record[c.name].principalPaid += principalPayment;
        available -= payment;

        ledger.push({
          month,
          type: "payment",
          from: "wallet",
          to: c.name,
          amount: Math.round(payment * 100) / 100,
          note: "Auto-approved extra payment"
        });
      }
    }

    console.log(`--- Month ${month} Complete. Remaining funds: $${available.toFixed(2)} ---\n`);
  }

  const results = cards.map((c) => ({
    card: c.name,
    initialBalance: Number(record[c.name].initial.toFixed(2)),
    principalPaid: Number(record[c.name].principalPaid.toFixed(2)),
    interestPaid: Number(record[c.name].interestPaid.toFixed(2)),
    finalBalance: Number(c.balance.toFixed(2)),
    apr: c.annual_rate
  }));

  const totalInterest = results.reduce((acc, r) => acc + r.interestPaid, 0);
  return [results, totalInterest, ledger];
}

// === Simulation Example ===
const cards = [
  new CreditCard("BBVA Gold", 15000, 42, 10, 5.0),
  new CreditCard("Citi Premier", 8000, 55, 20, 3.0),
  new CreditCard("HSBC Zero", 12000, 30, 5, undefined, 400.0),
  new CreditCard("Santander Light", 9000, 18, 25, 4.0, undefined, 10.0, 2.0)
];

const monthlyFunds = 7000;
const payday = 28;
const months = 3;

const [results, totalInterest, ledger] = simulate(cards, monthlyFunds, payday, months);

console.log("\n===============================");
console.log("FINAL FINANCIAL SUMMARY");
console.log("===============================");
for (const r of results) {
  console.log(
    `${r.card.padEnd(20)} | Initial: $${r.initialBalance
      .toFixed(2)
      .padStart(8)} | Final: $${r.finalBalance
      .toFixed(2)
      .padStart(8)} | Interest: $${r.interestPaid
      .toFixed(2)
      .padStart(8)}`
  );
}
console.log(`\nTotal Interest Paid: $${totalInterest.toFixed(2)}\n`);
