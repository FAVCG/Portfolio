// email from https://postmail.invotes.com
        const form_id_js = "javascript_form";

        const data_js = {
            "access_token": "ascr3zhe35gpx88jvptujf42"
        };

        function js_onSuccess() {
            // remove this to avoid redirect
            // window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";

            const successPopUp = document.getElementById('success-pop-up');
            successPopUp.style["visibility"] = "visible";
            setTimeout(() => {
              successPopUp.style["visibility"] = "hidden";
            }, 3000);
         }

        function js_onError(error) {
            // remove this to avoid redirect

            const successPopUp = document.getElementById('error-pop-up');
            successPopUp.style["visibility"] = "visible";
            setTimeout(() => {
              successPopUp.style["visibility"] = "hidden";
            }, 3000);
        }

        function validation(customerInformation) {
          if (
            customerInformation.name !== '' &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customerInformation.email)
            ) {
            return true;
          }
          return false;
        }

        function sendForm(event) {
            const request = new XMLHttpRequest();

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    js_onSuccess();
                } else if (request.readyState == 4) {
                    js_onError(request.response);
                }
            };

            const subject = "Faviola, You have a new client interested!";

            const customerInformation = {
                name: document.getElementById('inputName').value,
                email: document.getElementById('inputEmail').value,
                message: document.getElementById('inputMessage').value,
            }

            if (!validation(customerInformation)) {
              console.log("invalid info");
              return false;
            } else {
              const message = `This is my information below. \n Name: ${customerInformation.name} \n Email: ${customerInformation.email} \n Message: ${customerInformation.message}`;
              console.log(message);
              data_js['subject'] = subject;
              data_js['text'] = message;
              const params = toParams(data_js);

              request.open("POST", "https://postmail.invotes.com/send", true);
              request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

              request.send(params);
              event.preventDefault();
            }
        }

        function toParams(data_js) {
            const form_data = [];
            for ( const key in data_js ) {
                form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
            }

            return form_data.join("&");
        }






