var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './scss/ui.scss';
var $ = require('jQuery');
$('#setApiKey').on('submit', e => {
    e.preventDefault();
    parent.postMessage({
        pluginMessage: $('#apiKey').val()
    }, '*');
});
window.onmessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.data.pluginMessage.type == 'key') {
        $('#apiKey').val(event.data.pluginMessage.apikey || '');
    }
    if (event.data.pluginMessage.type == 'run') {
        let data = new FormData(), base64 = btoa(new Uint8Array(event.data.pluginMessage.bytes).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, ''));
        base64 = "data:image/jpg;base64," + base64;
        data.append('source_image_base64', base64);
        data.append('output_image_format', 'base64');
        data.append('client', 'slazzer-figma');
        fetch('https://api.slazzer.com/v2.0/remove_image_background', {
            method: 'POST',
            headers: {
                'API-KEY': event.data.pluginMessage.apikey
            },
            body: data
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response;
        }).then(async response => {
            response.blob().then(blobB=>{
                var base64data;
                var reader = new FileReader();
                reader.readAsDataURL(blobB); 
                reader.onloadend = function() {
                 base64data= reader.result;                
                    parent.postMessage({
                     pluginMessage: Uint8Array.from(atob((base64data).replace("data:image/png;base64,","")), c => c.charCodeAt(0))
     
                     
                 }, '*')
                }
            })
    

        }).catch(response => {
            response.json().then(res => {
               parent.postMessage({pluginMessage: res}, '*')
              
            })
        });
    }
});
