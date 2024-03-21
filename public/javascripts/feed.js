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

array.forEach(e => {
  e.addEventListener('click', () => {
    const name = e.querySelector('.name').textContent;
    const description = e.querySelector('.bottom-text').textContent;
    const imageSrc = e.querySelector('.card-image').src;
    const likes=e.querySelector('.likesnumber').textContent;
    id = e.querySelector('.likes').textContent;
    document.getElementById('nooflikes').textContent=likes;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = imageSrc;
    modal.style.display = "block";
  });
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$(document).ready(function () {
  $('.fa-heart').click(function () {
    var postId = id;
    postId = postId.trim();
    console.log(postId);
    $.ajax({
      url: '/like/' + postId,
      type: 'POST',
      success: function (response) {
        console.log('Post liked successfully!');
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
});
