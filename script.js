// Задача

// Необходимо получить список всех пользователей с помощью бесплатного API (https://jsonplaceholder.typicode.com/users) и отобразить их на странице. Пользователь должен иметь возможность удалить любого пользователя из списка. Данные при получении необходимо сохранить в локальное хранилище браузера localStorage. При удалении пользователь должен удаляться не только со страницы, но и из локального хранилища localStorage

const body = document.querySelector('body');

const url = 'https://jsonplaceholder.typicode.com/users';

const getUserData = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error.message);
    }
};

const data = await getUserData(url);

data.map((object) => {
    const index = object.id;
    localStorage.setItem(`${index}`, JSON.stringify(object));
});

const usersData = [];

let keys = Object.keys(localStorage);

for (let key of keys) {
    usersData.push(localStorage.getItem(key));
};

const usersEl = document.createElement('div');
usersEl.classList.add('users');
body.appendChild(usersEl);

for (let key of keys) {
    if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
    const userCardData = JSON.parse(localStorage.getItem(key));
    const userCardEl = document.createElement('div');
    userCardEl.classList.add('user');
    userCardEl.id = userCardData.id;
    userCardEl.textContent = JSON.stringify(userCardData);
    usersEl.appendChild(userCardEl);
    const btnEl = document.createElement('button');
    btnEl.classList.add('user__btn');
    btnEl.innerHTML = 'DELETE';
    userCardEl.appendChild(btnEl);


};

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('user__btn')) {
        const block = event.target.parentNode;
        localStorage.removeItem(block.id);
        block.remove();
    };
});



// Необходимо реализовать отрисовку 10 картинок собак из API https://dog.ceo/dog-api/ с интервалом в 3 секунды.
const urlDogs = 'https://dog.ceo/api/breeds/image/random';

const getDogData = async (urlDogs) => {
    try {
        const response = await fetch(urlDogs);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error.message);
    }
}

const dogsEl = document.createElement('div');
dogsEl.classList.add('dogs');
body.appendChild(dogsEl);

const delayedImg = () => {
    for (let i = 0; i < 10; i++) {
        setTimeout(async function () {
            const dogData = await getDogData(urlDogs);
            const imageDogEl = document.createElement('img');
            imageDogEl.classList.add('dogs__img');
            imageDogEl.src = dogData.message;
            dogsEl.appendChild(imageDogEl);
        }, i * 3000);

    };
};
delayedImg();