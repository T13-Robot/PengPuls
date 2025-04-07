document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".new-bill-form");
    const button = document.querySelector(".new-bill-button");
    const tableBody = document.querySelector("table tbody");

    // Load bills from local storage
    const loadBills = () => {
        const bills = JSON.parse(localStorage.getItem("bills")) || [];
        tableBody.innerHTML = "";
        bills.forEach((bill, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${bill.type}</td>
                <td>${bill.name}</td>
                <td>${bill.dueDate}</td>
                <td>${bill.amount} Kr</td>
                <td class="status">
                    <span class="status-icon ${bill.status ? "check" : "cross"}">
                        ${bill.status ? "✔" : "✘"}
                    </span>
                </td>
                <td class="actions">
                    <button class="edit-button" data-index="${index}">Pågående</button>
                    <button class="remove-button" data-index="${index}">Ta bort</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-button").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                removeBill(index);
            });
        });

        // Add event listeners to edit buttons
        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                toggleStatus(index);
            });
        });
    };

    // Save a new bill
    const saveBill = (bill) => {
        const bills = JSON.parse(localStorage.getItem("bills")) || [];
        bills.push(bill);
        localStorage.setItem("bills", JSON.stringify(bills));
        loadBills();
    };

    // Remove a bill
    const removeBill = (index) => {
        const bills = JSON.parse(localStorage.getItem("bills")) || [];
        bills.splice(index, 1);
        localStorage.setItem("bills", JSON.stringify(bills));
        loadBills();
    };

    // Toggle the status of a bill
    const toggleStatus = (index) => {
        const bills = JSON.parse(localStorage.getItem("bills")) || [];
        bills[index].status = !bills[index].status; // Toggle the status
        localStorage.setItem("bills", JSON.stringify(bills));
        loadBills();
    };

    // Toggle form visibility
    button.addEventListener("click", () => {
        form.style.display = form.style.display === "none" ? "block" : "none";
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const bill = {
            name: form["bill-name"].value,
            type: form["bill-type"].value,
            amount: form["bill-amount"].value,
            dueDate: form["bill-due-date"].value,
            status: false,
        };
        saveBill(bill);
        form.reset();
        form.style.display = "none";
    });

    // Initial load
    loadBills();
});
