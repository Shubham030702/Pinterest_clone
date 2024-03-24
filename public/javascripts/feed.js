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

const modal = document.getElementById("myModal");

const span = document.getElementsByClassName("close")[0];

const array = document.querySelectorAll('.card');

var id;
let imageSrc;
let description;

array.forEach(e => {
  e.addEventListener('click', () => {
    const mname = e.querySelector('.name').textContent;
    description = e.querySelector('.bottom-text').textContent;
    imageSrc = e.querySelector('.card-image').src;
    const numberoflikes = e.querySelector('.likesnumber').innerHTML;
    const likes = e.querySelector('.usersliked').innerHTML;
    id = e.querySelector('.likes').textContent;
    document.getElementById('users').innerHTML = likes;
    document.getElementById('nooflikes').innerHTML = numberoflikes;
    document.getElementById('modalName').textContent = mname;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = imageSrc;
    modal.style.display = "block";
  });
});

const open = document.getElementById('likedby');

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    open.style.display = "none";
  }
};

$(document).ready(function () {
  $('.fa-heart').click(function () {
    var postId = id.trim();
    $.ajax({
      url: '/like/' + postId,
      type: 'POST',
      success: function (response) {
        $('#nooflikes').text(response.post.likes.length);
        console.log('Post liked successfully!');
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
});

function openlikes() {
  open.style.display = "block";
}

function openfullimage() {
  window.location.href = imageSrc;
}

function downloadImage(url, filename) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = 'Anonymous';

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    var jpegData = canvas.toDataURL('image/jpeg');
    
    var anchor = document.createElement('a');
    anchor.href = jpegData;
    anchor.download = filename;
    anchor.click();
  };

  img.src = url;
}

document.getElementById("downloadButton").addEventListener("click", function() {
  var imageURL = imageSrc;
  var imageName = description+"pixelvista.jpeg";
  downloadImage(imageURL, imageName);
});

