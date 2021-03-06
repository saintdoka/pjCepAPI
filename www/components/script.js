// This is a JavaScript file

window.onload = function (){
  const buscar = document.querySelector("#buscar");
  const buscarQR = document.querySelector("#buscarQR");
  const cep = document.querySelector("#cep");
  const opcoes = {
    method:'GET',
    mode:'cors',
    cache: 'default'
  }

  buscar.addEventListener('click',function(){
    fetch(`https://viacep.com.br/ws/${ cep.value }/json/`,opcoes)
      .then(response =>{
        response.json()
        .then(data =>{
          document.querySelector("#estado").value = data['uf'];
          document.querySelector("#cidade").value = data['localidade'];
          document.querySelector("#bairro").value = data['bairro'];
          document.querySelector("#rua").value = data['logradouro'];
        })
      })
  });

  buscarQR.addEventListener('click',function(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
           fetch(`https://viacep.com.br/ws/${ result.text }/json/`,opcoes)
      .then(response =>{
        response.json()
        .then(data =>{
          document.querySelector("#estado").value = data['uf'];
          document.querySelector("#cidade").value = data['localidade'];
          document.querySelector("#bairro").value = data['bairro'];
          document.querySelector("#rua").value = data['logradouro'];
        })
      })
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : false, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt : "Area de Scan", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: true // iOS and Android
      }
   );
  });
}