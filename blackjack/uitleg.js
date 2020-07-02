window.onload = function (){
  const BASE_URL = "https://deckofcardsapi.com/api/deck/new/draw/?count=";

  const kaartenwaardes = document.getElementsByClassName("js--kaartenwaardes");
  const chairs = document.getElementsByClassName("js--chair");
  const tutorialText = document.getElementById("js--text");
  const nextButton = document.getElementById("js--nextButton");
  const dealersCardText = document.getElementById("js--dealersCardText");
  const playersCardText = document.getElementById("js--playersCardText");
  var currentTutorialStep = 1;
  var inzet = 0;
  const playerCards = document.getElementsByClassName("js--playerCard");
  const dealerCards = document.getElementsByClassName("js--dealerCard");
  let playerTotalCardValue = document.getElementById("js--playerTotalCardValue");
  let dealerTotalCardValue = document.getElementById("js--dealerTotalCardValue");
  var oldPositionplayer = 0.13;
  const hitButton = document.getElementById("js--hit");
  const standButton = document.getElementById("js--stand");
  const doubleDownButton = document.getElementById("js--doubleDown");
  let onScreenGeld = document.getElementById("js--geld");
  var whowon = document.getElementById("js--whowon");
  let insurance = false;
  var dealerTurn = false;
  var cheats = document.getElementById("js--cheats");
  let thirdCardPlayer = true;
  let secondCardDealer = true;
  let thirdCardDealer = false;
  let dealerCardX = -2.4;
  let playerTotalAmountOfCards = 2;
  let dealerTotalAmountOfCards = -2;
  let createdCards = [];
  let playerTotal = 0;
  let dealerTotal = 0;
  let geld = parseInt(onScreenGeld.getAttribute("value"));
  let playerAmountOfAces = 0;
  let dealerAmountOfAces = 0;
  let chips = document.getElementsByClassName("chips");
  const scene = document.getElementById("js--scene");
  let parentcamera = document.getElementById("js--parentcamera");
  let firstSetChips = true;
  var oldPosition = 0;
  var positionListChips = [];
  var scaleListChips = [];
  var rotateListChips = [];
  const playerTutorialCard1 = document.getElementById("js--playerTutorialCard1");
  const playerTutorialCard2 = document.getElementById("js--playerTutorialCard2");
  const playerTutorialCard3 = document.getElementById("js--playerTutorialCard3");
  const dealerTutorialCard1 = document.getElementById("js--dealerTutorialCard1");
  const dealerTutorialCard2 = document.getElementById("js--dealerTutorialCard2");
  const dealerTutorialCard3 = document.getElementById("js--dealerTutorialCard3");
  const speechbubble = document.getElementById("js--speechbubble");
  const welkomText = document.getElementById("js--text2");
  const introSound = new Audio("sound/2_intro.wav");
  const waardekaartenSound = new Audio("sound/3_WaardesKaarten.wav") ;
  const deAasSound = new Audio("sound/4_deAas.wav");
  const hoejewintSound = new Audio("sound/5_hoejewint.wav") ;
  const inzettenSound = new Audio("sound/6_inzetten.wav");
  const hitknopSound = new Audio("sound/7_hitknop.wav");
  const standSound = new Audio("sound/8_stand.wav") ;
  const winst1Sound = new Audio("sound/9_winst1.wav");
  const doubledownSound = new Audio("sound/10_doubledown.wav");
  const dealerDood = new Audio("sound/dealerdood.wav");
  const zetgeldIn = new Audio("sound/zetGeldIn.wav");
  const euro50 = new Audio("sound/50euroinzet.wav");
  const euro25 = new Audio("sound/25euroinzet.wav");
  const euro10 = new Audio("sound/10euroinzet.wav");
  const euro5 = new Audio("sound/5euroinzet.wav");
  const hitSoundButton = new Audio("sound/hitSound.wav");
  const standSoundButton = new Audio("sound/standSound.wav");
  const doubledownSoundButton = new Audio("sound/doubledownSound.wav");
  const blackjackPlayerSound = new Audio("sound/blackjackPlayerSound.wav");
  const playertehoogSound = new Audio("sound/playerteHoogSound.wav");
  const dealertehoogSound = new Audio("sound/dealertehoogSound.wav");
  const drawSound = new Audio("sound/drawSound.wav");
  const meerDanDealer = new Audio("sound/meerDanDealer.wav");
  const minderDanDealer = new Audio("sound/minderDanDealer.wav");

  // Bij pagina laden krijgen alle kaarten een waarde en van hier wordt het spel gespeeld.

  setChairsClickEvent();
  setNextButtonClickEvent();

  //test
  function setChairsClickEvent(){
    //welkomSound.components.sound.playSound();
    for (let i = 0; i < chairs.length; i++){
      chairs[i].onclick = (event) =>{
        welkomText.setAttribute("visible", "false");
        let att = document.createAttribute("animation");
          //Position waarde voor mobile VR = 0 0.5 -1.2
        let position = "0 1.8 -1.3";
        att.value = "property: position; easing: linear; dur: 2000; to: " + position;
        console.log(parentcamera);
        document.getElementById("rig").setAttribute("animation", att.value);
        currentTutorialStep ++;
        setTutorialText();
      };
    }
  }

  function setNextButtonClickEvent(){
      nextButton.addEventListener('click', function(evt){
      setTutorialText();
    });
  }

  function removeAllTutorialCards(){
    playerTutorialCard1.remove();
    playerTutorialCard2.remove();
    playerTutorialCard3.remove();
    dealerTutorialCard1.remove();
    dealerTutorialCard2.remove();
    dealerTutorialCard3.remove();
  }

  function setChips(freeplay, beforetot){
    if(freeplay == true){
      removeClickable();
    }
    if(firstSetChips == false){
      for(let i = 0; i < chips.length; i++){
      chips[i].setAttribute("position", positionListChips[i]);
      chips[i].setAttribute("rotation", rotateListChips[i]);
      chips[i].setAttribute("scale", scaleListChips[i]);
      }
    }
    else if(firstSetChips == true){
      for(let i = 0; i < chips.length; i++){
        positionListChips.push(Object.assign({}, chips[i].getAttribute("position")));
        scaleListChips.push(Object.assign({}, chips[i].getAttribute("scale")));
        rotateListChips.push(Object.assign({}, chips[i].getAttribute("rotation")));
      }
      oldPosition = chips[0].getAttribute("position");
      firstSetChips = false;
    }

    for(let i = 0; i < chips.length; i++){
      chips[i].setAttribute("visible", "true");
      chips[i].classList.add("clickable");
    }

    chips[0].onclick = (event) =>{
      inzetten(50);
      setTutorialText(true);
      animatechip(chips[0]);
      chipsOff(chips[0]);
      chips[0].classList.remove("clickable");
      if(freeplay == true){
        returnClickable();
        initButtons(true);
        setDealerCards();
        setPlayerCards();
        showCardsForFreeplay();
        if(beforetot == false){
          setText("Je hebt 50 euro ingezet.");
          zetgeldIn.pause();
          zetgeldIn.src = zetgeldIn.src;
          euro50.play();
        }
      }
    };
    chips[1].onclick = (event) =>{
      inzetten(25);
      setTutorialText(true);
      animatechip(chips[1]);
      chipsOff(chips[1]);
      chips[1].classList.remove("clickable");
      if(freeplay == true){
        returnClickable();
        initButtons(true);
        setDealerCards();
        setPlayerCards();
        showCardsForFreeplay();
        if(beforetot == false){
          setText("Je hebt 25 euro ingezet.");
          zetgeldIn.pause();
          zetgeldIn.src = zetgeldIn.src;
          euro25.play();
        }
      }
    };
    chips[2].onclick = (event) =>{
      inzetten(10);
      setTutorialText(true);
      animatechip(chips[2]);
      chipsOff(chips[2]);
      chips[2].classList.remove("clickable");
      if(freeplay == true){
        returnClickable();
        initButtons(true);
        setDealerCards();
        setPlayerCards();
        showCardsForFreeplay();
        if(beforetot == false){
          setText("Je hebt 10 euro ingezet.");
          zetgeldIn.pause();
          zetgeldIn.src = zetgeldIn.src;
          euro10.play();
        }
      }
    };
    chips[3].onclick = (event) =>{
      inzetten(5);
      setTutorialText(true);
      animatechip(chips[3]);
      chipsOff(chips[3]);
      chips[3].classList.remove("clickable");
      if(freeplay == true){
        returnClickable();
        initButtons(true);
        setDealerCards();
        setPlayerCards();
        showCardsForFreeplay();
        if(beforetot == false){
          setText("Je hebt 5 euro ingezet.");
          zetgeldIn.pause();
          zetgeldIn.src = zetgeldIn.src;
          euro5.play();
        }
      }
    };
  }

  function animatechip(chip){
    let att2 = document.createAttribute("animation");
    let att3 = document.createAttribute("animation__2");
    let att4 = document.createAttribute("animation__3");
    att2.value = "property: position; easing: linear; dur: 500; to: 0 1.3 -2.33";
    chip.setAttribute("animation", att2.value);
    att3.value = "property: rotation; easing: linear; dur: 500; to: 0 0 0";
    sleep(500).then(() => {chip.setAttribute("animation", att3.value);});
    att4.value ="property: scale; easing: linear; dur: 500; to: 0.1 0.1 0.1";
    sleep(1000).then(() => {chip.setAttribute("animation", att4.value);});
  }

  function chipsOff(chip){
    for(let i = 0; i < 4; i++){
      if(chips[i] !== chip){
      chips[i].setAttribute("visible", "false");
      }
    }
  }

  function showCardsForTutorialHitStand(){
    playerTutorialCard1.setAttribute("src", "https://deckofcardsapi.com/static/img/5H.png");
    playerTutorialCard2.setAttribute("src", "https://deckofcardsapi.com/static/img/4S.png");
    dealerTutorialCard1.setAttribute("src", "https://deckofcardsapi.com/static/img/8S.png");
    dealerTutorialCard2.setAttribute("src", "img/backside2.jpg");
    playerTotalCardValue.setAttribute("value", "9");
    dealerTotalCardValue.setAttribute("value", "8");

    setAttributeVisible(playerTutorialCard1, true);
    setAttributeVisible(playerTutorialCard2, true);
    setAttributeVisible(dealerTutorialCard1, true);
    setAttributeVisible(dealerTutorialCard2, true);
    setAttributeVisible(dealerTotalCardValue, true);
    setAttributeVisible(playerTotalCardValue, true);
  }

  function showCardsForTutorialDoubleDown(){
    playerTutorialCard3.setAttribute("visible", "false");
    playerTutorialCard1.setAttribute("src", "https://deckofcardsapi.com/static/img/7H.png");
    playerTutorialCard2.setAttribute("src", "https://deckofcardsapi.com/static/img/3D.png");
    dealerTutorialCard1.setAttribute("src", "https://deckofcardsapi.com/static/img/5S.png");
    dealerTutorialCard2.setAttribute("src", "img/backside2.jpg");
    playerTotalCardValue.setAttribute("value", "10");
    dealerTotalCardValue.setAttribute("value", "5");
    doubleDownButton.setAttribute("visible", "true");
    doubleDownButton.classList.add("clickable");
    setAttributeVisible(playerTutorialCard1, true);
    setAttributeVisible(playerTutorialCard2, true);
    setAttributeVisible(dealerTutorialCard1, true);
    setAttributeVisible(dealerTutorialCard2, true);
    setAttributeVisible(dealerTotalCardValue, true);
    setAttributeVisible(playerTotalCardValue, true);
  }

  function showCardsForFreeplay(){
    for(let i = 0; i < dealerCards.length; i++){
      dealerCards[i].setAttribute("visible", "true");
      playerCards[i].setAttribute("visible", "true");
    }
    dealersCardText.setAttribute("visible", "true");
    dealerTotalCardValue.setAttribute("visible", "true");
    playerTotalCardValue.setAttribute("visible", "true");
    playersCardText.setAttribute("visible", "true");
  }



  function setTutorialText(visible_game){
    if (currentTutorialStep == 2){
      introSound.play();
      for (let i = 0; i < chairs.length; i++){
        chairs[i].classList.remove("clickable");
      }

      setAttributeVisible(speechbubble, true);
      setAttributeVisible(nextButton, "true");
      nextButton.classList.add("clickable");
      setText("Bij dit spel wordt er tegen een dealer \ngespeeld. Het doel is om een hoger puntenaantal dan de dealer te behalen \nzonder jezelf dood te kopen.");
    }
    if (currentTutorialStep == 3){
      introSound.pause();
      waardekaartenSound.play();

      setText("Dit zijn de waardes van de kaarten.");

      for(let i=0; i<kaartenwaardes.length; i++){
        kaartenwaardes[i].setAttribute("visible", "true");
      }
    }

    if (currentTutorialStep == 4){
      waardekaartenSound.pause();
      deAasSound.play();

      setText("De aas is normaal 11 waard, maar als je puntenaantal hoger dan 21 is, veranderd \nde waarde van de aas naar 1.");
    }
    if (currentTutorialStep == 5) {
      deAasSound.pause();
      hoejewintSound.play();
      setText("Je wint dus door een hoger punten-\naantal te halen dan de dealer. Maar je\n moet er ook op letten dat je niet hoger \ndan 21 koopt, dat betekend dat je verliest. \nDit geld ook voor de dealer.");

      for(let i=kaartenwaardes.length-1; i>0; i=kaartenwaardes.length-1){
        kaartenwaardes[i].remove();
      }
      kaartenwaardes[0].remove();
    }

    if (currentTutorialStep == 6) {
      hoejewintSound.pause();
      inzettenSound.play();
      setText("Voordat het spel begint wordt er geld \ningezet. Als je wint krijg je deze \ninzet dubbel terug. Heb je met \nje eerste 2 kaarten blackjack (21), dan krijg \nje je inzet x 2.5 terug. Kijk nu naar een \ninzet munt om in te zetten");
      cleantable();
      setChips();
    }

    if (currentTutorialStep == 7){
      inzettenSound.pause();
      hitknopSound.play();
      setText("Nu begint het spel. Kijk naar de hit knop \nom een kaart te kopen.");
      showCardsForTutorialHitStand();
      setAttributeVisible(playersCardText, true);
      setAttributeVisible(dealersCardText, true);
      setAttributeVisible(hitButton, true);
      initButtons(false);
      setAttributeVisible(nextButton, false);
    }

    if(currentTutorialStep == 8){
      setText("Wanneer je tevreden bent met het aantal punten druk je op stand. In deze \nsituatie is de kans te groot om boven \nde 21 te kopen, dus kijk nu naar stand.");
      hitknopSound.pause();
      standSound.play();
      standButton.setAttribute("visible", "true");
      setAttributeVisible(playersCardText, true);
      setAttributeVisible(dealersCardText, true);
      console.log(currentTutorialStep);
    }
    if(currentTutorialStep == 9){
      standSound.pause();
      winst1Sound.play();

      cleantable();
      setText("Jij had 19 en de bank 18 dus heb je \ngewonnen! Zie je saldo. zet opnieuw in \nom een nieuw spel te starten.");
      setChips();
    }
    if(currentTutorialStep == 10){
      setText("Bij double down verdubbel je je inzet en \nkrijg je nog een kaart erbij. Hierna kan je \nniet nog een kaart krijgen en is het de \ndealers beurt. Kijk naar de double down \nknop.");
      winst1Sound.pause();
      doubledownSound.play();
      showCardsForTutorialDoubleDown();
      setAttributeVisible(playersCardText, true);
      setAttributeVisible(dealersCardText, true);
    }
    if(currentTutorialStep == 11){
      removeAllTutorialCards();
      dealerTotalCardValue.setAttribute("value", 0);
      playerTotalCardValue.setAttribute("value", 0);
      freeplaySetup();
      //doorspelen reset game heeft edits nodig met de nieuwe tutorial.
    }
    currentTutorialStep ++;

  }

  function freeplaySetup(){
    dealerTotalCardValue.setAttribute("value", 0);
    playerTotalCardValue.setAttribute("value", 0);
    for(let i = 0; i < dealerCards.length; i++){
      dealerCards[i].setAttribute("visible", "false");
      playerCards[i].setAttribute("visible", "false");
    }
    dealerDood.pause();
    zetgeldIn.play();
    cheats.setAttribute("visible", "true");
    cheats.classList.add("clickable")
    setText("Zet geld in om te spelen!");
    setChips(true, false);
  }

  function cleantable(){
    setAttributeVisible(playerTutorialCard1, false);
    setAttributeVisible(playerTutorialCard2, false);
    setAttributeVisible(playerTutorialCard3, false);
    setAttributeVisible(dealerTutorialCard1, false);
    setAttributeVisible(dealerTutorialCard2, false);
    setAttributeVisible(dealerTotalCardValue, false);
    setAttributeVisible(playerTotalCardValue, false);
    setAttributeVisible(playersCardText, false);
    setAttributeVisible(dealersCardText, false);
    nextButton.classList.remove("clickable");
    setAttributeVisible(nextButton, false);
  }

  function setAttributeVisible(item, boolean){
    item.setAttribute("visible", boolean);
  }

  function setText(text){
    tutorialText.setAttribute("value", text);
  }

  function getRandomCardPlayer(amount, card){
    fetch(BASE_URL + amount)
    .then( (data) => {
      return data.json();
    })
    .then( (response) => {
      addPlayerCardValue(response.cards[0].value.toLowerCase());
      card.setAttribute("src", response.cards[0].image);
      setCardTotalsOnScreen();
    });
  }

  function getRandomCardDealer(amount, card){
    fetch(BASE_URL + amount)
    .then( (data) => {
      return data.json();
    })
    .then( (response) => {
      addDealerCardValue(response.cards[0].value.toLowerCase());
      card.setAttribute("src", response.cards[0].image);
      setCardTotalsOnScreen();
    });
  }

  function setPlayerCards(){
    for (let i=0; i<playerCards.length; i++){
      getRandomCardPlayer(1, playerCards[i]);
    }
  }

  function setDealerCards(){
    getRandomCardDealer(1, dealerCards[0]);
    dealerCards[1].setAttribute("src", "#backside");
    //if ( (dealerCards[0].getAttribute("value")) == "ace") {
    //  offerInsurance();
    //}
  }

  function removeClickable() {
    standButton.setAttribute("visible", "false");
    hitButton.setAttribute("visible", "false");
    doubleDownButton.setAttribute("visible", "false");
  }

  function returnClickable() {
    standButton.setAttribute("visible", "true");
    hitButton.setAttribute("visible", "true");
    doubleDownButton.setAttribute("visible", "true");
    standButton.classList.add("clickable");
    hitButton.classList.add("clickable");
    doubleDownButton.classList.add("clickable");
  }


  // De twee kaarten van de players bij elkaar.
  function addPlayerCardValue(card){
    playerTotal += getCardValue(card);
    if(card == "ace"){
      playerAmountOfAces ++;
    }
    if(playerTotal > 21 && playerAmountOfAces == 0){
      endGame();
    }
  }

  function addDealerCardValue(card){
    dealerTotal += getCardValue(card);
    if(card == "ace"){
      dealerAmountOfAces ++;
    }
    if(dealerTurn == true && dealerTotal < 17){
      createNewCard("dealer");
    }
    if(dealerTotal >= 17){
      endGame();
    }
  }

  //Waarde van de kaarten worden omgezet naar ints, plaatjes krijgen de juiste int waarde.
  function getCardValue(card){
    if(parseInt(card) <= 10){
      return parseInt(card);
    }
    if(typeof card === "string" && card !== "ace"){
      return 10;
    }
    if(card == "ace"){
      return 11;
    }
  }

  //Laat de totale waarde van de kaarten zien van de dealer en player op het scherm.
  function setCardTotalsOnScreen(){
    if (playerTotal > 21 && playerAmountOfAces > 0){
      playerTotal -= 10;
      playerAmountOfAces --;
    }
    if (dealerTotal > 21 && dealerAmountOfAces > 0){
      dealerTotal -= 10;
      dealerAmountOfAces --;
    }
    if (playerTotal == 21){
      endGame();
    }
    playerTotalCardValue.setAttribute("value", playerTotal);
    dealerTotalCardValue.setAttribute("value", dealerTotal);
  }

  //Begin interactie
  //Handelt de button events af.
  function initButtons(tutorialIsDone){
    // ???
    hitButton.classList.add("clickable");
    hitButton.onclick = (event) => {
      if(tutorialIsDone == false){
        playerTutorialCard3.setAttribute("src", "https://deckofcardsapi.com/static/img/KC.png");
        playerTutorialCard3.setAttribute("visible", "true");
        playerTotalCardValue.setAttribute("value", "19");
        hitButton.classList.remove("clickable");
        standButton.classList.add("clickable");
        setTutorialText();
      } else{
        hitSoundButton.play();
      createNewCard("player");
      doubleDownButton.classList.remove("clickable");
      }
    };


    standButton.onclick = (event) => {
      if(tutorialIsDone == false){
        dealerTutorialCard2.setAttribute("src", "https://deckofcardsapi.com/static/img/0D.png");
        dealerTotalCardValue.setAttribute("value", "18");
        standButton.classList.remove("clickable");
        nextButton.classList.add("clickable");
        geld += (inzet * 2);
        onScreenGeld.setAttribute("value", geld);
        sleep(2000).then(() => {setTutorialText();});
      } else{
        standSoundButton.play();
        dealersTurn();
      }
    };
    doubleDownButton.onclick = (event) => {
      if(tutorialIsDone == false){
        playerTutorialCard3.setAttribute("src", "https://deckofcardsapi.com/static/img/QC.png");
        playerTutorialCard3.setAttribute("visible", "true");
        playerTotalCardValue.setAttribute("value", "20");
        dealerTutorialCard2.setAttribute("src", "https://deckofcardsapi.com/static/img/9H.png");
        dealerTotalCardValue.setAttribute("value", "14");
        dealerTutorialCard3.setAttribute("src", "https://deckofcardsapi.com/static/img/KD.png");
        dealerTutorialCard3.setAttribute("visible", "true");
        dealerTotalCardValue.setAttribute("value", "24");
        console.log("inzet: " + inzet);
        console.log("geld: " + geld);
        geld -= inzet;
        console.log("geld: " + geld);
        inzet = (inzet * 2);
        console.log("inzet: " + inzet);
        geld = geld + (inzet * 2);
        console.log("geld: " + geld);

        onScreenGeld.setAttribute("value", geld);
        setText("De dealer heeft meer dan 21 punten, dus\n je hebt gewonnen!");
        doubledownSound.pause();
        dealerDood.play();
        sleep(4700).then(() => {setTutorialText();});
      } else {
          doubledownSoundButton.play();
          doubleDown();
      }
    };
  }

  function removeClickableClass(){
    standButton.classList.remove("clickable");
    hitButton.classList.remove("clickable");
    doubleDownButton.classList.remove("clickable");
  }

  function dealersTurn(){
    dealerTurn = true;
    revealDealerSecondCard();
    standButton.classList.remove("clickable");
    hitButton.classList.remove("clickable");
  }

  function doubleDown(){
    geld = geld - inzet;
    onScreenGeld.setAttribute("value", geld);
    inzet = (inzet * 2);
    createNewCard("player");
    dealersTurn();
  }

  // Een nieuwe kaart wordt toegevoegd voor de Player of Dealer.
  function createNewCard(who){
    let card = document.createElement("a-plane");
    if(who == "player"){
      getRandomCardPlayer(1, card);
      playerTotalAmountOfCards ++;

      if (thirdCardPlayer == true) {
          thirdCardPlayer = false;
      }
      else if (thirdCardPlayer == false) {
        oldPositionplayer += 0.24;
      }
      var cardPositionPlayer = oldPositionplayer + " 1.35 " + "-2.69";

      card.setAttribute("position", cardPositionPlayer);
      card.setAttribute("scale", "0.20 0.45 0.2");
      card.setAttribute("rotation", "-80 0 0");
    }
    if(who == "dealer"){
      getRandomCardDealer(1, card);
      dealerTotalAmountOfCards --;

      card.setAttribute("scale", "1 1.5 1");

      if (secondCardDealer == true) {
        secondCardDealer = false;
      }
      else if (secondCardDealer == false && thirdCardDealer == false) {
        dealerCardX -= 0.03;
        thirdCardDealer = true;
      }
      else if (thirdCardDealer == true && secondCardDealer == false) {
        dealerCardX -= 0.6;
      }
      var cardPositionDealer = dealerCardX + " 3 " + "-4.6";
      card.setAttribute("position", cardPositionDealer);
      card.setAttribute("scale", "0.5 0.75 0.5");
    }
    scene.appendChild(card);
    //Laat de nieuwe waarde zien van de gecombineerde kaarten.
    //De nieuwe kaarten komen in een list om het later te kunnen verwijderen voor een nieuwe game.
    createdCards.push(card);
  }

  // Tweede kaart van de dealer wordt bekend gemaakt.
  function revealDealerSecondCard(){
    getRandomCardDealer(1, dealerCards[1]);
  }

  //Interactie stopt
  //Spel eindigt
  function endGame(){
    playerTotalAmountOfCards = 2;
    whowon.setAttribute("value", "");
    whowon.setAttribute("visible", "true");
    console.log(checkWhoWon());
    removeClickableClass();
    if (checkWhoWon() == "player"){
      geld += (inzet * 2);
      //onScreenInzet.setAttribute("value", "0");
      onScreenGeld.setAttribute("value", geld);
    }
    if(checkWhoWon() == "blackjackPlayer"){
      geld += (inzet * 2.5);
      //onScreenInzet.setAttribute("value", "0");
      onScreenGeld.setAttribute("value", geld);
    }
    if(checkWhoWon() == "insuredDealer"){
      geld += (inzet * 2);
      //onScreenInzet.setAttribute("value", "0");
      onScreenGeld.setAttribute("value", geld);
    }
    if (checkWhoWon() == "dealer"){
      //onScreenInzet.setAttribute("value", "0");
    }
    if (checkWhoWon() == "draw"){
      geld += inzet;
      //onScreenInzet.setAttribute("value", "0");
      onScreenGeld.setAttribute("value", geld);
      setText("Gelijk spel!");
    }
    sleep(5000).then(() => {resetGame();});
  }

  // Functie om te zien wie er heeft gewonnen. Voor nu voor debuggen
  // in de console, later aanpassen voor feedback geven aan de gebruiker.
  function checkWhoWon(){
    console.log(dealerTotal);
    if(playerTotal == 21 && playerTotalAmountOfCards == 2){
      blackjackPlayerSound.play();
      setText("Blackjack! Je hebt 21 punten \n en wint de pot.");
      return "blackjackPlayer";
    }
    if(dealerTotal == 21 && insurance == true){
      return "insuredDealer";
    }
    if (playerTotal > 21){
      playertehoogSound.play();
      setText("Bust! Je hebt teveel punten \n en verliest de pot.");
      return "dealer";
    }
    else if (dealerTotal > 21){
      dealertehoogSound.play();
      setText("Win! de dealer heeft teveel punten. \n goed gedaan! ");
      return "player";
    }
    else if (dealerTotal == playerTotal){
      drawSound.play();
      setText("Push! Het is gelijk spel. \n je krijgt je inzet terug.");
      return "draw";
    }
    else if (dealerTotal < playerTotal){
      meerDanDealer.play();
      setText("Win! Je hebt meer punten dan de dealer. \n je wint 2x je inzet!");
      return "player";
    }
    else if (dealerTotal > playerTotal){
      minderDanDealer.play();
      setText("Lose! Je hebt minder punten dan de dealer. \n je verliest je inzet.");
      return "dealer";
    }
  }

  //Inzet functie die waarde mee kreegt van geselecteerde chip / fiche.
  function inzetten(amount){
    inzet = amount;
    if (amount > geld){
      return false;
    }
    else {
      geld -= amount;
      onScreenGeld.setAttribute("value", geld);
    //  onScreenInzet.setAttribute("value", inzet);
    }
  }

  //Functie die zorgt dat er een delay in het spel is.
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Haalt de created cards die eerder in de list zijn tegevoegd weg.
  function removeAllCreatedCards(){
    for(let i=0; i<createdCards.length; i++){
      scene.removeChild(createdCards[i]);
    }
    createdCards = [];
  }

  //Reset de game geeft alles weer de begin waarde.
  function resetGame(){
    whowon.setAttribute("visible", "false");
    playerTotal = 0;
    dealerTotal = 0;
    thirdCardPlayer = true;
    removeAllCreatedCards();
    dealerTurn = false;
    playerTotalAmountOfCards = 2;
    dealerTotalAmountOfCards = -2;
    secondCardDealer = true;
    thirdCardDealer= false;
    dealerCardX = "-2.4";
    oldPositionplayer = 0.13;
    dealerAmountOfAces = 0;
    playerAmountOfAces = 0;

    freeplaySetup();
  }

  //cheats, deze button kan gebruikt worden om bepaalde dingen te debuggen / testen.
  //Voor nu kan je dit gebruiken voor een blackjack.

    cheats.onclick = (event) =>{
      console.log("hi");
      playerTotal = 21;
      endGame();
  };
};
