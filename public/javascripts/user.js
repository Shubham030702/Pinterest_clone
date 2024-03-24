document.getElementById("mainImage").onerror = function() {
    this.src = "/images/human_11305946.png"; // Replace with the path to your fallback image
    this.alt = "Fallback Image"; // Change alt text to describe the fallback image
};