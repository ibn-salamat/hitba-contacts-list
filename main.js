let contacts = [];

async function getContacta(){
    try {
        const res = await fetch("https://api.hitba.io/main/landing_order?page_size=10&page=0");
        const data = await res.json()

        if(data.results){
            contacts = data.results;
        }
    } catch (error) {
        alert("Something went wrong. Call frontend dev")
    }
}

async function render(){
    const root = document.querySelector("#root");
    
    await getContacta();
    let content = "";

    contacts.forEach(contact => {
        const { phone, email, name, created_at } = contact;

        content += `
        <div class="user">
            <p>
                Дата создания:
                <span>${new Date(created_at)?.toLocaleString("ru")}</span>
            </p>
            <p>
                Имя:
                <span>${name}</span>
            </p> 
         
            ${email?.trim() ? 
            `   
            <p>
                Email:
                <span>${email}</span>
                </p>
            `
            : ""
            }
             <p>
                Телефон номер:
                <a href="tel:${phone}">${phone}</span>
            </p>
        </div>
        `
    })

    root.innerHTML = content
}

render()

setInterval(() => {
    render()
}, 10000)