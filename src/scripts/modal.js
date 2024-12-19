// Absolute positioned modal with image selector
const modalViewer = document.querySelector("#modal-viewer");
// The caption text of the current image in the modal
const modalCaption = modalViewer.querySelector("#modal-viewer_caption");
// Close button
const modalClose = modalViewer.querySelector("#modal-viewer_close");
// Next image button
const modalNext = modalViewer.querySelector("#modal-viever_arrows-next");
// Previous image button
const modalPrev = modalViewer.querySelector("#modal-viever_arrows-prev");
// Current image
const modalViewerImage = modalViewer.querySelector("img");
// All images that will be available in modal
const modalImages = Array.from(document.querySelectorAll(".modal-image"));

/*
 * scrollLock is an external module
 * .enablePageScroll() - Enables page scroll(mouse-wheel, double finger, etc...)
 * .disablePageScroll() - Disables it
 */

modalImages.forEach(modal =>
 modal.addEventListener("click", () => {
  modalViewer.classList.add("visible");
  loadImage(modal.id);
  scrollLock.disablePageScroll();
 })
);

document.addEventListener("keydown", function (event) {
 if (event.key == "Escape" && modalViewer.classList.contains("visible")) {
  modalViewer.classList.remove("visible");
  scrollLock.enablePageScroll();
 }
});

modalClose.addEventListener("click", () => {
 modalViewer.classList.remove("visible");
 scrollLock.enablePageScroll();
});

function loadImage(id) {
 // On last image and button press next => loop back
 // On first image and button press previous => go to last image
 // Else id
 id = id == modalImages.length ? 0 : id == -1 ? modalImages.length - 1 : id;
 const img = modalImages[id];
 // store the id in a dataset value
 modalViewer.dataset.current = id;
 modalCaption.innerHTML = `${img.alt}<br/><br/>${img.dataset.description}`;
 modalViewerImage.classList.add("fade-out-from-top");
 modalViewerImage.src = img.src;
}

function loadNextImage() {
 loadImage(+modalViewer.dataset.current + 1);
}

function loadPreviousImage() {
 loadImage(+modalViewer.dataset.current - 1);
}

modalNext.addEventListener("click", loadNextImage);

modalPrev.addEventListener("click", loadPreviousImage);

// Enable arrow keys controls for next and previous image
document.addEventListener("keydown", function (event) {
 if (!modalViewer.classList.contains("visible")) return;
 if (event.key == "ArrowRight") {
  loadNextImage();
 } else if (event.key == "ArrowLeft") {
  loadPreviousImage();
 }
});

modalViewerImage.addEventListener("animationend", () => {
 modalViewerImage.classList.remove("fade-out-from-top");
});
