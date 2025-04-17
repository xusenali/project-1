let base_url = 'https://67fe04863da09811b1774120.mockapi.io/users'

async function loadUsers() {
    try {
        const data = await fetch(base_url)
        const users = await data.json()
        console.log(users);

    } catch (error) {
        console.log(error);

    }
}
window.addEventListener('DOMContentLoaded', () => {
    loadUsers()
    getForm()
})


function getForm() {
    let form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(form)
        userspost(formData)
        form.style.display = 'none'
        const modalEl = document.getElementById('pupilModal');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
        
    });
}

function userspost(form) {
    
    fetch(base_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: form.get('name'),
            lastName: form.get('lastname'),
            city: form.get('city'),
            date: form.get('data'),
            workPosition: form.get('work'),
            userDaraja: form.get('daraja'),
            userSalary: form.get('price'),
            isMarried: form.has('isMared')
        })
    })
}

