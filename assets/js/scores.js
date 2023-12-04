document.addEventListener("DOMContentLoaded", function () {
  const highscoresList = document.getElementById("highscores");
  const clearButton = document.getElementById("clear");

  // Load existing highscores from local storage

  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Sort the highscores by score (from high to low)

  highscores.sort((a, b) => b.score - a.score);

  // Display highscores

  displayHighscores();

  clearButton.addEventListener("click", function () {
    // Clear the highscores in local storage

    localStorage.removeItem("highscores");

    // Clear the displayed highscores

    highscoresList.innerHTML = "";
  });

  function displayHighscores() {
    // Clear the existing highscores in the displayed list

    highscoresList.innerHTML = "";

    // Display each highscore in the list

    highscores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
      highscoresList.appendChild(listItem);
    });
  }
});
