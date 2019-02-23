// define a function here
// API documentation : https://goo.gl/pHifCY

function processImage() {

    // specify the subscriptionKey and uriBase
    // TODO: Replace <Subscription Key> with your valid subscription key.
    const subscriptionKey = "3845eaf7d07b432b83472bd15f5fb357";

    // TODO: Replace the regin to your region of subscription key
    const uriBase =
        "https://southcentralus.api.cognitive.microsoft.com/vision/v2.0/recognizeText";

    // Request parameter. aka Define the query
    const params = {
        "mode": "Handwritten",
    };

    // Get the URL from the text box and assign it to the value of the sourceImage
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Overall
    // We need to have two REST API calls [application program interface (API)]
    // One to submit the image for processing aka "POST" request
    // the other to retrieve the text found in the image "PULL" request
    
    // First
    // Make the first REST API call to submit the image for processing.
    // $ sign is an alias for jQuery in js
    // AJAX is a technique to do an XMLHttpRequest (out of band Http request)
    // from a web page to the server and send/retrieve data
    $.ajax(
        // Create an object to describe the AJAX request
        {
        // specify the url
        // NOTE: In a URL, the query starts with a question mark - the question mark is used as a separator, and is not part of the query string.
        url: uriBase + "?" + $.param(params),

        // specify the request headers
        // The jqXHR (jQuery XMLHttpRequest) replaces the browser native XMLHttpRequest object.
        beforeSend: function(jqXHR){
            jqXHR.setRequestHeader("Content-Type","application/json"); // Media type of the body sent to the API.
            jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        // specify the request type
        type: "POST",

        // Request body, url of the image that we sent to the API for processing
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
        }
    )
    
    // handles the callbacks of the request
    .done(function(data, textStatus, jqXHR) {
        // Show progress. Display the temporary values
        $("#responseTextArea").val("Handwritten text submitted. " +
            "Waiting 10 seconds to retrieve the recognized text.");

        // Note: The response may not be immediately available. Handwriting
        // recognition is an asynchronous operation that can take a variable
        // amount of time depending on the length of the text you want to
        // recognize. You may need to wait or retry the GET operation.
        
        // Wait ten seconds before making the second REST API call.
        // otherwise, you won't get the result
        setTimeout(function () {

            // "Operation-Location" in the response contains the URL to retrieve the recognized text.
            var operationLocation = jqXHR.getResponseHeader("Operation-Location");

            // Make the second REST API call and get the response.
            $.ajax({
                url: operationLocation,

                // Request headers.
                beforeSend: function(jqXHR){
                    jqXHR.setRequestHeader("Content-Type","application/json");
                    jqXHR.setRequestHeader(
                        "Ocp-Apim-Subscription-Key", subscriptionKey);
                },

                type: "GET",
            })
            
            // handles the callbacks of the request
            .done(function(data) {
                // data is a JS object passed in to this function
                // Show formatted JSON on webpage.
                const listOfObj = data.recognitionResult.lines;  // each object corresponding to a line in the image
                const numberOfLines = listOfObj.length;
                var myString = "";
                const seperator = "\n";
                for (var i = 0; i < numberOfLines; i++) {
                    myString += (listOfObj[i].text += seperator)
                }
                // $("#responseTextArea").val(JSON.stringify(data, null, 2)); // uncomment this line to show the return of JSON
                $("#responseTextArea").val(myString);
            })

            // handles the callbacks of the request
            .fail(function(jqXHR, textStatus, errorThrown) {
                // Display error message.
                var errorString = (errorThrown === "") ? "Error. " :
                    errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ? "" :
                    (jQuery.parseJSON(jqXHR.responseText).message) ?
                        jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
                alert(errorString);
            });
        }, 10000); // this is waiting 10 sec
    })
    
    // handles the callbacks of the request
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " :
            errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" :
            (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
};