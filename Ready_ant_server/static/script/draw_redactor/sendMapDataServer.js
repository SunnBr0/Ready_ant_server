import {saveDataMap,flagSaveDataMap} from "../draw_redactor/redactor.js"
console.log(saveDataMap,flagSaveDataMap);
// // URL сервера, на который отправляется запрос
// const url = 'http://localhost:8080/red';

// // Настройки запроса
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(saveDataMap)
// };

// // Отправка запроса
// fetch(url, options)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Server response:', data);
//     })
//     .catch(error => {
//         console.error('There was a problem with your fetch operation:', error);
//     });