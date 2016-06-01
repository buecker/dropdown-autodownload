    var lines;
    var randomNumber;
    var lastRandomNumber;

    $(document.body).ready(function () {
        var j = 0;
        // load the music list from the server
        $.ajax({
            url: 'MusicDownloadList.txt' // this is where you specify the path to the file residing on the server
        }).done(function (content) {
            var mp3Index = 0;
            var wavIndex = 0;
            // split into individual songs
            songList = content.replace(/\r\n|\r/g, '\n').trim().split('\n');

            // only set up the click handler if there were lines found
            if (songList && songList.length) {
                //parse the file and then create <li> elems and set their anchor tags to our songs
                for (var i = 0; i < songList.length; i++) {
                    if (songList[i] == ".MP3" || songList[i] == ".WAV" || songList[i] == "") {
                        if (songList[i] == ".MP3" || songList[i] == ".WAV" ) {
                            i++;
                        }
                    }
                    if (songList[i] != "") {
                        wavIndex = jQuery.inArray(".WAV", songList);
                        mp3Index = jQuery.inArray(".MP3", songList);
                        var list = document.getElementById("innerMP3");
                        var wavList = document.getElementById("innerWAV");


                        if (i < wavIndex) {
                            createInnerElements(list, i - 1);
                            var anchor = list.getElementsByTagName('a')[i - 1];
                            anchor.innerText = songList[i];
                            DownloadFile(anchor, "Songs/" + anchor.innerText + ".mp3");
                        }
                        else if (i > wavIndex) {

                            createInnerElements(wavList, i-1 );
                            var anchor2 = wavList.getElementsByTagName('a')[j];
                            anchor2.innerText = songList[i];
                            DownloadFile(anchor2, "Songs/wav/" + anchor2.innerText + ".wav")
                            j++;
                        }
                        else {
                           
                        }
                    } 
                }


            }
        });


    });



   function DownloadFile(target,songName){
       
          $(target).click(function(e) {
    e.preventDefault();  //stop the browser from following
    window.location.href = songName;
});


   }


    function createInnerElements(element,counter)
    {//list element
      var li = document.createElement('li');
          li.setAttribute('class','ui-menu-item');
          li.setAttribute('id','ui-id-'+ counter);
          li.setAttribute('role','menuitem');

      var a = document.createElement('a');
      a.setAttribute('href','#');

      element.appendChild(li).appendChild(a);
     //anchor element      

    }