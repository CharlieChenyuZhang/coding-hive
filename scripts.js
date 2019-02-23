// define a function here
// API documentation : https://goo.gl/pHifCY

function processImage() {

    // specify the subscriptionKey and uriBase
    // TODO: Replace <Subscription Key> with your valid subscription key.
    

    // TODO: Replace the regin to your region of subscription key
    

    // Request parameter. aka Define the query


    // Get the URL from the text box and assign it to the value of the sourceImage


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
        

        // specify the request headers
        // The jqXHR (jQuery XMLHttpRequest) replaces the browser native XMLHttpRequest object.
        

        // specify the request type
        

        // Request body, url of the image that we sent to the API for processing
        
        }
    )
    
    // handles the callbacks of the request
    .done(function(data, textStatus, jqXHR) {
        // Show progress. Display the temporary values
        

        // Note: The response may not be immediately available. Handwriting
        // recognition is an asynchronous operation that can take a variable
        // amount of time depending on the length of the text you want to
        // recognize. You may need to wait or retry the GET operation.
        
        // Wait ten seconds before making the second REST API call.
        // otherwise, you won't get the result
        setTimeout(function () {

            // "Operation-Location" in the response contains the URL to retrieve the recognized text.
            

            // Make the second REST API call and get the response.
            $.ajax({
                // specify url
                

                // Request headers.


                // type
                
            })
            
            // handles the callbacks of the request
            .done(function(data) {
                // data is a JS object passed in to this function
                // Show formatted JSON on webpage.
                
                
                
            })

            // handles the callbacks of the request
            .fail(function(jqXHR, textStatus, errorThrown) {
                // Display error message.
                


            });
        }, 10000); // this is waiting 10 sec
    })
    
    // handles the callbacks of the request
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        



        
    });
};