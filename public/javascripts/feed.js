document.addEventListener('click', function (e) {
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

var modalImage = document.getElementById("modalImage");

var a;
function openModal(imageUrl, dpUrl, fullname, id) {
  modalImage.src = "https://res.cloudinary.com/dwzejho0w/image/upload/v1708087070/" + imageUrl;
  dpimage.src = "https://res.cloudinary.com/dwzejho0w/image/upload/v1708087070/" + dpUrl;
  username.innerHTML = fullname;
  modal.style.display = "block";
  a=id;
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function navigateAndExecute() {
  window.location.href = '/like/'+a;
}
