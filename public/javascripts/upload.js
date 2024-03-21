const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');

imageInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        imagePreview.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
});
