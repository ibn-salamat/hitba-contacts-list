let contacts = [];
let pageSize = 0;
let currentPage = 0;
let totalCount = 0;

async function getContacta(params = { page: 0 }){
    const { page } = params;
    
    try {
        const res = await fetch(`https://api.hitba.io/main/landing_order?page_size=10&page=${page}&with_total_count=1`);
        const data = await res.json()

        if(data.results){
            contacts = data.results;
            pageSize = data.page_size
            totalCount = data.total_count

        }
    } catch (error) {
        alert("Something went wrong. Call frontend dev")
    }
}

async function render(params = { page: 0 }){
    const contacts_list = document.querySelector("#contacts_list");
    const pagination = document.querySelector("#pagination");
    const sumContacts = document.querySelector("#sum_contacts")

    currentPage = params.page;

    // render contacts
    await getContacta(params);
    let content = "";

    contacts.forEach(contact => {
        const { phone, email, name, created_at } = contact;

        content += `
        <div class='user'>
            <p>
                Дата создания:
                <span>${new Date(created_at)?.toLocaleString("ru")}</span>
            </p>
            <p>
                Имя:
                <span>${name}</span>
            </p> 
         
            <p>
                Email:
                <span>${email}</span>
            </p>
             <p>
                Телефон номер:
                <a href="tel:${phone}">${phone}</a>
            </p>
        </div>
        `
    })

    contacts_list.innerHTML = content

    // render pagination
    if(pageSize){
        let content = "";
        for (let i = 0; i < pageSize; i++) {
            content += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick='render({page: ${i}})'>${i + 1}</button>`
        }
        pagination.innerHTML = content;
    }

    // sumContacts
    sumContacts.textContent = `(${totalCount})`
        
}

render()

// setInterval(() => {
//     render()
// }, 10000)