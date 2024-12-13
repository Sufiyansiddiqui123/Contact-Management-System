document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-contact-form");
    const contactTableBody = document.querySelector("#contact-table tbody");
    const apiUrl = "http://localhost:3000/contacts";

    let editingContactId = null; // Track the contact ID being edited

    // Fetch and display contacts on page load
    async function loadContacts() {
        const response = await fetch(apiUrl);
        const contacts = await response.json();
        contactTableBody.innerHTML = contacts
            .map(contact => `
                <tr data-id="${contact.id}">
                    <td class="name-cell">${contact.name}</td>
                    <td class="email-cell divider-column">${contact.email}</td>
                    <td class="phone-cell divider-column">${contact.phone}</td>
                    <td class="actions-cell divider-column">
                        <button class="btn-edit btn btn-warning">Edit</button>
                        <button class="btn-delete btn btn-danger">Delete</button>
                    </td>
                </tr>
            `)
            .join("");
    }

    loadContacts();

    // Handle form submission
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!name || !email || !phone) {
            alert("Please fill out all fields.");
            return;
        }

        if (editingContactId) {
            // Update contact
            await fetch(`${apiUrl}/${editingContactId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone }),
            });
            editingContactId = null;
        } else {
            // Add new contact
            await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone }),
            });
        }

        form.reset();
        loadContacts();
    });

    // Handle click events in the table
    contactTableBody.addEventListener("click", async function (e) {
        const target = e.target;
        const row = target.closest("tr");
        const contactId = row?.getAttribute("data-id");

        if (target.classList.contains("btn-edit")) {
            // Edit button clicked
            const name = row.querySelector(".name-cell").textContent;
            const email = row.querySelector(".email-cell").textContent;
            const phone = row.querySelector(".phone-cell").textContent;

            document.getElementById("name").value = name;
            document.getElementById("email").value = email;
            document.getElementById("phone").value = phone;

            editingContactId = contactId; // Set editing contact ID
        } else if (target.classList.contains("btn-delete")) {
            // Delete button clicked
            await fetch(`${apiUrl}/${contactId}`, { method: "DELETE" });
            loadContacts();
        }
    });
});
