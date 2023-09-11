const URL = 'https://fakestoreapi.com/products';

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    products = data;

    // Agregar la fecha y hora en que se obtuvieron los datos
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Mostrar los productos
    showProducts(products, formattedDate);
}

function showProducts(products, formattedDate) {
    const productsList = document.getElementById('products');

    products.forEach((product, index) => {
        // Acortar el título a 20 caracteres
        const title = cutString(product.title, 20);

        // Crear un elemento de lista para cada producto
        const productItem = document.createElement('div');
        productItem.classList.add('list-group-item');
        
        // Crear una clasificación en formato de estrellas
        const rating = stars(product.rating.rate);

        // Crear el contenido del producto
        productItem.innerHTML = `
            <h5>${title}</h5>
            <p>Clasificación: ${rating} (${product.rating.rate})</p>
            <p>Precio: $${product.price}</p>
            <p>Descripción: ${product.description}</p>
            <p>Fecha y Hora de Obtención: ${formattedDate}</p>
        `;

        // Agregar el producto a la lista
        productsList.appendChild(productItem);
    });
}

function stars(rating) {
    const fullStars = Math.floor(rating); // Número de estrellas completas
    const halfStar = rating % 1 !== 0; // Comprobar si hay una mitad de estrella

    const starsArray = [];

    // Agregar estrellas completas
    for (let i = 0; i < fullStars; i++) {
        starsArray.push('<span class="fa fa-star checked"></span>');
    }

    // Agregar media estrella si es necesario
    if (halfStar) {
        starsArray.push('<span class="fa fa-star-half-o checked"></span>');
    }

    // Agregar estrellas vacías para completar 5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsArray.push('<span class="fa fa-star"></span>');
    }

    return starsArray.join('');
}


function cutString(string, maxLength) {
    if (string.length <= maxLength) {
        return string;
    } else {
        return string.slice(0, maxLength) + '...';
    }
}
