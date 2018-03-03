angular.module('myApp', [])

	.filter('NotDepletedCity', function() {
		return function(cities) {
			var filteredCities = [];

			angular.forEach(cities, function(city) {
				if(city.count > 0){
				       filteredCities.push(city);
				}

			});

			return filteredCities;
		}
	})

  .controller('cityController', function() {
    var cities = this;

    cities.drawPile = [
    	{text:'Atlanta', color:"blue", count:1, max:1},
    	{text:'Chicago', color:"blue", count:2, max:2},
    	{text:'Denver', color:"blue", count:1, max:1},
			{text:'Frankfurt', color:"blue", count:2, max:2},
    	{text:'London', color:"blue", count:3, max:3},
    	{text:'New York', color:"blue", count:1, max:1},
			{text:'Paris', color:"blue", count:2, max:2},
			{text:'San Francisco', color:"blue", count:2, max:2},
    	{text:'Washington',  color:"blue", count:3, max:3},
			{text:'Buenos Aires', color:"yellow", count:2, max:2},
			{text:'Lagos', color:"yellow", count:3, max:3},
			{text:'Lima',  color:"yellow", count:1, max:1},
			{text:'Los Angeles', color:"yellow", count:1, max:1},
			{text:'Mexico City', color:"yellow", count:1, max:1},
			{text:'Sao Paulo', color:"yellow", count:3, max:3},
			{text:'Santiago', color:"yellow", count:1, max:1},
			{text:'Cairo', color:"black", count:3, max:3},
			{text:'Istanbul', color:"black", count:3, max:3},
			{text:'Moscow', color:"black", count:1, max:1},
			{text:'Tripoli', color:"black", count:2, max:2}];

			/* Storing original values here for cards in Package 6 or Destroyed Infection Cards.
				{text:'Denver', color:"blue", count:2, max:2},
				{text:'New York', color:"blue", count:3, max:3},
				{text:'Bogota', color:"yellow", count:2, max:2},
				{text:'Jacksonville', color:"yellow", count:3, max:3},
				{text:'Tripoli', color:"black", count:3, max:3}];
			*/

    //  Epidemic progression - 2,2,2,3,3,4,4,5


    cities.discardPile = [];

    cities.adminMode = false;

    cities.remainingDraw = function() {
      var i = 0;
      angular.forEach(cities.drawPile, function(city) {
        i += city.count;
      });
      return i;
    };


    cities.totalDraw = function() {
        var i = 0;
        angular.forEach(cities.drawPile, function(city) {
          i += city.max;
        });
        return i;
      };

      cities.discard = function(city) {
    	  if(cities.redrawStack && cities.redrawStack.length > 0){
    		  alert("Please deplete redraw stack first.");
    	  } else {
    		  if(city.count > 0){
    			  city.count = city.count -1;
    			  cities.discardPile.push(city);
    		  }
    	  }
      };

      cities.epidemicButtonDisabled = true;

      cities.discardFromRedraw = function(city, cityGroup) {
    	  var index = cityGroup.indexOf(city);
    	  cityGroup.splice(index, 1);
    	  cities.discardPile.push(city);
    	  if(cityGroup.length == 0){
    		  var cityGroupIndex = cities.redrawStack.indexOf(cityGroup);
    		  cities.redrawStack.splice(cityGroupIndex, 1);
    	  }
      };

      cities.isTopGroup = function(cityGroup) {

    	var index = cities.redrawStack.indexOf(cityGroup);
    	return index == 0;

      };

      cities.redrawStack = [];

      cities.epidemic = function(selectedCity) {

    	selectedCity.count = selectedCity.count -1;
    	cities.discardPile.push(selectedCity);

    	var redraw = new Array();
    	angular.forEach(cities.discardPile, function(city) {
    		redraw.push(city);
    	});
    	cities.redrawStack.unshift(redraw);
    	cities.discardPile = [];

    	cities.selectedCity=" ";
    	cities.epidemicButtonDisabled = true;
    };

    //Admin functions

    cities.adminText = "Enable";

    cities.toggleAdminMode = function() {

    	cities.adminMode = !cities.adminMode;

    	if(cities.adminMode){
    		cities.adminText = "Disable";
    	} else {
    		cities.adminText = "Enable";
    	}

    };

    cities.removeFromDraw = function(city) {
    	if(confirm("Remove " + city.text + "?")){
    		var index = cities.drawPile.indexOf(city);
    		cities.drawPile.splice(index, 1);
    	}
    };

    cities.removeFromRedraw = function(cityGroup, city) {
    	if(confirm("Remove " + city.text + "?")){
    		var index = cityGroup.indexOf(city);
      	  	cityGroup.splice(index, 1);
    	}
    };

    cities.removeFromDiscard = function(city) {
    	if(confirm("Remove " + city.text + "?")){
    		var index = cities.discardPile.indexOf(city);
    		cities.discardPile.splice(index, 1);
    	}
    };

    cities.increaseCityCount = function(city) {
    	city.count = city.count + 1;
    }

    cities.decreaseCityCount = function(city) {
    	city.count = city.count -1;
    }

  });
