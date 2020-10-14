const canvas = document.querySelector('canvas');
const submitButton = document.getElementById('submitButton');
const inputForm = document.getElementById('inputForm');
const signaturePad = new SignaturePad(canvas);

const onSubmitSendSignature = (event) => {
    //prevent default form submission.
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    //get signature drawing.
    let signature = signaturePad.toDataURL();
    xhttp.onreadystatechange = function() {
        //If signature is successfuly sent submit the form
        //This will not fire due to never succeding
        if (this.readyState == 4 && this.status == 200) {
            inputForm.submit();
        }else {
            console.log('Server Unavalible')
        }
    };
    xhttp.open("POST", "https://www.quixi.com/signature_data", true);
    xhttp.send(signature);
}
/**Changes the color of the signature pad */
const changeSignatureColor = (color) =>{
    signaturePad.penColor = color
}
/**Check on end of drawing if signature pad is not empty if true remove disabled from submit */
signaturePad.onEnd = function (){
    if(!signaturePad.isEmpty()){
        submitButton.disabled = false;
    }
}
/**Clear the canvas and disabled the submit button */
const clearCanvas = () => {
    submitButton.disabled = true;
    signaturePad.clear()
}