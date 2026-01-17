document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    message.textContent = "Submitting...";
    message.style.color = "#555";

    const data = {
      first_name: document.getElementById("first_name").value.trim(),
      last_name: document.getElementById("last_name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim(),
    };

    try {
      const response = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        message.textContent = "User registered successfully ✅";
        message.style.color = "green";
        form.reset();
      } else {
        message.textContent = result.error || "Registration failed";
        message.style.color = "red";
      }
    } catch (err) {
      message.textContent = "Server error";
      message.style.color = "red";
    }
  });
});
