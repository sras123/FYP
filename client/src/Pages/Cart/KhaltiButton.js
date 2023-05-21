import KhaltiCheckout from "khalti-checkout-web";
import axios from 'axios';
import myKey from "./KhatliKey";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function KhaltiButton(total){
let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
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
                toast.success("Payment successful"); 
                alert("Your room is 1234")
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
    checkout.show({amount: total});
}
}