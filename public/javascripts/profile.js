document.addEventListener('click', function(e) {
    var dropdown = document.getElementById('dropdown-content');
    var arrowIcon = document.getElementById('arrow-icon');
    if (e.target.closest('#more')) {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      dropdown.style.opacity = dropdown.style.opacity === '0' ? '1' : '0';
      dropdown.style.visibility = dropdown.style.visibility === 'hidden' ? 'visible' : 'hidden';
      arrowIcon.style.transform = dropdown.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
    } else if (!e.target.closest('#more') && dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      arrowIcon.style.transform = 'rotate(0deg)';
    }
  });

var modal = document.getElementById("myModal");

var btn = document.getElementById("edit");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.getElementById("mainImage").onerror = function() {
  this.src = "/images/human_11305946.png"; // Replace with the path to your fallback image
  this.alt = "Fallback Image"; // Change alt text to describe the fallback image
};
 
