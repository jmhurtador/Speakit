
// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var authorizationToken;
var SpeechSDK;
var recognizer;

document.addEventListener("DOMContentLoaded", function () {
    startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
    subscriptionKey = "32467229fb7b446d8b435b5fd78dd118";
    serviceRegion = "eastus";

    if (startRecognizeOnceAsyncButton != null) {
        startRecognizeOnceAsyncButton.addEventListener("click", function () {
            startRecognizeOnceAsyncButton.disabled = true;
            //$('form').find('input[type=text],textarea,select').filter(':visible:first').value;
            console.log($('form').find('input[type=text],textarea,select').filter(':visible:first'));
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
                    startRecognizeOnceAsyncButton.disabled = false;
                    //phraseDiv.innerHTML += result.text;
                    window.console.log(result);

                    recognizer.close();
                    recognizer = undefined;
                },
                function (err) {
                    startRecognizeOnceAsyncButton.disabled = false;
                    //phraseDiv.innerHTML += err;
                    window.console.log(err);

                    recognizer.close();
                    recognizer = undefined;
                });
        });
    }
    if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
        startRecognizeOnceAsyncButton.disabled = false;

        document.getElementById('content').style.display = 'block';
        document.getElementById('warning').style.display = 'none';

        // in case we have a function for getting an authorization token, call it.
        if (typeof RequestAuthorizationToken === "function") {
            RequestAuthorizationToken();
        }
    }
});




// navigator.mediaDevices.getUserMedia({
//             audio: true
//         })
//         .then(function (stream) {
//             console.log('You let me use your mic!');
//         })
//         .catch(function (err) {
//             console.log('No mic for you!');
// });
