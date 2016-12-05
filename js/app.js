  //Array of song/ location objects  
  
  var tracklist  = [{
  title: "Fool on the Hill",
  artist: "The Beatles",
  year: 1967, 
  address: "Primrose Hill",
  location: {
            lat: 51.538449, 
            lng: -0.154993
        }
    }, {
    title: "Itchycoo Park",
  artist: "Small Faces",
  year: 1967, 
  address: "Little Ilford Park",
  location: {
            lat: 51.549493, 
            lng: 0.066476
        }
    }, {
  title: "Waterloo Sunset",
  artist: "The Kinks",
  year: 1967,
  address: "Waterloo Bridge", 
  location: {
            lat: 51.501737, 
            lng: -0.108588
        }
    }, {
      title: "The Battle of Epping Forest",
    artist: "Genesis",
    year: 1973, 
    address: "Epping Forest",
    location: {
            lat: 51.657077,
            lng: 0.041282
        }
    },{
    title: "Werewolves of London",
  artist: "Warren Zevon",
  year: 1977, 
  address: "Gerrard Street, London",
  location: {
            lat: 51.511757,
            lng: -0.131086
        }
    }, {
    title: "Hong Kong Garden",
  artist: "Siouxsie and the Banshees",
  year: 1978, 
  address: "Chislehurst",
  location: {
            lat: 51.412626,
            lng: 0.077487
        }
    },{
    title: "I Don't Want To Go To Chelsea",
  artist: "Elvis Costello",
  year: 1978, 
  address: "Chelsea, London",
  location: {
            lat: 51.485093,
            lng: -0.174936
        }
    },{
    title: "Baker Street",
  artist: "Gerry Rafferty",
  year: 1978, 
  address: "Baker Street",
  location: {
            lat: 51.520610,
            lng: -0.15685
        }
    },{
    title: "Up the Junction",
  artist: "Squeeze",
  year: 1979, 
  address: "Clapham",
  location: {
            lat: 51.465174,
            lng: -0.170811
        }
    },{
    title: "The Guns of Brixton",
  artist: "The Clash",
  year: 1979, 
  address: "Brixton",
  location: {
            lat: 51.453349,
            lng: -0.120576
        }
    }, {
    title: "Electric Avenue",
  artist: "Eddy Grant",
  year: 1982, 
  address: "Brixton Market",
  location: {
            lat: 51.462168,
            lng: -0.114004
        }
    }, {
    title: "West End Girls",
  artist: "Pet Shop Boys",
  year: 1984, 
  address: "Soho",
  location: {
            lat: 51.513614,
            lng: -0.136549
        }
    }, {
    title: "Common People",
  artist: "Pulp",
  year: 1995, 
  address: "St Martins College",
  location: {
            lat: 51.522691,
            lng: -0.108875
        }
    }, {
    title: "Fake Plastic Trees",
  artist: "Radiohead",
  year: 1995, 
  address: "Canary Wharf",
  location: {
            lat: 51.505431,
            lng: -0.023533
        }
    }, {
    title: "Dagenham Dave",
  artist: "Morrissey",
  year: 1995, 
  address: "Dagenham",
  location: {
            lat: 51.538890,
            lng: 0.14743
        }
    }, {
    title: "Up The Bracket",
  artist: "The Libertines",
  year: 2002, 
  address: "Bethnal Green",
  location: {
            lat: 51.526974,
            lng: -0.06672
        }
    }, {
    title: "22 Grand Job",
  artist: "The Rakes",
  year: 2005, 
  address: "City of London",
  location: {
            lat: 51.515118,
            lng: -0.081325
        }
    }, {
    title: "Upper Clapton Dance",
  artist: "Professor Green",
  year: 2009, 
  address: "Upper Clapton",
  location: {
            lat: 51.567230,
            lng: -0.06119
        }
    },{
    title: "River Lea",
  artist: "Adele",
  year: 2015, 
  address: "River Lea",
  location: {
            lat: 51.595541,
            lng: -0.052013
        }
    }
];
//Function to show the GoogleMap on the site (centred nr Barbican central London)
function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.533888, lng: -0.097642},
        zoom: 11,
        mapTypeControl: false
      });
      //creating  var for the info window 
      var largeInfowindow = new google.maps.InfoWindow();

      //Knockout bindings 
      ko.applyBindings(new ViewModel());


//view model
function ViewModel () {
  
  var self = this;

  //Marking the tracklist a knockout observable array  
  self.songLocation = ko.observableArray(tracklist);
      
      //for loop to go through each tracklist object creating marker position full title and position
  for (var i = 0; i < tracklist.length; i++) {
    var position = tracklist[i].location;
    var title = tracklist[i].title;
    var artist = tracklist[i].artist; 
    var location = tracklist[i].address; 
    var year = tracklist[i].year; 
    var fullTitle = title + " by " + artist; 
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        location: location,
        title: fullTitle
        //description: description
    });

    //marker on map for each song
    self.songLocation()[i].marker = marker;
  
    //browser listens for marker click to make info window
    marker.addListener('click', function() {
      self.populateInfoWindow(this, largeInfowindow);
        })
    

    /*//Wiki Ajax request for each song
    $.ajax ({
        url: wikiURL, 
        dataType: "jsonp", 
        success: function(response) {
         var articleList = response[1]; 
             for (var i = 0; i < articleList.length; i++) {
                articleString = articleList[i] 
                var url = 'http://en.wikipedia.org/wiki/' + articleString; 
                console.log(articleString); 
                //$wikiElem.prepend('<li><a href="' + url + '">' + articleString + '</a></li>'); 
            }; 
        }

    }) */
          //or if the title in list 
    self.showMarker = function(clickedItem) {
      self.populateInfoWindow(clickedItem.marker, largeInfowindow)
    }
      
    //links info window and describes info to put in their
    self.populateInfoWindow = function(marker, infowindow) {
      if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div><h4>' + marker.title + '</h4><div>Find out more about <a href="https://en.wikipedia.org/wiki/' + marker.location + '">' + marker.location + '</a>, the place that inspired the song on Wikipedia.</div><div>Hear the song on spotify: </div></div>');
          infowindow.open(map, marker);
          //listern to close marker
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      };

   }   

  }
};    

    





