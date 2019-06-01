    const clusterBorders = document.querySelectorAll('.clustDiv');
    const body = document.getElementsByTagName('body')[0];
    const showFieldBtn = document.querySelector('#showFiled');
    const changeBackGround = document.querySelector('#changeAppleDiv');
    const initBtn = document.querySelector('#initBtnView');
    const oceanIcon = document.querySelector('#iconRight');
    const surfaceDiv = document.queryCommandEnabled('#surfaceDiv');

         function showFiled() {
            document.getElementById('surfaceDiv').style.backgroundImage = '';
            document.querySelector('#surfaceDiv').style.backgroundColor = '#fff';
            document.querySelector('body').style.background =
                "url('https://dreamphototours.com/wp-content/uploads/2019/01/Netherlands-Photography-Drone-Workshop-tulips-1.jpg');"
            document.querySelector('#headline').style.color = 'yellowgreen';
            document.querySelector('#surfaceDiv').style.opacity = 0.5;
        };
        
        function changeClustersField() {
            document.querySelector('body').style.backgroundImage =
                "url('http://www.airinov.fr/wp-content/uploads/2016/10/eBee-paysage.png')";
            document.querySelector('#surfaceDiv').style.backgroundImage =
                "url('https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/Drone_Patrol.jpg')";
            document.querySelector('#surfaceDiv').style.opacity = 0.5;
            document.querySelector('#headline').style.color = '#addfff';
        };

        function initialView() {
            document.getElementById('surfaceDiv').style.backgroundImage = '';
            document.getElementById('surfaceDiv').style.backgroundColor = '#fff';
            document.getElementById('bodyId').style.backgroundImage =
                "url('https://dreamphototours.com/wp-content/uploads/2019/01/Netherlands-Photography-Drone-Workshop-tulips-1.jpg')";
            document.querySelector('#surfaceDiv').style.opacity = 0.95;
            document.querySelector('#headline').style.color = '#addfff';
         };

         function oceanView() {
             body.style.backgroundImage = 'initial';
            
             body.style.backgroundColor = '#0099ff'
             surfaceDiv.style.opacity = 0.5;
         }

       
        clusterBorders.forEach((el) => {
            el.addEventListener('click', () => {
                el.style.opacity = 1;
                el.style.backgroundColor = 'rgba(255,255,255,0.3)';
            });
        });      
        clusterBorders.forEach((el) => {
            body.addEventListener('click', () => {
                el.style.opacity = 0;
            }, true)
        });
        
        showFieldBtn.addEventListener('click', showFiled); 
        changeBackGround.addEventListener('click', changeClustersField);
        initBtn.addEventListener('click', initialView);
        oceanIcon.addEventListener('click', oceanView);

       