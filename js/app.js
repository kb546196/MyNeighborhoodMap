  //Array of song/ location objects  
  
  var tracklist  = [{
  title: "Fool on the Hill by The Beatles",
  year: 1967, 
  vidID: "DGEX_7IqaC4",
  address: "Primrose Hill",
  location: {
            lat: 51.538449, 
            lng: -0.154993
        }
    }, {
    title: "Itchycoo Park by Small Faces",
  year: 1967, 
  vidID: "SdItVDTScAU",
  address: "Ilford",
  location: {
            lat: 51.549493, 
            lng: 0.066476
        }
    }, {
  title: "Waterloo Sunset by The Kinks",
  year: 1967,
  vidID: "N_MqfF0WBsU",
  address: "Waterloo Bridge", 
  location: {
            lat: 51.501737, 
            lng: -0.108588
        }
    }, {
      title: "The Battle of Epping Forest by Genesis",
    year: 1973, 
    vidID: "knH8GriD-t8",
    address: "Epping Forest",
    location: {
            lat: 51.657077,
            lng: 0.041282
        }
    },{
    title: "Werewolves of London by Warren Zevon",
    year: 1977, 
    vidID: "iDpYBT0XyvA",
    address: "Gerrard Street, London",
    location: {
            lat: 51.511757,
            lng: -0.131086
        }
    }, {
    title: "Hong Kong Garden by Siouxsie and the Banshees",
  year: 1978, 
  vidID: "Y6lxuYme-8c",
  address: "Chislehurst",
  location: {
            lat: 51.412626,
            lng: 0.077487
        }
    },{
    title: "I Don't Want To Go To Chelsea by Elvis Costello",
  year: 1978, 
  vidID: "ITx5vzQi0go",
  address: "Chelsea, London",
  location: {
            lat: 51.485093,
            lng: -0.174936
        }
    },{
    title: "Baker Street by Gerry Rafferty",
  year: 1978, 
  vidID: "eJIXc3-exUk",
  address: "Baker Street",
  location: {
            lat: 51.520610,
            lng: -0.15685
        }
    },{
    title: "Up the Junction by Squeeze",
  year: 1979,
  vidID: "xj-wFpWpBs4",
  address: "Clapham",
  location: {
            lat: 51.465174,
            lng: -0.170811
        }
    },{
    title: "The Guns of Brixton by The Clash",
  year: 1979, 
  vidID: "qgfdUzflEnw",
  address: "Brixton",
  location: {
            lat: 51.453349,
            lng: -0.120576
        }
    }, {
    title: "Electric Avenue by Eddy Grant",
  year: 1982, 
  vidID: "vtPk5IUbdH0",
  address: "Brixton Market",
  location: {
            lat: 51.462168,
            lng: -0.114004
        }
    }, {
    title: "West End Girls by Pet Shop Boys",
  year: 1984, 
  vidID: "-ycCcWDmpOQ",
  address: "Soho",
  location: {
            lat: 51.513614,
            lng: -0.136549
        }
    }, {
    title: "Common People by Pulp",
  year: 1995, 
  vidID: "cbQ7UFyqRpY",
  address: "St Martins College",
  location: {
            lat: 51.522691,
            lng: -0.108875
        }
    }, {
    title: "Fake Plastic Trees by Radiohead",
  year: 1995, 
  vidID: "n5h0qHwNrHk",
  address: "Canary Wharf",
  location: {
            lat: 51.505431,
            lng: -0.023533
        }
    },  {
    title: "Up The Bracket by The Libertines",
  year: 2002, 
  vidID: "m8lTyYlQ-Wg",
  address: "Bethnal Green",
  location: {
            lat: 51.526974,
            lng: -0.06672
        }
    }, {
    title: "22 Grand Job by The Rakes",
  year: 2005, 
  vidID: "dDh_ERdynqQ",
  address: "City of London",
  location: {
            lat: 51.515118,
            lng: -0.081325
        }
    }, {
    title: "Upper Clapton Dance by Professor Green",
  year: 2009, 
  vidID: "IIuQM_q0IUU",
  address: "Upper Clapton",
  location: {
            lat: 51.567230,
            lng: -0.06119
        }
    },{
    title: "River Lea by Adele",
  year: 2015, 
  vidID: "i5k5f3eG-BA",
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
    var location = tracklist[i].address; 
    var year = tracklist[i].year; 
    var vidID = tracklist[i].vidID; 
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        location: location,
        id: vidID,
        title: title
        //description: description
    });
  
    //marker on map for each song
    self.songLocation()[i].marker = marker;
  
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('existing-iframe-example', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
  }
  function onPlayerReady(event) {
    document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
  }
  
  function onPlayerStateChange(event) {
    changeBorderColor(event.data);
  }
    
    //browser listens for marker click to make info window
    marker.addListener('click', function() {
      self.populateInfoWindow(this, largeInfowindow);
        })

          //or if the title in list 
    self.showMarker = function(clickedItem) {
      self.populateInfoWindow(clickedItem.marker, largeInfowindow)
    }
      
    //links info window and describes info to put in their
    self.populateInfoWindow = function(marker, infowindow) {
      if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div><h4>' + marker.title + '</h4><div>Find out more about <a href="https://en.wikipedia.org/wiki/' + marker.location + '">' + marker.location + '</a>, the place that inspired the song on Wikipedia.</div> <iframe id="existing-iframe-example" width="256" height="144" src="https://www.youtube.com/embed/' + marker.id + '?enablejsapi=1" frameborder="0"style="border: solid 4px #37474F" ></iframe>');
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
