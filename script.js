document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-contact-form");
    const contactTableBody = document.querySelector("#contact-table tbody");

    let editingRow = null; // Track the row currently being edited

    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !email || !phone) {
            alert("Please fill out all fields.");
            return;
        }

        if (editingRow) {
            // Update existing row
            editingRow.querySelector(".name-cell").textContent = name;
            editingRow.querySelector(".email-cell").textContent = email;
            editingRow.querySelector(".phone-cell").textContent = phone;

            // Clear editing state
            editingRow = null;
            form.reset();
        } else {
            // Add new contact
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="name-cell">${name}</td>
                <td class="email-cell divider-column">${email}</td>
                <td class="phone-cell divider-column">${phone}</td>
                <td class="actions-cell divider-column">
                    <button class="btn-edit btn btn-warning">Edit</button>
                    <button class="btn-delete btn btn-danger">Delete</button>
                </td>
            `;

            contactTableBody.appendChild(row);
        }

        // Clear form inputs
        form.reset();
    });

    // Handle click events in the table
    contactTableBody.addEventListener("click", function (e) {
        const target = e.target;

        if (target.classList.contains("btn-edit")) {
            // Edit button clicked
            const row = target.closest("tr");
            const name = row.querySelector(".name-cell").textContent;
            const email = row.querySelector(".email-cell").textContent;
            const phone = row.querySelector(".phone-cell").textContent;

            // Populate form fields with the contact's current data
            document.getElementById("name").value = name;
            document.getElementById("email").value = email;
            document.getElementById("phone").value = phone;

            // Set editing state
            editingRow = row;
        } else if (target.classList.contains("btn-delete")) {
            // Delete button clicked
            const row = target.closest("tr");
            contactTableBody.removeChild(row);
        }
    });
});
