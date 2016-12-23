//Model
//Styles for GoogleMaps API
var styles = [{
    //stations, hospitals, points of interest labels 
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#252839"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#0d1544"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3c415e"
    }]
}, {
    "featureType": "transit.line",
    "stylers": [{
        "color": "#3c415e"
    }]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#3c415e"
    }]
}, {
    //shapes of poi (mainly buildings)  
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#4d4d4f"
    }]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "color": "#4d4d4f"
    }]
}, {
    //color of names of places
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    //outline of names
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#000000"
    }, {
        "weight": 2
    }]
}, {
    //stree names
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, ];
//Icons for the map 
var defaultIcon = 'images/black_record.png';
var highlightedIcon = 'images/yellow_record.png';
//Array of song/ location objects, ordered in alphabetical order (of title)  
var tracklist = [{
    title: "Baker Street by Gerry Rafferty",
    trackId: 17488873,
    address: "Baker Street",
    location: {
        lat: 51.520610,
        lng: -0.15685
    }
}, {
    title: "Common People by Pulp",
    trackId: 31069277,
    address: "St Martins College",
    location: {
        lat: 51.522691,
        lng: -0.108875
    }
}, {
    title: "Electric Avenue by Eddy Grant",
    trackId: 14581872,
    address: "Brixton Market",
    location: {
        lat: 51.462168,
        lng: -0.114004
    }
}, {
    title: "Fake Plastic Trees by Radiohead",
    trackId: 30715806,
    address: "Canary Wharf",
    location: {
        lat: 51.505431,
        lng: -0.023533
    }
}, {
    title: "Fool on the Hill by The Beatles",
    trackId: 15109547,
    address: "Primrose Hill",
    location: {
        lat: 51.538449,
        lng: -0.154993
    }
}, {
    title: "I Don't Want To Go To Chelsea by Elvis Costello",
    trackId: 94003508,
    address: "Chelsea, London",
    location: {
        lat: 51.485093,
        lng: -0.174936
    }
}, {
    title: "Itchycoo Park by Small Faces",
    trackId: 13902641,
    address: "Ilford",
    location: {
        lat: 51.549493,
        lng: 0.066476
    }
}, {
    title: "River Lea by Adele",
    trackId: 84213315,
    address: "River Lea",
    location: {
        lat: 51.595541,
        lng: -0.052013
    }
}, {
    title: "The Battle of Epping Forest by Genesis",
    trackId: 63010693,
    address: "Epping Forest",
    location: {
        lat: 51.657077,
        lng: 0.041282
    }
}, {
    title: "The Guns of Brixton by The Clash",
    trackId: 31180665,
    address: "Brixton",
    location: {
        lat: 51.453349,
        lng: -0.120576
    }
}, {
    title: "Up The Bracket by The Libertines",
    trackId: 1198194,
    address: "Bethnal Green",
    location: {
        lat: 51.526974,
        lng: -0.06672
    }

}, {
    title: "Up the Junction by Squeeze",
    trackId: 96456433,
    address: "Clapham",
    location: {
        lat: 51.465174,
        lng: -0.170811
    }
}, {
    title: "Upper Clapton Dance by Professor Green",
    trackId: 5765357,
    address: "Upper Clapton",
    location: {
        lat: 51.567230,
        lng: -0.06119
    }
}, {
    title: "Waterloo Sunset by The Kinks",
    trackId: 30056157,
    address: "Waterloo Bridge",
    location: {
        lat: 51.501737,
        lng: -0.108588
    }
}, {
    title: "Werewolves of London by Warren Zevon",
    trackId: 82192204,
    address: "Gerrard Street, London",
    location: {
        lat: 51.511757,
        lng: -0.131086
    }
}, {
    title: "West End Girls by Pet Shop Boys",
    trackId: 30936055,
    address: "Soho",
    location: {
        lat: 51.513614,
        lng: -0.136549
    }
}];



//Function to show the GoogleMap on the site 
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 51.507414,
            lng: -0.100018
        },
        zoom: 12,
        styles: styles,
        mapTypeControl: false
    });
    //creating  var for the info window 
    var largeInfowindow = new google.maps.InfoWindow({});
    //Knockout bindings 
    ko.applyBindings(new ViewModel());
    //view model
    function ViewModel() {
        var self = this;
        //Marking the tracklist a knockout observable array  
        self.songLocation = ko.observableArray(tracklist);
        //KO observable array for song lyrics to go into 
        var SongLyricsArray = ko.observableArray();

        //function for ajax request for song lyrics 
        function getLyrics(musixmatchID, SongTitle) {

            $.ajax({
                type: "GET",
                data: {
                    apikey: "48627960cf605d23e3781ebdf0d59c89",
                    track_id: musixmatchID,
                    format: "jsonp",
                },
                url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
                dataType: "jsonp",
                contentType: 'application/json',
                success: function(data) {
                    //Takings lyrics from the data send back
                    var LyricsBody = data.message.body.lyrics.lyrics_body;
                    //checking it has arrived 
                    //console.log(LyricsBody);
                    //Pushing into SongLyricsArray w/ Song title and credit and top. 
                    SongLyricsArray.push(SongTitle + " lyrics from Musixmatch: " + LyricsBody);
                    //Ordering the array into alphabetical order so it matches the order of song locations (rather than order info sent back)
                    SongLyricsArray.sort();


                },
                //error message to load if problems with loading one / all of lyrics (info also added to array)
                error: function() {
                    SongLyricsArray.push(SongTitle + " lyrics are not currently loading from Musixmatch - please try again later");

                    SongLyricsArray.sort();
                }
            });

        }

        //for loop to go through each tracklist object creating marker position full title and position
        for (var i = 0; i < tracklist.length; i++) {
            var position = tracklist[i].location;
            var title = tracklist[i].title;
            var address = tracklist[i].address;
            var songNo = i;

            var trackId = tracklist[i].trackId;

            //Ajax request lyrics using track_id from Musixmatch 
            getLyrics(trackId, title);

            //Use variables fomr above to create property for each song marker
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                address: address,
                title: title,
                songNo: songNo,
                icon: defaultIcon,
                animation: google.maps.Animation.DROP
            });
            //marker on map for each song
            self.songLocation()[i].marker = marker;



            //INFO WINDOW 
            //browser listens for marker click to make info window and opens 
            marker.addListener('click', function() {
                self.populateInfoWindow(this, largeInfowindow);
            }); //or if the title in list 
            self.showMarker = function(clickedItem) {
                self.populateInfoWindow(clickedItem.marker, largeInfowindow);
            };
            //browser listens for marker mouseover and changes color of icon

            marker.addListener('mouseover', function() {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseout', function() {
                this.setIcon(defaultIcon);
            });



            //links info window and describes info to put in their
            self.populateInfoWindow = function(marker, infowindow) {
                if (infowindow.marker != marker) {
                    infowindow.marker = marker;
                    //Content for each window 
                    infowindow.setContent(
                        '<div><h4>' + marker.title + '</h4>' +
                        '<p> A song inspired by ' + marker.address + ', find out more about <a href="https://en.wikipedia.org/wiki/' +
                        marker.address + '">' + marker.address + '</a>, on Wikipedia.</p>' +
                        '<p>' + SongLyricsArray()[marker.songNo] + '</p>');
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
            });
        });

    }
}