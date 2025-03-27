const searchButton = document.getElementById("btnSearch");
const clearButton = document.getElementById("btnClear");
const input = document.getElementById("conditionInput");
const resultsElement = document.getElementById("results");

url = "travel_recommendation_api.json";
async function get_data(event){
    try{
        if (event.type === 'click' || event.keyCode === 13){
            let keyword = input.value;

            if(!keyword){
                alert("Insert a keyword!");
                return;
            }
            let response = await fetch(url);
            let data = await response.json()
   
            keyword = keyword.toLowerCase();
            let first_letters = keyword.slice(0,5)
 
            let results = Object.keys(data).filter(keyword => keyword.startsWith(first_letters))[0]
            if(!results){
                alert("Nothing found!");
                return;
            }
           
            let recommendations = data[results]
            // Extraindo os locais de dentro caso a keyword seja countries
            if(first_letters == "count"){
                let countries = recommendations;
                let countries_len = countries.length;
                let i = true;
                recommendations = []
 
                while(i === true){
                    let number1 = Math.round(Math.random()*(countries_len - 1));
                    let number1_2 = Math.round(Math.random()*(countries_len - 1));
 
                    let cities1 = countries[number1].cities;
                    let cities1_len = cities1.length;
                    let number2 = Math.round(Math.random()*(cities1_len-1));
 
                    let cities1_2 = countries[number1_2].cities;
                    let cities1_2_len = cities1_2.length;
                    let number2_2 = Math.round(Math.random()*(cities1_2_len-1));
 
                    if(number1 !== number1_2 || number2 !== number2_2){
                        i = false;
                        recommendations = [cities1[number2], cities1_2[number2_2]];
                    }
                }
            }
            showResults(recommendations);
        }
    }
    catch(error){
        console.log(error);
    }
}
 
function showResults(database){
    try{
        resultsElement.innerHTML = "";
        for(let data of database){
            const resultContainer = document.createElement("div");
            resultContainer.classList.add("result-container");
 
            const image = document.createElement("img");
            image.src = data.imageUrl;
 
            const title = document.createElement("h2");
            title.textContent = data.name;
 
            const description = document.createElement("p");
            description.textContent = data.description;
 
            resultContainer.appendChild(title);
            resultContainer.appendChild(description);
            resultContainer.appendChild(image);
            resultsElement.appendChild(resultContainer);
        }
    } catch(error){
        console.log(error);
    }
}

function clear_data(){
    try{
        input.value = "";
        resultsElement.innerHTML = "";
    } catch(error){
        console.log(error);
    }
}

searchButton.addEventListener("click", get_data);
input.addEventListener("keydown", get_data);
clearButton.addEventListener("click", clear_data);
