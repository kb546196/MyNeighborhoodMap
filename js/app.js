
//Model

//Styles for GoogleMaps API
var styles = [
  {
  //stations, hospitals, points of interest labels 
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ] 
  }, 
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
       "color": "#252839"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0d1544"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c415e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "stylers": [
      {
        "color": "#3c415e"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#3c415e"
      }
    ]
  },
  {
      //shapes of poi (mainly buildings)  
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4d4d4f"
            }
        ]
    },
 {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4d4d4f" 
      }
    ]
  },
  {
        //color of names of places
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },{ 
    //outline of names
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "weight": 2
            }
        ]
    }, 
    {
      //stree names
    "featureType": "road", 
    "elementType": "labels",
    "stylers": [ 
      { 
        "visibility": "off" 
      } 
    ] 
  },
] 
//Icons for the map 
var defaultIcon = 'images/black_record.png'; 
var highlightedIcon = 'images/yellow_record.png'; 

//Array of song/ location objects  
  var tracklist  = [{
  title: "Fool on the Hill by The Beatles",
  vidID: "DGEX_7IqaC4",
  address: "Primrose Hill",
  location: {
            lat: 51.538449, 
            lng: -0.154993
        }
    }, {
    title: "Itchycoo Park by Small Faces",
  vidID: "SdItVDTScAU",
  address: "Ilford",
  location: {
            lat: 51.549493, 
            lng: 0.066476
        }
    }, {
  title: "Waterloo Sunset by The Kinks",
  vidID: "N_MqfF0WBsU",
  address: "Waterloo Bridge", 
  location: {
            lat: 51.501737, 
            lng: -0.108588
        }
    }, {
      title: "The Battle of Epping Forest by Genesis",
    vidID: "knH8GriD-t8",
    address: "Epping Forest",
    location: {
            lat: 51.657077,
            lng: 0.041282
        }
    },{
    title: "Werewolves of London by Warren Zevon",
    vidID: "iDpYBT0XyvA",
    address: "Gerrard Street, London",
    location: {
            lat: 51.511757,
            lng: -0.131086
        }
    }, {
    title: "Hong Kong Garden by Siouxsie and the Banshees",
  vidID: "Y6lxuYme-8c",
  address: "Chislehurst",
  location: {
            lat: 51.412626,
            lng: 0.077487
        }
    },{
    title: "I Don't Want To Go To Chelsea by Elvis Costello",
  vidID: "ITx5vzQi0go",
  address: "Chelsea, London",
  location: {
            lat: 51.485093,
            lng: -0.174936
        }
    },{
    title: "Baker Street by Gerry Rafferty",
  vidID: "eJIXc3-exUk",
  address: "Baker Street",
  location: {
            lat: 51.520610,
            lng: -0.15685
        }
    },{
    title: "Up the Junction by Squeeze",
  vidID: "xj-wFpWpBs4",
  address: "Clapham",
  location: {
            lat: 51.465174,
            lng: -0.170811
        }
    },{
    title: "The Guns of Brixton by The Clash",
  vidID: "qgfdUzflEnw",
  address: "Brixton",
  location: {
            lat: 51.453349,
            lng: -0.120576
        }
    }, {
    title: "Electric Avenue by Eddy Grant",
  vidID: "vtPk5IUbdH0",
  address: "Brixton Market",
  location: {
            lat: 51.462168,
            lng: -0.114004
        }
    }, {
    title: "West End Girls by Pet Shop Boys",
  vidID: "-ycCcWDmpOQ",
  address: "Soho",
  location: {
            lat: 51.513614,
            lng: -0.136549
        }
    }, {
    title: "Common People by Pulp",
  vidID: "cbQ7UFyqRpY",
  address: "St Martins College",
  location: {
            lat: 51.522691,
            lng: -0.108875
        }
    }, {
    title: "Fake Plastic Trees by Radiohead",
  vidID: "n5h0qHwNrHk",
  address: "Canary Wharf",
  location: {
            lat: 51.505431,
            lng: -0.023533
        }
    },  {
    title: "Up The Bracket by The Libertines",
  vidID: "m8lTyYlQ-Wg",
  address: "Bethnal Green",
  location: {
            lat: 51.526974,
            lng: -0.06672
        }
    }, {
    title: "22 Grand Job by The Rakes",
  vidID: "dDh_ERdynqQ",
  address: "City of London",
  location: {
            lat: 51.515118,
            lng: -0.081325
        }
    }, {
    title: "Upper Clapton Dance by Professor Green",
  vidID: "IIuQM_q0IUU",
  address: "Upper Clapton",
  location: {
            lat: 51.567230,
            lng: -0.06119
        }
    },{
    title: "River Lea by Adele",
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
        center: {lat: 51.517414, lng:  -0.120018},
        zoom: 11,
        styles: styles,
        mapTypeControl: false
      });
      //creating  var for the info window 
      var largeInfowindow = new google.maps.InfoWindow({});

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
      //Uses the iframe element which will be populated by YouTube API
      var vidID = '<iframe id="existing-iframe-example" width="256" height="144" src="https://www.youtube.com/embed/' + tracklist[i].vidID + '?enablejsapi=1" ?enablejsapi=1" frameborder="0"style="border: solid 4px #0d1544" ></iframe>'
      //Use variables fomr above to create property for each song marker
      var marker = new google.maps.Marker({
          map: map,
          position: position,
          location: location,
          vid: vidID,
          title: title,  
          icon: defaultIcon,
          animation: google.maps.Animation.DROP
      });
  
    //marker on map for each song
    self.songLocation()[i].marker = marker;
  
    //YouTube API 
     //code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //This  creates an <iframe> (and YouTube player) after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('existing-iframe-example', {
          events: {
            'onReady': onPlayerReady,

            'onError:': onErrorMessage
          }
      });
    }

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
    }

    //This function loads an error message instead of the iframe and video into the info window
    function onErrorMessage(event) { 
      marker.vid = "<div>Sorry video cannot be loaded at this time please try again later</div>"; 
    }
     
    //INFO WINDOW 

    //browser listens for marker click to make info window and opens 
    marker.addListener('click', function() {
      self.populateInfoWindow(this, largeInfowindow);
        })

    //browser listens for marker mouseover and changes color of icon
    marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
    marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
          //or if the title in list 
    self.showMarker = function(clickedItem) {
      self.populateInfoWindow(clickedItem.marker, largeInfowindow)
    }
      
    //links info window and describes info to put in their
    self.populateInfoWindow = function(marker, infowindow) {
      if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent(
            '<div><h4>' + marker.title + '</h4><div>A song inspired by ' + marker.location + 
            '</div>'  + marker.vid + '<div>Video from YouTube.</div><div>Find out more about <a href="https://en.wikipedia.org/wiki/' 
            + marker.location + '">' + marker.location + '</a>, on Wikipedia.</div>');
          infowindow.open(map, marker);
          //listern to close marker
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      };

}

//Filter for the list 
    self.filter = ko.observable('');

    self.filterList = ko.computed(function() {
      return ko.utils.arrayFilter(self.songLocation(), function(filteredPlaces) {
        var matched = filteredPlaces.title.toLowerCase().indexOf(self.filter().toLowerCase()) >= 0;
        filteredPlaces.marker.setVisible(matched);
      return matched;
    })
  })
   }
 
}; 
