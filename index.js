
       const ramens = [
        { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "shoyu.jpg", rating: 5, comment: "Delicious!" },
        { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "miso.jpg", rating: 4, comment: "Very flavorful!" },
        { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "tonkotsu.jpg" }
     ];
    
     
     function fetchRamens() {
        fetch("http://localhost:3000/ramens")
            .then(response => response.json())
            .then(data => {
                ramens = data;
                displayRamens();
            })
            .catch(error => console.error("Error loading JSON:", error));
        }

     function displayRamens () {
const ramenMenu= document.getElementById("ramen-menu");
console.log(ramenMenu)
   
ramenMenu.innerHTML ="";

 ramens.forEach((ramen , index ) => {
    const ramenImage =document.createElement("img");
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;
    ramenImage.addEventListener("click" ,() => handleClick(ramen));

  ramenMenu.appendChild(ramenImage);
 });


if (ramens.length > 0){
    handleClick(ramens [0]);
}
}

function handleClick(ramen) {
    const ramenDetail =document.getElementById("ramen-detail");
    ramenDetail.innerHTML =`
    <h2>${ramen.name}</h2>
    <p>Restaurant: ${ramen.restaurant}</p>
    ${ramen.rating ? `<P>Rating: ${ramen.rating ||"no rating yet"}</P>`:""}
    ${ramen.comment? `<p>comment: ${ramen.comment ||"No comments yet"}</p>`:""}
    <button id="edit-button">Edit</button>
    <button id ="delete-button">Delete</button>
    `;
    
    document.getElementById("edit-button").addEventListener("click", () => editRamen(ramen));
    document.getElementById("delete-button").addEventListener("click", () => deleteRamen(ramen));
}

document.addEventListener("DOMContentLoaded" ,displayRamens);

function deleteRamen(ramen) {
    const index = ramens.findIndex(r => r.id === ramen.id);
    if (index !== -1) {
        ramens.splice(index, 1);
        displayRamens();
    }
}


function addSubmitListener() {
    const form = document.getElementById("new-ramen-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const name = document.getElementById("new-name").value;
        const restaurant = document.getElementById("new-restaurant").value;
        const image = document.getElementById("new-image").value;
        const rating = document.getElementById("new-rating").value;
        const comment = document.getElementById("new-comment").value;
        
        const newRamen = { id: ramens.length + 1, name, restaurant, image, rating, comment };
        ramens.push(newRamen);


        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.classList.add("ramen-image");
        img.addEventListener("click", () => handleClick(newRamen));
        
        document.getElementById("ramen-menu").appendChild(img);
        form.reset();
    });

}



fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRamen)
})
.then(response => response.json())
.then(data => {
    displayRamens([...document.querySelectorAll("#ramen-menu img")].map(img => ({
        name: img.alt,
        image: img.src
    })).concat(data)); // Add new ramen dynamically
    form.reset();
})
.catch(error => console.error("Error adding ramen:", error));


function main(){
    fetchRamens();
    addSubmitListener()
    
}
document.addEventListener("DOMContentLoaded", main);