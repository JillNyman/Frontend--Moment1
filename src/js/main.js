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
        // ... gör något med den mottagna datan
    } catch (error) {
        // Hantera fel om det uppstår vid hämtning eller bearbetning av data
    }
}
processData();

/*
function createTable(){
    const tableItem = document.getElementById("table-course");


}*/