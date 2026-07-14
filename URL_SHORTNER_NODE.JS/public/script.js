const form = document.getElementById("shorten-form");
const fetchShortendURL = async () => {
    const response = await fetch("/links")
    const links = await response.json()
    const list = document.getElementById("shortened-urls");
    list.innerHTML="";
    for(const[shortCode,url] of Object.entries(links)){
        const li= document.createElement('li');
        li.innerHTML=`<a href=${shortCode} target="_blanks">${window.location.origin}/${shortCode}</a> - ${url}`
        list.appendChild(li)
    }


}
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const url = formData.get("url");
    const shortCode = formData.get("shortCode");
    try {
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

        if (response.ok) {
            fetchShortendURL();
            alert("Form Submitted Successfully");
        }

    } catch (error) {
        console.error(error);
    }
    form.reset();
});