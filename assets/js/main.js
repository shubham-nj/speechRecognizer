window.SpeechRecognititon =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end");

let p = document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript);
  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    p.textContent = transcript;
    transcript_element.appendChild(p);
    p.textContent = "";
    if (transcript.includes("what is your name")) {
      let command = document.createElement("p");
      command.classList.add("command");
      command.textContent = "I am Winston";
      transcript_element.appendChild(command);
    }
    if (transcript.includes("Winston are you online")) {
      let command = document.createElement("p");
      command.classList.add("command");
      command.textContent = "I am always online!";
      transcript_element.appendChild(command);
    }
  }
});
recognition.addEventListener("end", () => {
  end_button.disabled = true;
  talk_button.disabled = false;
});

talk_button.addEventListener("click", () => {
  end_button.disabled = false;
  talk_button.disabled = true;
  recognition.start();
});
end_button.addEventListener("click", () => {
  end_button.disabled = true;
  talk_button.disabled = false;
  recognition.stop();
});
recognition.start();
