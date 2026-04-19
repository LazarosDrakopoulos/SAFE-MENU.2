
let selectedAllergens = [];


function toggleAllergen(element) {
  const allergen = element.getAttribute('data-name');

  if (selectedAllergens.includes(allergen)) {
    selectedAllergens = selectedAllergens.filter(a => a !== allergen);
    element.style.border = "2px solid transparent";
  } else {
    selectedAllergens.push(allergen);
    element.style.border = "2px solid #ff7b00";
  }

  
  localStorage.setItem('userAllergens', JSON.stringify(selectedAllergens));

  updateSelectedDisplay();
}



function addCustomAllergen() {
  document.getElementById('customAllergenModal').style.display = 'block';
  document.getElementById('customInput').value = '';
}


function closeCustomModal() {
  document.getElementById('customAllergenModal').style.display = 'none';
}


function submitCustomAllergen() {
  const input = document.getElementById('customInput').value.trim();
  if (input !== '' && !selectedAllergens.includes(input)) {
    selectedAllergens.push(input);

    
    localStorage.setItem('userAllergens', JSON.stringify(selectedAllergens));

    updateSelectedDisplay();
  }
  closeCustomModal();
}


window.onclick = function(event) {
  const modal = document.getElementById('customAllergenModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


function updateSelectedDisplay() {
  const container = document.getElementById('selectedAllergens');
  container.innerHTML = "";
  selectedAllergens.forEach(a => {
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = a;
    container.appendChild(badge);
  });
}


function submitAllergens() {
  localStorage.setItem('userAllergens', JSON.stringify(selectedAllergens));
  window.location.href = "menu.html";
}
window.addEventListener("load", () => {
    const splash = document.getElementById("splash");


    if (sessionStorage.getItem("splashShown")) {
      splash.style.display = "none";
      return;
    }

  
    sessionStorage.setItem("splashShown", "true");

   
    setTimeout(() => {
      splash.classList.add("fade-out");
    }, 2000);

    setTimeout(() => {
      splash.style.display = "none";
    }, 2800);
  });
