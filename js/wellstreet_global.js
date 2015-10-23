/* global variables and general functions */
/* clarify DOM targets through ID or class name to aovid using ID or Class name in other functions as much as we can */
var $map = $("#map");

var maplayer;/*layer stores all markers*/
var markersInView_array=[]; /*stores all current visible markers on the map*/
var therapy_array = [];/*array stores all therapies under selected categery*/
var currentTherapy;
var category_array = [{'Name': 'acupuncturist'},{'Name': 'allergy'},{'Name': 'aromatherapist'},{'Name': 'ciropodist'},{'Name': 'chiropractor'}]; //array stors all categories in order
var CurrentLocation = [];/*array stores geographical info: latitude and longitude*/
var CurrentLocation_array = [];
//var CurrentLocationLayer;/*layer stores current location marker*/

//custom map setting
//customer DivIcon for the map pin
WSDivIcon = L.DivIcon.extend({
    options:{
        className: 'my-divIcon',
        iconSize: [60,30],
        html: '',
    },
    createIcon: function() {
    var div = L.DivIcon.prototype.createIcon.call(this),
        options = this.options;
        if (options.html) {
            div.innerHTML = options.html;
        }
        return div;
    }
});
//custom marker on the map
WSMarker = L.Marker.extend({
	options :{
		index: 0,
		name: 'name',
		address: 'full address'
	}
});

//api_key
var api_key = "";
var categery_url = "https://wellstreet.co/api/list/categories";
//Returns a json array of categories. Each category has two elements:
// id: The system id for the category
// name: The user-friendly string name of the category
var searcharound_url = "https://wellstreet.co/api/search/map"; 
//Finds the services within a given distance from a latitude,longitude point.
// parameters:
// key    -    The API token for the user (required)
// lat    -    The latitude of the user's coordinates (required)
// lng    -    The longitude of the user's coordinates (required)
// distance -    The distance in kilometers to search within (default is 2)
// category - The category id of the service category to search for.


function resetMapPage(){
	/*clear mapslide and re-initial*/
	removeAllMarkers();
	console.time("resetMapPage");
	// if($(".map-wrap").hasClass("toggle") || $(".list-wrap").hasClass("toggle")){
	// 	toggleContent();
	// }

	//empty the list
	$("#therapy_list").empty();
	// console.log("therapy_list is emptyed");
	//$detailslider.children(".slick-list").children(".slick-track").empty();
	
	if($cateslider.is(":hidden")){
		$cateslider.slideToggle(200);
	}
    
	
	console.timeEnd("resetMapPage");
}

function removeAllMarkers(){
	$map.removeLayer(maplayer);
	therapy_array = [];
	markersInView_array = [];
}


