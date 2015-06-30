angular.module('technik').controller('technicController', function($scope, $resource, $http){
	//INITIALIZE ARRAYS
	$scope.entries = [];
	$scope.cart = [];
	$scope.intern = true;
	
	//FETCH DATA FROM DRIVE
	var url = "https://spreadsheets.google.com/feeds/list/1JqBbDUAjUc5lVJb72IVYTbWsP9G3TxYysN76fYCZFrs/od6/public/values?alt=json";
    $http.get(url).
		success(function(data) {
			angular.forEach(data.feed.entry, function(entry){
				$scope.entries.push({geraet:entry.gsx$geraet.$t, stueckzahl:entry.gsx$stueckzahl.$t, art:entry.gsx$art.$t, typ:entry.gsx$typ.$t, marke:entry.gsx$marke.$t, preisintern:entry.gsx$preisintern.$t, preisextern:entry.gsx$preisextern.$t});
			});
		}).
		error(function(data) {
			console.log("something went wrong...");
		});


	$scope.setIntern = function(newValue){
		$scope.intern = newValue;
	}	
		
	//CART
	$scope.addToCart = function(entry){
	    var idx = $scope.entries.indexOf(entry);
		var add = true;
		var copyOfEntry;
		if(entry.stueckzahl >= 1){
			angular.forEach($scope.cart, function(cartEntry){
				if(sameEntry(cartEntry,entry))
				{
					cartEntry.stueckzahl = cartEntry.stueckzahl+1;
					add = false;
				}
			});
			if(add){
				copyOfEntry = angular.copy(entry);
				copyOfEntry.stueckzahl = 1;
				$scope.cart.push(copyOfEntry);
			}
			if(entry.stueckzahl == 1){
				$scope.entries.splice(idx,1);
			}
			else{
				entry.stueckzahl -= 1;
			}
		}
	}
	
	$scope.removeFromCart = function(cartEntry){
	    var idx = $scope.cart.indexOf(cartEntry);
		var remove = true;
		var copyOfEntry = angular.copy(cartEntry);
		angular.forEach($scope.entries, function(entry){
			if(sameEntry(entry,cartEntry))
			{
				entry.stueckzahl = entry.stueckzahl+1;
				if(cartEntry.stueckzahl >= 1){
					cartEntry.stueckzahl -= 1;
				}
				if(cartEntry.stueckzahl == 0){
					$scope.cart.splice(idx,1);
				}
				remove = false;
			}
		});
		if(remove){
			copyOfEntry.stueckzahl = 1;
			$scope.entries.push(copyOfEntry);
			if(cartEntry.stueckzahl >= 1){
				cartEntry.stueckzahl -= 1;
			}
			if(cartEntry.stueckzahl == 0){
				$scope.cart.splice(idx,1);
			}
		}
	}
	
	$scope.getTotalExtern = function(){
		var total = 0;
		angular.forEach($scope.cart, function(entry){
			total += entry.stueckzahl * entry.preisextern;
		});
		return round(total);
	}
	
	$scope.getTotalIntern = function(){
		var total = 0;
		angular.forEach($scope.cart, function(entry){
			total += entry.stueckzahl * entry.preisintern;
		});
		return round(total);
	}
	
	function sameEntry(entry1, entry2){
		return (angular.equals(entry1.geraet,entry2.geraet) && angular.equals(entry1.art, entry2.art) && angular.equals(entry1.typ, entry2.typ) && angular.equals(entry1.marke, entry2.marke));
	}
	
	function round(number){
		return (Math.round(number*20)/20).toFixed(2);
	}
	
	$scope.roundIt = function(number){
		return round(number);
	}
});
