const form = document.getElementById("shorten-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const url = formData.get("url");
    const shortCode = formData.get("shortCode");

    const response = await fetch("/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url,
            shortCode
        })
    });

    const result = await response.json();

    console.log(result);

    form.reset();
});