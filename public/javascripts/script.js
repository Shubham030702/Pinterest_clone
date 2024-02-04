document.addEventListener('DOMContentLoaded', () => {
  const customCursor = document.querySelector('.custom-cursor');
  const titleSpan = document.querySelector('.title');

  titleSpan.addEventListener('mouseover', () => {
    customCursor.classList.add('cursor-hovered');
  });

  titleSpan.addEventListener('mouseout', () => {
    customCursor.classList.remove('cursor-hovered');
  });

  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.pageX + 'px';
    customCursor.style.top = e.pageY + 'px';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = 1;
});