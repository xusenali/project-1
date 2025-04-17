let base_url = 'https://67fe04863da09811b1774120.mockapi.io/users'

async function loadUsers() {
    try {
        const res = await fetch(base_url)
        const users = await res.json()
        console.log(users)
        creatUsers(users)
        categoriesUsers(users)
        categoriesCity(users)
        if (!window.searchInitialized) {
            initSearch(users)
            window.searchInitialized = true
        }

    } catch (error) {
        console.error("Ma'lumot yuklanmadi:", error)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadUsers()
    getForm()
})
function btnclick(form) {
    let btn = document.querySelector('#button-addon2')
    btn.addEventListener('click', () => {
        form.style.display = 'flex'
    })
}
function getForm() {
    let form = document.querySelector('form')
    btnclick(form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(form)
        userspost(formData)
        form.style.display = 'none'

        const modalEl = document.getElementById('pupilModal');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide()
        form.reset()
    })
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
            isMarried: form.has('isMarried')
        })
    })
        .then(() => {
            loadUsers()
        })
        .catch(err => console.log("POST xatoligi:", err))
}

function creatUsers(users) {
    let cont = document.querySelector('.users')
    cont.innerHTML = ''
    users.forEach(item => {
        let ul = document.createElement('ul')
        ul.style.display = "flex"
        ul.innerHTML = `
            <li>${item.id}</li>
            <li>${item.name}</li>
            <li>${item.lastName}</li>
            <li>${item.city}</li>
            <li>${item.date}</li>
            <li>${item.userDaraja}</li>
            <li>${item.workPosition}</li>
            <li>${item.userSalary}$</li>
            <li>${item.isMarried}</li>
            <li>Frontend</li>
        `
        cont.append(ul)
        item._element = ul
    })
}

function initSearch(users) {
    let input = document.querySelector('#search')
    input.addEventListener('input', function () {
        let searchValue = input.value.toLowerCase().trim()
        users.forEach(user => {
            let name = user.name.toLowerCase()
            if (name.includes(searchValue)) {
                user._element.style.display = "flex"
            } else {
                user._element.style.display = "none"
            }
        })
    })
}

function categoriesUsers(allUsers) {
    let select = document.querySelector('#filterPosition')
    let searchInput = document.querySelector('#search')

    select.addEventListener('change', () => {
        const selectedCategory = select.value
        const filteredUsers = selectedCategory == 'Hammasi'
        ? allUsers
        : allUsers.filter(user => user.userDaraja == selectedCategory)
        
        creatUsers(filteredUsers)



        let searchValue = searchInput.value.toLowerCase().trim()
        filteredUsers.forEach(user => {
            if (user.name.toLowerCase().includes(searchValue)) {
                user._element.style.display = "flex"
            } else {
                user._element.style.display = "none"
            }
        })
    })
}

function categoriesCity(allUsers) {
    let select = document.querySelector('#filterCity')
    let searchInput = document.querySelector('#search')

    select.addEventListener('change', () => {
        const selectedCategory = select.value
        const filteredUsers = selectedCategory == 'Hammasi'
            ? allUsers
            : allUsers.filter(user => user.city == selectedCategory)

        creatUsers(filteredUsers)



        let searchValue = searchInput.value.toLowerCase().trim()
        filteredUsers.forEach(user => {
            if (user.name.toLowerCase().includes(searchValue)) {
                user._element.style.display = "flex"
            } else {
                user._element.style.display = "none"
            }
        })
    })
}

