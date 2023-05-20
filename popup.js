(() => {
  // console.log("Starting popup?.js");
  //on btn click
  const focusModeBtn = document.getElementById("focus-mode-btn");
  if (focusModeBtn) {
    focusModeBtn.addEventListener("click", async () => {
      const currentTab = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: currentTab[0]?.id },
        function: () => {
          let focusMode = JSON.parse(localStorage.getItem("focusMode"));
          focusMode = !focusMode;
          localStorage.setItem("focusMode", JSON.stringify(focusMode));
          console.log("focusMode set to " + focusMode);

          const quotes = [
            "Take back control of your YouTube experience.",
            "Eliminate distractions and stay focused on your goals.",
            "Choose your own adventure on YouTube.",
            "Be the master of your YouTube recommendations.",
            "Productivity starts with removing distractions.",
            "Focus on what matters.",
          ];

          const randomNumber = Math.floor(Math.random() * 5) + 1;

          // Create a new element with the focus quote and styles
          const focusQuote = document.createElement("div");
          focusQuote.innerText = quotes[randomNumber];
          focusQuote.style.position = "absolute";
          focusQuote.style.top = "50%";
          focusQuote.style.left = "50%";
          focusQuote.style.transform = "translate(-50%, -50%)";
          focusQuote.style.color = "#fff";
          focusQuote.style.fontFamily = "sans-serif";
          focusQuote.style.fontSize = "2rem";
          focusQuote.id = "focus-quote";

          const secondaryContents = document.querySelector(
            "#secondary.style-scope.ytd-watch-flexy"
          );
          // console.log("secondaryContents-->");
          // console.log(secondaryContents);
          secondaryContents.style.display = focusMode ? "none" : "block";

          const content = document.querySelector(
            "#contents.style-scope.ytd-rich-grid-renderer"
          );
          // console.log("content-->");
          // console.log(content);
          if (content) {
            content.style.display = focusMode ? "none" : "block";
          }
          const dismissible = document.querySelector("#dismissible");
          // console.log("dismissible-->");
          // console.log(dismissible);
          if (dismissible) {
            dismissible.style.display = focusMode ? "none" : "block";
          }
          const chips = document?.getElementById("chips");
          if (chips) {
            chips.style.display = focusMode ? "none" : "block";
          }

          const focusQuoteElement = document.getElementById("focus-quote");
          if (focusMode && focusQuoteElement) {
            focusQuoteElement.parentNode.removeChild(focusQuoteElement);
            content?.parentNode.appendChild(focusQuote);
          }
          if (focusMode && !focusQuoteElement) {
            content?.parentNode.appendChild(focusQuote);
          }
        },
      });
    });
  }

  //on page load
  if (document?.location?.origin === "https://www.youtube.com") {
    let focusMode = JSON.parse(localStorage.getItem("focusMode"));
    // console.log("focusMode - ", focusMode);

    if (focusMode) {
      const observer = new MutationObserver(() => {
        const suggestedVideos = document.getElementById("content");

        if (
          suggestedVideos &&
          document?.location?.href?.split("?")[0] === "https://www.youtube.com/"
        ) {
          const quotes = [
            "Take back control of your YouTube experience.",
            "Eliminate distractions and stay focused on your goals.",
            "Choose your own adventure on YouTube.",
            "Be the master of your YouTube recommendations.",
            "Productivity starts with removing distractions.",
            "Focus on what matters.",
          ];

          const randomNumber = Math.floor(Math.random() * 5) + 1;

          const content = document.querySelector(
            "#contents.style-scope.ytd-rich-grid-renderer"
          );
          if (content) {
            content.style.display = "none";
          }
          const dismissible = document.querySelector("#dismissible");
          if (dismissible) {
            dismissible.style.display = "none";
          }

          const chips = document.getElementById("chips");
          if (chips) {
            chips.style.display = "none";
          }

          const focusQuoteElement = document.getElementById("focus-quote");

          if (!focusQuoteElement) {
            // Create a new element with the focus quote and styles
            const focusQuote = document.createElement("div");
            focusQuote.innerText = quotes[randomNumber];
            focusQuote.style.position = "absolute";
            focusQuote.style.top = "50%";
            focusQuote.style.left = "50%";
            focusQuote.style.transform = "translate(-50%, -50%)";
            focusQuote.style.color = "#fff";
            focusQuote.style.fontFamily = "sans-serif";
            focusQuote.style.fontSize = "2rem";
            focusQuote.id = "focus-quote";
            content?.parentNode.appendChild(focusQuote);
          }
        }

        const secondaryContents = document.querySelector(
          "#secondary.style-scope.ytd-watch-flexy"
        );
        // console.log("secondaryContents-->");
        // console.log(secondaryContents);
        if (secondaryContents) {
          secondaryContents.style.display = "none";
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }
  }
})();
