var ratSightingsURI = "https://data.cityofnewyork.us/resource/3q43-55fe.json?$where=created_date%3E'2012-01-01'";

function initialize() {
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(40.7142, -74.0064),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        scrollwheel: true,
        draggable: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: true,
        disableDoubleClickZoom: false
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var loader = $("#loading");

    loader.show();

    $.getJSON(ratSightingsURI).done(function(data) {
        var sightings = [];
        $.each(data, function(index, value) {
            if (value.latitude != undefined && value.longitude != undefined) {
                sightings.push(new google.maps.LatLng(parseFloat(value.latitude),
                                                 parseFloat(value.longitude)));
                }
            });
        
        var pointArray = new google.maps.MVCArray(sightings);
        
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });

        heatmap.setMap(map);

        function toggleHeatmap() {
            heatmap.setMap(heatmap.getMap() ? null : map);
        }

        function changeRadius() {
            heatmap.setOptions({
                radius: heatmap.get('radius') ? null : 100
            });
        }

        function changeOpacity() {
            heatmap.setOptions({
                opacity: heatmap.get('opacity') ? null : 0.9
            });
        }
        
        loader.hide();
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
