document.addEventListener('DOMContentLoaded', () => {
  const customCursor = document.querySelector('.custom-cursor');
  const titleSpan = document.querySelector('.title');
  const content = document.querySelector('.content');

  titleSpan.addEventListener('mouseover', () => {
    customCursor.classList.add('cursor-hovered');
  });
  content.addEventListener('mouseover', () => {
    customCursor.classList.add('content-hovered');
  });
  titleSpan.addEventListener('mouseout', () => {
    customCursor.classList.remove('cursor-hovered');
  });
  content.addEventListener('mouseout', () => {
    customCursor.classList.remove('content-hovered');
  });

  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.pageX + 'px';
    customCursor.style.top = e.pageY + 'px';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = 1;
});