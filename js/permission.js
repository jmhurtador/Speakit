navigator.mediaDevices.getUserMedia({audio: true})

navigator.webkitGetUserMedia({ audio: true }, 
    s => {
        console.log('You let me use your mic!');
    }, 
    err => {
        console.log(err);
    }
);
  // subscription key and region for speech services.
  var subscriptionKey, serviceRegion;
  var authorizationToken;
  var SpeechSDK;
  var recognizer;
//console.log($('form').find('input[type=text],textarea,select').filter(':visible:first'));
function startRecognition(){
    alert("Clicked");
    subscriptionKey = "32467229fb7b446d8b435b5fd78dd118";
    serviceRegion = "eastus";
  
    //$('form').find('input[type=text],textarea,select').filter(':visible:first').value;
    
    // if we got an authorization token, use the token. Otherwise use the provided subscription key
    var speechConfig;
    if (authorizationToken) {
      speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
    } else {
      if (subscriptionKey === "" || subscriptionKey === "subscription") {
        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
        return;
      }
      speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    }
  
    speechConfig.speechRecognitionLanguage = "en-US";
    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
  
    recognizer.recognizeOnceAsync(
      function (result) {
        $('form').find('input[type=text],textarea,select').filter(':visible:first').value += result.text;
        //phraseDiv.innerHTML += result.text;
        window.console.log(result);
  
        recognizer.close();
        recognizer = undefined;
      },
      function (err) {
        //phraseDiv.innerHTML += err;
        window.console.log(err);
  
        recognizer.close();
        recognizer = undefined;
      });
  
  
    if (!!window.SpeechSDK) {
      SpeechSDK = window.SpeechSDK;
  
      // in case we have a function for getting an authorization token, call it.
      if (typeof RequestAuthorizationToken === "function") {
        RequestAuthorizationToken();
      }
    }
  };

// document.addEventListener("DOMContentLoaded", function () {
//     subscriptionKey = "32467229fb7b446d8b435b5fd78dd118";
//     serviceRegion = "eastus";
  
//     navigator.mediaDevices.getUserMedia({audio: true});
  
//     //$('form').find('input[type=text],textarea,select').filter(':visible:first').value;
    
//     // if we got an authorization token, use the token. Otherwise use the provided subscription key
//     var speechConfig;
//     if (authorizationToken) {
//       speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
//     } else {
//       if (subscriptionKey === "" || subscriptionKey === "subscription") {
//         alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
//         return;
//       }
//       speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
//     }
  
//     speechConfig.speechRecognitionLanguage = "en-US";
//     var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
//     recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
  
//     recognizer.recognizeOnceAsync(
//       function (result) {
//         console.log($('form').find('input[type=text],textarea,select').filter(':visible:first'));
//         //phraseDiv.innerHTML += result.text;
//         window.console.log(result);
  
//         recognizer.close();
//         recognizer = undefined;
//       },
//       function (err) {
//         //phraseDiv.innerHTML += err;
//         window.console.log(err);
  
//         recognizer.close();
//         recognizer = undefined;
//       });
  
  
//     if (!!window.SpeechSDK) {
//       SpeechSDK = window.SpeechSDK;
  
//       // in case we have a function for getting an authorization token, call it.
//       if (typeof RequestAuthorizationToken === "function") {
//         RequestAuthorizationToken();
//       }
//     }
//   });