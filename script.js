document.addEventListener("DOMContentLoaded", () => {
  const callForm = document.getElementById("callForm");
  const logEntries = document.getElementById("logEntries");
  let callCount = 1;

  const phoneInput = document.getElementById("phone");
  const accountInput = document.getElementById("account");
  const typeInputs = document.querySelectorAll('input[name="type"]');

  // Function to set default account number based on type and phone number
  function updateAccountNumber() {
    const selectedType = document.querySelector(
      'input[name="type"]:checked'
    ).value;
    if (selectedType === "Customer" || selectedType === "P.Agent") {
      accountInput.value = phoneInput.value;
    }
  }

  // Event listener to update account number when phone or type changes
  phoneInput.addEventListener("input", updateAccountNumber);
  typeInputs.forEach((input) => {
    input.addEventListener("change", updateAccountNumber);
  });

  // Event listener for the Next Call button
  document.getElementById("nextCall").addEventListener("click", () => {
    // Gather input values from the form
    const phone = phoneInput.value;
    const name = document.getElementById("name").value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const account = accountInput.value;
    const description = document.getElementById("description").value;

    // Create the main log entry container
    const logEntry = document.createElement("div");
    logEntry.classList.add("log-entry");

    // Create the header with a summary (phone, name, and type)
    const header = document.createElement("div");
    header.classList.add("log-entry-header");
    header.textContent = `Call #${callCount}: ${name} (${type}) - ${phone}`;
    logEntry.appendChild(header);

    // Create the details section, initially hidden
    const details = document.createElement("div");
    details.classList.add("log-entry-details");
    details.style.display = "none"; // Hide initially

    // Populate details with full call information
    details.innerHTML = `
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Account Number/Phone of Account:</strong> ${account}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;
    logEntry.appendChild(details);

    // Add toggle functionality to show/hide details on header click
    header.addEventListener("click", () => {
      details.style.display =
        details.style.display === "none" ? "block" : "none";
    });

    // Append the log entry to the log container
    logEntries.appendChild(logEntry);

    // Reset form fields and increment call count
    callForm.reset();
    callCount++;
    document.getElementById("call-number").textContent = callCount;
  });
});
