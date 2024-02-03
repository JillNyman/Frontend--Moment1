"use strict";

//elements
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

//event listener
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);


//TA FRAM MENYN
function toggleMenu() {
  let navMenuEl = document.getElementById("nav-menu");

  let style = window.getComputedStyle(navMenuEl);

  if (style.display === "none") {
    navMenuEl.style.display = "block";
  } else {
    navMenuEl.style.display = "none";
  }
}

//TABELL

window.onload = init;

function init(){
    processData();
}

// En asynkron funktion som simulerar hämtning av data från en API
async function fetchData() {
    try {
        const response = await fetch('https://dahlgren.miun.se/ramschema_ht23.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Användning av den asynkrona funktionen
async function processData() {
    try {
        const result = await fetchData(); // Väntar på att data ska hämtas
        console.log('Received data:', result);
        createTable(result);//skapar tabell
        // ... gör något med den mottagna datan
    } catch (error) {
        // Hantera fel om det uppstår vid hämtning eller bearbetning av data
    }
    
}


//funktion skapa tabell/lista
function createTable(result){

    const tableItem = document.getElementById("table-course");

    /*let code = result[i].code;
    let courseName = result[i].coursename;
    let prog = result[i].progression;*/

    result.forEach(res => {
        let newTableEl = document.createElement("tr");

        let newCodeEl = document.createElement("td");
        let newCodePost = document.createTextNode(res.code);
        newCodeEl.appendChild(newCodePost);

        //lägg till klass
        newCodeEl.className = "course-code";

        let newCourseEl = document.createElement("td");
        let newCoursePost = document.createTextNode(res.coursename);
        newCourseEl.appendChild(newCoursePost);

        //lägg till klass
        newCourseEl.className = "course-name";

        let newProgEl = document.createElement("td");
        let newProgPost = document.createTextNode(res.progression);
        newProgEl.appendChild(newProgPost);

        newProgEl.className = "course-prog";

        //Slå ihop
        newTableEl.appendChild(newCodeEl);
        newTableEl.appendChild(newCourseEl);
        newTableEl.appendChild(newProgEl);

         //skriv ut till DOM
         tableItem.appendChild(newTableEl);
    });

   
}

//let searchWindow = document.getElementById("searchform");
//let searchBtn = document.getElementById("searchbtn");

//searchWindow.addEventListener("keyup", searchResult, false);

//FUNKTIONER SOM SKA FUNGERA MEDAN MAN FYLLER I SÖKRUTAN
//filter() baserat på villkor, sedan skapas ny array som ska visas i listan

$(document).ready(function(){
    $("#searchform").on("keyup", function(){
        let value = $(this).val().toLowerCase();
        $("#table-course tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function sortTableByColumn(table, column, asc = true){
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    //Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column +1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column +1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    //Remove existing tr from table
    while(tBody.firstChild){
        tBody.removeChild(tBody.firstChild);

    }

    //Re-add the newly sorted rows
    tBody.append(...sortedRows);

} 

document.querySelectorAll("#table-head th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
       // const currentIsAscending = headerCell.classList.contains()

       sortTableByColumn(tableElement, headerIndex);
    })
})












