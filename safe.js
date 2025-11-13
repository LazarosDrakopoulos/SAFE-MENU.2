// Array to hold selected allergens
let selectedAllergens = [];

// Toggle predefined allergen
function toggleAllergen(element) {
  const allergen = element.getAttribute('data-name');

  if (selectedAllergens.includes(allergen)) {
    selectedAllergens = selectedAllergens.filter(a => a !== allergen);
    element.style.border = "2px solid transparent";
  } else {
    selectedAllergens.push(allergen);
    element.style.border = "2px solid #ff7b00";
  }

  // Save to localStorage immediately
  localStorage.setItem('userAllergens', JSON.stringify(selectedAllergens));

  updateSelectedDisplay();
}


// Show modal for custom allergen
function addCustomAllergen() {
  document.getElementById('customAllergenModal').style.display = 'block';
  document.getElementById('customInput').value = '';
}

// Close modal
function closeCustomModal() {
  document.getElementById('customAllergenModal').style.display = 'none';
}

// Submit custom allergen
function submitCustomAllergen() {
  const input = document.getElementById('customInput').value.trim();
  if (input !== '' && !selectedAllergens.includes(input)) {
    selectedAllergens.push(input);

    // Save immediately
    localStorage.setItem('userAllergens', JSON.stringify(selectedAllergens));

    updateSelectedDisplay();
  }
  closeCustomModal();
}

// Optional: close modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById('customAllergenModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Update display of selected allergens
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

// Submit allergens and go to menu.html
function submitAllergens() {
  localStorage.setItem('userAllergens', JSON.stringify(selectedAllergens));
  window.location.href = "menu.html";
}
