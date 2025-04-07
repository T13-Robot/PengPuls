document.addEventListener("DOMContentLoaded", () => {
    const transactionsBody = document.getElementById("transactions-body");
    const addIncomeButton = document.getElementById("add-income");
    const addExpenseButton = document.getElementById("add-expense");

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const renderTransactions = () => {
        transactionsBody.innerHTML = "";
        transactions.forEach((transaction, index) => {
            const formattedDate = formatDate(transaction.date); // Format the date
            const tagClass = transaction.amount.startsWith("-") ? "expense" : ""; // Determine tag color
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formattedDate}</td> <!-- Display formatted date -->
                <td>${transaction.amount} Kr</td> <!-- Append " Kr" to the amount -->
                <td>${transaction.account}</td>
                <td>${transaction.recipient}</td> <!-- Changed from "reason" to "recipient" -->
                <td><span class="tag-button ${tagClass}">${transaction.tag}</span></td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            transactionsBody.appendChild(row);
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Okänt datum"; // Handle missing or invalid dates
        const parts = dateString.split("/");
        if (parts.length !== 3) return "Okänt datum"; // Ensure the date has three parts
        const [day, month, year] = parts;
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year.padStart(4, "0")}`; // Ensure proper format
    };

    const saveTransactions = () => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    };

    const addTransaction = (type) => {
        const date = prompt("Ange datum (t.ex., 07/04/2025):");
        const amount = prompt("Ange belopp:");
        const account = prompt("Ange konto:");
        const recipient = prompt("Ange mottagare:"); // Changed from "Anledning" to "Mottagare"
        const tag = prompt("Ange tagg:");

        if (date && amount && account && recipient && tag) {
            transactions.push({
                date,
                amount: type === "income" ? `+${amount}` : `-${amount}`,
                account,
                recipient, // Changed from "reason" to "recipient"
                tag,
            });
            saveTransactions();
            renderTransactions();
        }
    };

    transactionsBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            transactions.splice(index, 1);
            saveTransactions();
            renderTransactions();
        }
    });

    addIncomeButton.addEventListener("click", () => addTransaction("income"));
    addExpenseButton.addEventListener("click", () => addTransaction("expense"));

    renderTransactions();
});
