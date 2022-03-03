const url = "http://localhost:3000/dogs/";

const getDogs = () => {
    clearDogs();

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type" : "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify()
    })
    .then(resp => resp.json())
    .then(json => {
        json.forEach(Dog => {
            addDog(Dog);
        })
    })
}

addDog = (dog) => {
    const tableLoc = document.getElementById("table-body");
    const dogTable = document.createElement("tr");
    const dogName = document.createElement("td");
    const dogBreed = document.createElement("td");
    const dogSex = document.createElement("td");
    const dogBut = document.createElement("button");

    dogBut.addEventListener('click', (e) => {
        e.preventDefault();
        editDog(dog);
    })

    dogName.innerHTML = dog.name;
    dogBreed.innerHTML = dog.breed;
    dogSex.innerHTML = dog.sex;
    dogBut.innerHTML = "Edit";

    dogTable.appendChild(dogName)
    dogTable.appendChild(dogBreed)
    dogTable.appendChild(dogSex)
    dogTable.appendChild(dogBut)

    tableLoc.appendChild(dogTable);

}

editDog = (dog) => {
    const dogForm = document.getElementById("dog-form");

    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        dog.name = dogForm.name.value;
        dog.breed = dogForm.breed.value;
        dog.sex = dogForm.sex.value;

        dogPat(dog);
        getDogs();
    })

}

dogPat = (dog) => {
    fetch(url + dog.id, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex

        })

    })
}

clearDogs = () => {
    const table = document.getElementById("table-body");

    let child = table.lastElementChild;

    while(child) {
        table.removeChild(child)
        child = table.lastElementChild;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getDogs();

})