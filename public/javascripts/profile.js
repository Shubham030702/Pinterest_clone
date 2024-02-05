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