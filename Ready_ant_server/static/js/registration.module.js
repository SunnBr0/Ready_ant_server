export function registrationModule() {
    const loginRegistration = document.getElementById("loginRegistration");
    const passwordRegistration = document.getElementById("passwordRegistration");
    const passwordRegistrationRepeat = document.getElementById("passwordRegistrationRepeat");
    const registrationButton = document.getElementById("registrationButton");

    registrationButton.addEventListener("click", function () {
        const user = {
            pswd: passwordRegistration.value,
            email: loginRegistration.value
        };

        // Проверка совпадения паролей
        if (passwordRegistration.value !== passwordRegistrationRepeat.value) {
            // Если пароли не совпадают
            return; // Прерываем выполнение функции
        }

        // Отправка запроса на сервер
        fetch('/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа от сервера
                console.log('Регистрация прошла успешно', data);
            })
            .catch(error => {
                // Обработка ошибок
                console.error('There has been a problem with your fetch operation:', error);
            });
    });
}
