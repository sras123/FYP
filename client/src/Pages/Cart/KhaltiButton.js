import KhaltiCheckout from "khalti-checkout-web";
import axios from 'axios';



export function KhaltiButton(){
let config = {
    // replace this key with yours
    "publicKey": "test_public_key_9a64b0754e1b42c0aadad197d4ef1d14",
    "productIdentity": "1234567890",
    "productName": "My Psychiatrist",
    "productUrl": "http://localhost:3000/",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            // Send payment details to server for verification and capture
            axios.post('http://localhost:8080/khalti/payment/success', {
                token: payload.token,
                amount: payload.amount
            })
            .then(response => {
                console.log(response.data);
                alert("payment successful");
                // Handle successful payment verification and capture response
            })
            .catch(error => {
                console.log(error);
                // Handle payment verification and capture error
            });
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

let checkout = new KhaltiCheckout(config);
let btn = document.getElementById("payment-button");
btn.onclick = function () {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    checkout.show({amount: 1000});
}
}