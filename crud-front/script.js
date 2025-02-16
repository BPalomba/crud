const backendUrl = 'https://crud-fde6.onrender.com';
const url = `${backendUrl}/products`;


// showed text is the param TOAST
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hide");
    toast.classList.add("show");

    // time to go up 
    setTimeout(() => {
        toast.classList.add("hide");
    }, 2500);

    //Time to hide in ms
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}




// fetch get 
async function fetchProducts() {

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });


        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const products = await response.json();

        return products
    } catch (error) {
        console.error('Error: ', error)
    }
}

// Get
// Fills the table
async function loadProducts() {





    const products = await fetchProducts();
    const tableBody = document.querySelector('#productTable tbody')
    tableBody.innerHTML = "";


    // for each fetcher element
    products.forEach(product => {

        // contain the cells 
        const row = document.createElement('tr');

        // id
        const idCell = document.createElement('td');
        idCell.textContent = product.id;
        row.appendChild(idCell);

        // name
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        // description
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // buttons

        const actionsCell = document.createElement('td');

        // edit
        const editButton = document.createElement('button');
        editButton.className = 'update';
        editButton.onclick = () => editProduct(product.id);
        actionsCell.appendChild(editButton);

        // delete
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.onclick = () => deleteProduct(product.id);
        actionsCell.appendChild(deleteButton);


        row.appendChild(actionsCell);

        //add row to table
        tableBody.appendChild(row);

    });


    // put
    // edit button
    async function editProduct(id) {

        const product = products.find(p => p.id === id);

        if (!product) {
            console.error(`Dont found product with ID: ${id}`);
            return;
        }

        const modal = document.getElementById("editModal");
        const overlay = document.getElementById("overlay");

        // atributes to show in update windows
        const productId = product.id;
        const name = product.name;
        const description = product.description;

        // object sended to the API / weird thing to do not update multiples objects simultaneously
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.replaceWith(saveBtn.cloneNode(true));
        const newSaveBtn = document.getElementById('saveBtn');

        newSaveBtn.addEventListener('click', () => updateProduct(id));

        // write fetched data to html
        document.getElementById("editId").value = productId;
        document.getElementById("editName").value = name;
        document.getElementById("editDescription").value = description;

        // show html
        modal.classList.add("show");
        overlay.classList.add("show");


    }


    // close modal, related to edit
    document.getElementById("closeBtn").addEventListener("click", () => {

        document.getElementById("editModal").classList.remove("show");
        document.getElementById("overlay").classList.remove("show");
    });


    // id => id , newProduct => the new object that will replace the other product
    // save button from update
    async function updateProduct(id) {

        // save modal, related to edit
        document.getElementById("editModal").classList.remove("show");
        document.getElementById("overlay").classList.remove("show");

        updatedName = document.getElementById("editName").value;
        updatedDescription = document.getElementById("editDescription").value;


        // objet that will be sended
        const newProduct = {
            name: updatedName,
            description: updatedDescription
        }

        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct),
                credentials: 'include'
            });

            if (!response.ok) {
                showToast("failed to update the product")
                throw new Error('Error to update the product');
            }
            showToast("Succesfully updated product")
            loadProducts();
        } catch (error) {
            showToast("failed to update the product")
            console.error('Error:', error);
        }
    }


    // delete button
    async function deleteProduct(id) {
        try {

            const deleteEndpoint = `${url}/${id}`;

            const response = await fetch(deleteEndpoint, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) {
                showToast("Error deleting the product")
                throw new Error('Error deleting the product');
            }
            showToast("Delet Product")
            loadProducts();
        } catch (error) {
            console.error('Error:', error);
        }
    }



}




// Post

const addButton = document.getElementById("addButton")
addButton.onclick = () => addProduct();

// add product
async function addProduct() {


    event.preventDefault();

    // name
    const nameInput = document.getElementById("addName").value;

    //description
    const descriptionInput = document.getElementById("addDescription").value

    if (!nameInput) {
        showToast("Products needs a name")
        console.error("name inputs dont exist in the DOM");

        return
    }


    const newProduct = {
        name: nameInput,
        description: descriptionInput
    }

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct),
            credentials: 'include'
        });

        if (!response.ok) {
            showToast("failed to add the product")
            throw new Error('Error to add the product');
        }
        showToast("Succesfully added product")
        loadProducts();
    } catch (error) {
        showToast("failed to add the product")
        console.error('Error:', error);
    }

    document.getElementById("addName").value = "";
    document.getElementById("addDescription").value = "";
}






window.onload = loadProducts;