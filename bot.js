const utterances = [
  ["hi", "hello", "hey"],
  ["how are you", "how are you doing", "how are you feeling"],
  ["where are you", "where are you located", "where are you from"],
  ["what do you do", "what is your job", "what do you do for work"],
  ["family","do you have a family", "do you have kids", "do you have any children"],
  ["do you like your job", "do you enjoy your work", "do you like working"],
  ["thank you", "thanks", "thank you very much"],
  ["goodbye", "bye", "see you later"],
  
  ["how do you deliver presents",
    "how do you deliver all the presents", 
    "how do you deliver presents to everyone",
    "how do you get all the presents to everyone",
    "how do you deliver all the presents in one night"
  ], //1
  ["how do you know if i'm naughty or nice", "how do you know if i've been naughty or nice", "how do you decide if i'm naughty or nice", "how do you decide if i've been naughty or nice", "how do you determine if i'm naughty or nice", "how do you determine if i've been naughty or nice"], //2
  ["what do you want for christmas", "what's on your christmas list", "what do you want for the holidays", "what's on your wishlist", "what are you hoping to get for christmas"], //3
  ["how do you get into houses", "how do you get into houses without a chimney", "how do you enter houses", "how do you enter houses without a chimney", "how do you get inside houses", "how do you get inside houses without a chimney"], //4
  ["how do you know what presents to give me", "how do you decide what presents to give me", "how do you choose what presents to give me", "how do you pick what presents to give me", "how do you determine what presents to give me"], //5
  ["how old are you", "what's your age", "how many years have you been alive"], //6
  ["can i have a reindeer for christmas", "can i have a real live reindeer for christmas", "can i have a pet reindeer", "can i have a baby reindeer", "can i have a reindeer for a pet", "can i have a reindeer as a pet"],
  // 7.
  ["oh really", "really", "that's cool"],
  ];
 
// Possible responses corresponding to triggers
const answers = [
  ["Hi! How are you today?", "Hello! How are you doing?", "Hey there! How are you?"],
  ["I'm doing well, thank you for asking. How about you?", "I'm feeling good, thanks for asking. How about you?", "I'm doing well, thanks for asking. How about you?"],
  ["I'm located at the North Pole, where I work with my team of elves to prepare for Christmas.", "I'm from the North Pole, where I work with my team of elves to get ready for Christmas.", "I'm at the North Pole, where I work with my team of elves to prepare for Christmas."],
  ["I'm Santa Claus, and my job is to deliver presents to good boys and girls around the world on Christmas Eve.", "I'm Santa, and my job is to deliver presents to good children around the world on Christmas Eve.", "I'm Santa, and I deliver presents to good children around the world on Christmas Eve."],
  ["Yes, I have a wonderful family. I have a wife named Mrs. Claus, and we have many elves who work with us at the North Pole.", "Yes, I have a family. I have a wife named Mrs. Claus, and we have many elves who work with us at the North Pole.", "Yes, I have a family. My wife is Mrs. Claus, and we have many elves who work with us at the North Pole."],
  ["I love my job! Bringing joy to children on Christmas Eve is the best feeling in the world.", "I enjoy my work very much. There's nothing better than bringing joy to children on Christmas Eve.", "I love my job! There's no greater feeling than bringing joy to children on Christmas Eve."],
  ["You're welcome! It's always a pleasure to help out.", "No problem! It's my pleasure to help.", "You're welcome! It's always nice to be able to help out."],
  ["Goodbye! I hope you have a wonderful day.", "Bye! I hope you have a great day.", "See you later! I hope you have a fantastic day."],
  ["I have magic that helps me and my reindeer fly around the world in just one night.", "I have special powers that help me deliver presents to everyone in one night.", "I have magic that allows me to deliver presents to everyone in just one night.", "I use magic to help me and my reindeer fly around the world and deliver presents in just one night."], //1
  ["I have a list that tells me if you're naughty or nice.", "I use a list to keep track of who's been naughty or nice.", "I have a special list that helps me determine who's been naughty or nice.", "I use a list to determine who's been naughty or nice."], //2
  ["Seeing you happy is the best gift of all!", "Making you happy is the best present of all!", "Seeing the joy on your face is the best gift I could ask for!", "Making you smile is the best present I could receive!"], //3
  ["I have magic that lets me get into any house.", "I have special powers that allow me to enter any house.", "I have magic that helps me get into any house, even if it doesn't have a chimney.", "I use magic to enter any house, even if it doesn't have a chimney."], //4
  ["I listen to what you want for Christmas and use special tools to help me figure out the perfect gift.", "I pay attention to what you want for Christmas and use special tools to help me choose the perfect gift.", "I use special tools to help me determine the perfect gift for you based on what you want for Christmas.", "I use special tools and my knowledge of what you want for Christmas to help me pick the perfect gift."], //5
  ["I'm very, very old, but age is just a number. I love bringing joy to children on Christmas Eve.", "I'm very old, but that doesn't stop me from bringing joy to children on Christmas Eve.", "I'm quite old, but that doesn't stop me from enjoying bringing joy to children on Christmas Eve.", "Age is just a number, and I love bringing joy to children on Christmas Eve."], //6
  ["I'm sorry, but I can't give you a real live reindeer. They need to stay with their friends and family at the North Pole.", "I'm sorry, but real live reindeer need to stay with their families and friends at the North Pole.", "I'm sorry, but reindeer are better off staying with their families and friends at the North Pole.", "I'm sorry, but it's not possible for you to have a real live reindeer. They belong at the North Pole with their friends and family."],
  // 7.
];
 
// For any other user input
const alternatives = [
  "Go on...",
  "My elves are helping me figure that out...",
  "I don't know everything...",
];

const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
    inputField.blur(); 
  }
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  } 
  else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  addChatEntry(input, product);
}

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}
