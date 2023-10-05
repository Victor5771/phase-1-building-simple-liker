// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const errorModal = document.getElementById("modal");
errorModal.classList.add("hidden");

// Function to handle the like button click
function handleLikeClick(event) {
  const likeGlyph = event.target;

  // Check if the likeGlyph is empty (not full)
  if (likeGlyph.textContent === EMPTY_HEART) {
    // Simulate making a server request
    mimicServerCall()
      .then(() => {
        // When the "server" returns a success status:
        likeGlyph.textContent = FULL_HEART;
        likeGlyph.classList.add("activated-heart");
      })
      .catch((error) => {
        // When the "server" returns a failure status:
        errorModal.classList.remove("hidden");
        const modalMessage = document.getElementById("modal-message");
        modalMessage.textContent = error;
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000); // Hide the modal after 3 seconds
      });
  } else {
    // If the heart is already full, revert it to empty
    likeGlyph.textContent = EMPTY_HEART;
    likeGlyph.classList.remove("activated-heart");
  }
}

// Add a click event listener to all like buttons
const likeButtons = document.querySelectorAll(".like-glyph");
likeButtons.forEach((button) => {
  button.addEventListener("click", handleLikeClick);
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
