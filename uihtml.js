document.addEventListener("DOMContentLoaded", function () {
  const headerElement = document.querySelector("my-header");
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerElement.outerHTML = data;
    });
});
