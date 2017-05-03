(function() {
    let arrLinkOpenModal = [].slice.call( document.getElementsByClassName("open-modal") );

    arrLinkOpenModal.forEach(function(item, i, arr){
       item.addEventListener('click', function(event){
           event.preventDefault();

           let attr  = ( this.getAttribute('href') ).slice(1),
               modal = document.getElementById(attr),
               close = modal.querySelector('.modal__close');

           modal.style.display = "block";

           close.addEventListener('click', function(){
               modal.style.display = "none";
           });
           window.addEventListener('click', function(event){
               if (event.target == modal) {
                   modal.style.display = "none";
               }
           });
           window.addEventListener('keydown', function(event){
                if (event.keyCode == 27) {
                    modal.style.display = "none";
                }
           });
       });
    });

})();
