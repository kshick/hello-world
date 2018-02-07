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
    	{text:'Atlanta', done:false, color:"blue", count:1, max:1},
    	{text:'Chicago', done:false, color:"blue", count:2, max:2},
    	{text:'Denver', done:false, color:"blue", count:2, max:2},
    	{text:'London', done:false, color:"blue", count:3, max:3},
    	{text:'New York', done:false, color:"blue", count:3, max:3},
    	{text:'Washington', done:false, color:"blue", count:3, max:3},
	    {text:'Buenos Aires', done:false, color:"yellow", count:2, max:2},
	    {text:'Jacksonville', done:false, color:"yellow", count:3, max:3},
	    {text:'Mexico City', done:false, color:"yellow", count:1, max:1},
	    {text:'Lima', done:false, color:"yellow", count:1, max:1},
	    {text:'Lagos', done:false, color:"yellow", count:3, max:3},
	    {text:'Sao Paulo', done:false, color:"yellow", count:3, max:3},
	    {text:'Cairo', done:false, color:"black", count:3, max:3},
	    {text:'Istanbul', done:false, color:"black", count:3, max:3},
	    {text:'Tripoli', done:false, color:"black", count:3, max:3}];
 
    //  Epidemic progression - 2,2,2,3,3,4,4,5
    // ToDo: Add admin menu for each city with abilit to remove from game or manually move between groups
    // ToDo: add stats / percentages
    // ToDo: make pretty
    
    cities.discardPile = [];
    
    cities.addNewCity = function() {
      cities.drawPile.push({text:cities.newCity, done:false});
      cities.newCity = '';
    };
 
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
  });