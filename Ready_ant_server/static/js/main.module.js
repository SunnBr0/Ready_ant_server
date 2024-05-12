export function mainModule() {
    const bodySite = document.querySelector("body");

    //открытие и закрытие шапки на стартовой странице
    const modalOpen = document.getElementById("modalOpen");
    const modalClose = document.getElementById("modalClose");
    const modalGreetings = document.getElementById("modalGreetings");

    modalOpen.addEventListener("click", () => {
        modalOpen.style.display = "none";
        modalGreetings.style.display = "block";
    })

    modalClose.addEventListener("click", () => {
        modalOpen.style.display = "block";
        modalGreetings.style.display = "none";
    })

    //открытие и закрытие модального окна авторизации
    const autorisation = document.getElementById("autorisation");
    const autorisationOpen = document.getElementById("autorisationOpen");
    const autorisationClose = document.getElementById("autorisationClose");

    autorisationOpen.addEventListener("click", () => {
        autorisation.style.display = "block";
        bodySite.classList.add("blur");
    })

    autorisationClose.addEventListener("click", () => {
        autorisation.style.display = "none";
        bodySite.classList.remove("blur");
    })

    //открытие и закрытие модального окна регистрации
    const registration = document.getElementById("registration");
    const registrationOpen = document.getElementById("registrationOpen");
    const registrationClose = document.getElementById("registrationClose");

    registrationOpen.addEventListener("click", () => {
        registration.style.display = "block";
        autorisation.style.display = "none";
        bodySite.classList.add("blur");
    })

    registrationClose.addEventListener("click", () => {
        registration.style.display = "none";
        bodySite.classList.remove("blur");
    })

    //вернуться из окна регистрации в окно авторизации
    const autorisationReturn = document.getElementById("autorisationReturn");

    autorisationReturn.addEventListener("click", () => {
        registration.style.display = "none";
        autorisation.style.display = "block";
    })
}