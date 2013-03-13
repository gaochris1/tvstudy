
$(document).ready(function () {

    $('ul.macro li a').click(function() {
	
		if (this.id=="mapboxTerrain"){
			map.setBaseLayer(mapboxTerrain);
		}
		else if (this.id=="stamenToner"){
			map.setBaseLayer(stamenToner);
		}
		else if (this.id=="mapboxNightvision"){
			map.setBaseLayer(mapboxNightvision);
		}
		else if (this.id=="mapboxLight"){
			map.setBaseLayer(mapboxLight);
		}
			$('ul.macro li a').removeClass('active');
			$(this).addClass('active');
	});
	

	
	$('#goUser').click(function(){
    getcmaInput('callsign');
	});
	 
	 $('#goUser1').click(function(){
    //alert("here");
	 getcmaInput('facilityid');
	});
	
	 $('#goUser2').click(function(){
    //alert("here");
	 getcmaInput('citystate');
	});

	$('#btn-resetMap').click(function(){
		$('#tbl-CMA').find('input[type="checkbox"]').each(function(){
			$(this).removeAttr('checked');	
		}).end().find('tr').each(function(){
			$(this).removeClass('selected');
		})
		
		cmaLayer.removeAllFeatures();
		map.zoomToExtent(fullExtent);
	});
	
	$('#tbl-CMA tbody').delegate('tr', 'click', function(){
		var cmaID = $(this).find('.cmaID');		
		var cmaArr = [];
		
		if (cmaID.attr('checked') == 'checked') {
			cmaID.attr('checked', false);	
			$(this).toggleClass('selected');	
		} else {
			cmaID.attr('checked', true);
			$(this).toggleClass('selected');
		}
		
		$('#tbl-CMA').find('.cmaID:checked').each(function (){
			cmaArr.push($(this).val());		
		}); 
	
		if (cmaArr.length > 0) {
			drawcma(cmaArr);		
		}	else {
			cmaLayer.removeAllFeatures();
			map.zoomToExtent(fullExtent);
		}	
		console.log(cmaArr);
		document.getElementById('cmaID').value = ""; 
		document.getElementById('cmaID').value = cmaArr.toString(); 
		window.location.hash=cmaArr.toString();
		
});
	 
});

var cmaJson;
var sourceJson;
var coverageJson;

var layers=[];
var fullExtent = new OpenLayers.Bounds(
		 -17107255, 2910721, -4740355, 6335100
    );

var myJson = {};
var mySourceJson = {};
var myCoverageJson = {};

var map = new OpenLayers.Map({
    div: "coveragemap",
    projection: "EPSG:900913",
    displayProjection: "EPSG:4326",
    numZoomLevels:14,
    maxExtent: new OpenLayers.Bounds(-2.003750834E7,-2.003750834E7,2.003750834E7,2.003750834E7),
	units: "meters"
});


var options = {
		'internalProjection': new OpenLayers.Projection("EPSG:900913"),
		'externalProjection': new OpenLayers.Projection("EPSG:4326")};

var mapboxTerrain = new OpenLayers.Layer.XYZ(
	    "Mapbox Terrain map",
	    [
	   //  "https://dnv9my2eseobd.cloudfront.net/v3/fcc.map-rons6wgv/${z}/${x}/${y}.png"
	     "http://a.tiles.mapbox.com/v3/fcc.map-rons6wgv/${z}/${x}/${y}.png",
	     "http://b.tiles.mapbox.com/v3/fcc.map-rons6wgv/${z}/${x}/${y}.png",
	     "http://c.tiles.mapbox.com/v3/fcc.map-rons6wgv/${z}/${x}/${y}.png",
	     "http://d.tiles.mapbox.com/v3/fcc.map-rons6wgv/${z}/${x}/${y}.png"
	    ], {
	        attribution: "Data &copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> " +
            "and contributors, CC-BY-SA",
	        sphericalMercator: true,
	        wrapDateLine: true,
	        numZoomLevels:14,
	        transitionEffect: "resize",
	        buffer: 1
	    }
	);
var stamenToner = new OpenLayers.Layer.XYZ(
	    "Stamen Toner map",
	    [
	       "http://a.tiles.mapbox.com/v3/gaochris1.tvstudyDC/${z}/${x}/${y}.png",
			"http://b.tiles.mapbox.com/v3/gaochris1.tvstudyDC/${z}/${x}/${y}.png",
			"http://c.tiles.mapbox.com/v3/gaochris1.tvstudyDC/${z}/${x}/${y}.png",
			"http://d.tiles.mapbox.com/v3/gaochris1.tvstudyDC/${z}/${x}/${y}.png"
	    ], {
	        attribution: "<a target='_top' href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by " +
	        "<a target='_top' href='http://openstreetmap.org'>OpenStreetMap</a>, under " +
	        "<a target='_top' href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>",
	    	sphericalMercator: true,
	        wrapDateLine: true,
	        numZoomLevels:17,
	        transitionEffect: "resize",
	        //maxExtent: new OpenLayers.Bounds(-80, -74, 36, 40),
            buffer: 1
	    }
	);
var mapboxNightvision = new OpenLayers.Layer.XYZ(
	    "Mapbox Nightvision map",
	    [
	     	//"https://dnv9my2eseobd.cloudfront.net/v3/fcc.map-qly54czi/${z}/${x}/${y}.png"
			"http://a.tiles.mapbox.com/v3/fcc.map-qly54czi/${z}/${x}/${y}.png",
			"http://b.tiles.mapbox.com/v3/fcc.map-qly54czi/${z}/${x}/${y}.png",
			"http://c.tiles.mapbox.com/v3/fcc.map-qly54czi/${z}/${x}/${y}.png",
			"http://d.tiles.mapbox.com/v3/fcc.map-qly54czi/${z}/${x}/${y}.png"

	    ], {
	        attribution: "Data &copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> " +
            "and contributors, CC-BY-SA",
	        sphericalMercator: true,
	        wrapDateLine: true,
	        numZoomLevels:14,
	        transitionEffect: "resize",
	        buffer: 1
	    }
	);
var mapboxLight = new OpenLayers.Layer.XYZ(
	    "Mapbox Nightvision map",
	    [
	     	//"https://dnv9my2eseobd.cloudfront.net/v3/fcc.map-kzt95hy6/${z}/${x}/${y}.png"
			"http://a.tiles.mapbox.com/v3/fcc.map-kzt95hy6/${z}/${x}/${y}.png",
			"http://b.tiles.mapbox.com/v3/fcc.map-kzt95hy6/${z}/${x}/${y}.png",
			"http://c.tiles.mapbox.com/v3/fcc.map-kzt95hy6/${z}/${x}/${y}.png",
			"http://d.tiles.mapbox.com/v3/fcc.map-kzt95hy6/${z}/${x}/${y}.png"
	    ], {
	        attribution: "Data &copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> " +
            "and contributors, CC-BY-SA",
	        sphericalMercator: true,
	        wrapDateLine: true,
	        numZoomLevels:14,
	        transitionEffect: "resize",
	        buffer: 1
	    }
	);
var cmaMap = new OpenLayers.Layer.XYZ(
	    "CMA map",
	    [
	     	//"https://dnv9my2eseobd.cloudfront.net/v3/fcc.map-kzt95hy6/${z}/${x}/${y}.png"
			"http://a.tiles.mapbox.com/v3/computech.cma/${z}/${x}/${y}.png",
			"http://b.tiles.mapbox.com/v3/computech.cma/${z}/${x}/${y}.png",
			"http://c.tiles.mapbox.com/v3/computech.cma/${z}/${x}/${y}.png",
			"http://d.tiles.mapbox.com/v3/computech.cma/${z}/${x}/${y}.png"
	    ], {
	        sphericalMercator: true,
	        wrapDateLine: true,
	        isBaseLayer:false,
	        transitionEffect: "resize",
	        buffer: 1
	    }
	);
layers.push(stamenToner);
layers.push(mapboxTerrain);
//layers.push(mapboxNightvision);
//layers.push(mapboxLight);
//layers.push(cmaMap);


var contourStyle = new OpenLayers.StyleMap({
    "default": new OpenLayers.Style({
        strokeColor: "#0b32fa",
		//strokeOpacity: 1,
    	strokeWidth: 2
		//fillColor: "#FFAEDB",
		//fillOpacity: 0
    }),
    "temporary": new OpenLayers.Style({
        strokeColor: "#F09100",
		strokeWidth:2
		//fillOpacity: 0
    })
});

var sourceStyle = new OpenLayers.StyleMap({
    "default": new OpenLayers.Style({
        //strokeColor: "#0b32fa",
		//strokeOpacity: 1,
    	//strokeWidth: 2,
		pointRadius:5,
		fillColor:"#0b32fa",
		label: "${CALLSIGN}",
        fontColor: "#0b32fa",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        labelXOffset: "25"
    }),
    "temporary": new OpenLayers.Style({
        //strokeColor: "#F09100",
		//strokeWidth:2,
		pointRadius:5,
		fillColor:"#0b32fa"
    })
});

var coverageStyle = new OpenLayers.StyleMap({
    "default": new OpenLayers.Style({
        //strokeColor: "#279d94",
		//strokeOpacity: 1,
    	strokeWidth: 1,
		pointRadius:2,
		fillOpacity:0
    })/*,
    "temporary": new OpenLayers.Style({
        strokeColor: "#279d94",
		strokeWidth:1,
		pointRadius:2,
    	fillOpacity:0
    })*/
});
var coverageLookup = {
    "1" : {strokeColor: "#279d94"},
    "2" : {strokeColor: "#fa0b26"}
};

coverageStyle.addUniqueValueRules("default","coverage_5",coverageLookup);


//var cmaLayer= new OpenLayers.Layer.Vector("cma",{
var cmaLayer = new OpenLayers.Layer.Vector("contour", {
		styleMap: contourStyle,					
		displayInLayerSwitcher:false
	});
layers.push(cmaLayer);
map.addLayers(layers);

var sourceLayer = new OpenLayers.Layer.Vector("source", {
    styleMap: sourceStyle,
    displayInLayerSwitcher: false
});
layers.push(sourceLayer);
map.addLayers(layers);

var coverageLayer = new OpenLayers.Layer.Vector("coverage", {
    styleMap: coverageStyle,
    displayInLayerSwitcher: false
});
layers.push(coverageLayer);
map.addLayers(layers);

var scaleline = new OpenLayers.Control.ScaleLine();
map.addControl(scaleline);


function getcmaInput(type){
	var cmaids=[];
	var facilityids = [];
	var sourceKey = [];
	var callSign = [];
	var facilityId = [];
	var city='';
	var state = '';
	var citystate = '';
	var rows = '';
	var cols = '';
	var indexOfComma = '';
	//search by callsign
	if (type=="callsign"){
        document.getElementById('results').style.display = "block";
		cmaids=$('#cmaID').val().replace(/\s/g, "").split(',');
		//facilityids=$('#facilityID').val().replace(/\s/g, "").split(',');
		//window.location.hash=cmaids;
		
    if (cmaids.length != 0){    
    $('#tbl_results tr td').parents('tr').remove();
    for (i = 0; i < sourceJson.features.length; i++) {
        for (j = 0; j < cmaids.length; j++) {
            if (cmaids[j].toString().toUpperCase() == sourceJson.features[i].properties.CALLSIGN.toString()) {
                sourceKey[j] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[j] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[j] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[j] + '" class="cmaID visuallyhidden" type="text" value="' +                          sourceKey[j] + '">'
                cols += sourceKey[j] + '</td>';
                cols += '<td>' + callSign[j] + '</td>';
                cols += '<td>' + facilityId[j] + '</td>';
                cols += '<td><input id="' + sourceKey[j] + '" type="button" value="Map" class="mapBtnClass"></td>';
                rows += '<tr>' + cols + '</tr>';
            }
        }
    }
    $('#tbl_results').find('tbody').append(rows);
    }
    }
    //search by facility id
	if (type=="facilityid"){
        document.getElementById('results').style.display = "block";
		facilityids=$('#facilityID').val().replace(/\s/g, "").split(',');
		//facilityids=$('#facilityID').val().replace(/\s/g, "").split(',');
		//alert("facilityid: " + facilityids);
	
	if (facilityids.length != 0){    
    $('#tbl_results tr td').parents('tr').remove();
    for (i = 0; i < sourceJson.features.length; i++) {
        for (j = 0; j < facilityids.length; j++) {
            if (facilityids[j].toString().toUpperCase() == sourceJson.features[i].properties.FACILITYID.toString()) {
                sourceKey[j] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[j] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[j] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[j] + '" class="cmaID visuallyhidden" type="text" value="' +                          sourceKey[j] + '">'
                cols += sourceKey[j] + '</td>';
                cols += '<td>' + callSign[j] + '</td>';
                cols += '<td>' + facilityId[j] + '</td>';
                cols += '<td><input id="' + sourceKey[j] + '" type="button" value="Map" class="mapBtnClass"></td>';
                rows += '<tr>' + cols + '</tr>';
            }
        }
    }
    $('#tbl_results').find('tbody').append(rows);
    }
    }	
	//search by city and state
		if (type=="citystate"){
        document.getElementById('results').style.display = "block";
        var eCity = document.getElementById("citySelect");
        city = eCity.options[eCity.selectedIndex].value;
        
        var eState = document.getElementById("stateSelect");
        state = eState.options[eState.selectedIndex].value;
        
		//citystate=$('#cityState').val().replace(/\s/g, "").toUpperCase();
		//indexOfComma = citystate.indexOf(",");
		//city = citystate.substring(0,indexOfComma);
		//state = citystate.substring(indexOfComma+1,citystate.length);
	
		//alert ("city/state: " + state + "/" + city);
		
		//facilityids=$('#facilityID').val().replace(/\s/g, "").split(',');
		//window.location.hash=cmaids;
		
    if (city.length != 0){    
    $('#tbl_results tr td').parents('tr').remove();
    
    
    for (i = 0; i < sourceJson.features.length; i++) {
        if (city.toString() == sourceJson.features[i].properties.CITY.toString() && state.toString()==sourceJson.features[i].properties.STATE.toString()) {
                sourceKey[i] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[i] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[i] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[i] + '" class="cmaID visuallyhidden" type="text" value="' + sourceKey[i] + '">'
                cols += sourceKey[i] + '</td>';
                cols += '<td>' + callSign[i] + '</td>';
                cols += '<td>' + facilityId[i] + '</td>';
                cols += '<td><input id="' + sourceKey[i] + '" type="button" value="Map" class="mapBtnClass"></td>';
                rows += '<tr>' + cols + '</tr>';
        }
        
    }
    
    
    
    
    /*for (i = 0; i < sourceJson.features.length; i++) {
        for (j = 0; j < citystate.length; j++) {
            if (city.toString() == sourceJson.features[i].properties.CITY.toString() && state.toString()==sourceJson.features[i].properties.STATE.toString()) {
                sourceKey[j] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[j] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[j] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[j] + '" class="cmaID visuallyhidden" type="text" value="' +                          sourceKey[j] + '">'
                cols += sourceKey[j] + '</td>';
                cols += '<td>' + callSign[j] + '</td>';
                cols += '<td>' + facilityId[j] + '</td>';
                cols += '<td><input id="' + sourceKey[j] + '" type="button" value="Map" class="mapBtnClass"></td>';
                rows += '<tr>' + cols + '</tr>';
            }
        }
    }
    */
    
    
    $('#tbl_results').find('tbody').append(rows);
    }
    }

    $('.mapBtnClass').click(function(){
    
    var mapId = this.id;
    ////alert("mapId: " + mapId);
    drawcma(mapId);
    });
   
 	
    //window.location.hash=sourceKey;

        
	

	
}
function drawcma(sourceKey){
        //draw coverage first
        var fileName = "data/coverage_" + sourceKey + ".geojson";
        ////alert ("file name: " + fileName);

/*          $.getJSON(fileName, function (data) {
            coverageJson = data;
            myCoverageJson.type = coverageJson.type;
            myCoverageJson.features = [];
            map.zoomToExtent(fullExtent);
            map.zoomTo(4);

            
        });*/
        
        $.ajax({
            url: fileName,
            dataType: 'json',
            async: false,
            success: function(data) {
            coverageJson = data;
            myCoverageJson.type = coverageJson.type;
            myCoverageJson.features = [];
            map.zoomToExtent(fullExtent);
            //map.zoomTo(4);
        }
        });

    myCoverageJson.features = [];
    var coverageP = new OpenLayers.Format.GeoJSON(options);
    //test code starts
    var coverageFeats = coverageP.read(coverageJson);
    ////alert("length of coverageFeats: " + coverageFeats.length);
    coverageLayer.removeAllFeatures();
    coverageLayer.addFeatures(coverageFeats);
    
    //test code ends
    
    /*
    for (i = 0; i < coverageJson.features.length; i++) {
        for (j = 0; j < sourceKey.length; j++) {
            if (sourceKey[j].toString() == coverageJson.features[i].properties.coverage_2.toString()) {
                myCoverageJson.features.push(coverageJson.features[i]);
            }
        }
    }
     
    if (myCoverageJson.features.length > 0) {
        var coverageFeats = coverageP.read(myCoverageJson);
        coverageLayer.removeAllFeatures();
        coverageLayer.addFeatures(coverageFeats);
        //map.zoomToExtent(sourceLayer.getDataExtent());
    }
    
        var coverageFeats = coverageP.read(myCoverageJson);
        coverageLayer.removeAllFeatures();
        coverageLayer.addFeatures(coverageFeats);
    */
    //draw source layer first
    mySourceJson.features = [];
    var sourceP = new OpenLayers.Format.GeoJSON(options);
    /*for (i = 0; i < sourceJson.features.length; i++) {
        for (j = 0; j < sourceKey.length; j++) {
            ////alert("source key: " + sourceKey[j] );
            ////alert("sourceJson.features[i].properties.SOURCEKEY: " + sourceJson.features[i].properties.SOURCEKEY.toString());
            if (sourceKey[j].toString() == sourceJson.features[i].properties.SOURCEKEY.toString()) {
                mySourceJson.features.push(sourceJson.features[i]);
            }
        }
    }*/
    
    for (i = 0; i < sourceJson.features.length; i++) {
            if (sourceKey.toString() == sourceJson.features[i].properties.SOURCEKEY.toString()) {
                mySourceJson.features.push(sourceJson.features[i]);
            }
    }
    ////////alert("source layer feature length:" + mySourceJson.features.length );
     
    if (mySourceJson.features.length > 0) {
        var sourceFeats = sourceP.read(mySourceJson);
        sourceLayer.removeAllFeatures();
        ////////alert("inside sourceFeats Length: " + sourceFeats.length);
        sourceLayer.addFeatures(sourceFeats);
        
    }
    
    var sourceFeats = sourceP.read(mySourceJson);
    sourceLayer.removeAllFeatures();
    ////alert("outside sourceFeats Length: " + sourceFeats.length);
    sourceLayer.addFeatures(sourceFeats);
    

	  	

    //draw contour layer
	myJson.features=[];
	var p = new OpenLayers.Format.GeoJSON(options);
	
	/*for (i=0;i<cmaJson.features.length;i++){
		for (j=0;j<sourceKey.length;j++){
            ////////alert("contourlayer: " + cmaids[j].toString());
			if (sourceKey[j].toString()==cmaJson.features[i].properties.SOURCEKEY.toString()){
				myJson.features.push(cmaJson.features[i]);
			}
		}
	}*/
	
	for (i=0;i<cmaJson.features.length;i++){
			if (sourceKey.toString()==cmaJson.features[i].properties.SOURCEKEY.toString()){
				myJson.features.push(cmaJson.features[i]);
			}
	}
	
	
	if(myJson.features.length>0){
		var feats = p.read(myJson);	
		cmaLayer.removeAllFeatures();
	  	cmaLayer.addFeatures(feats);
	  	map.zoomToExtent(cmaLayer.getDataExtent());
	}
	var feats = p.read(myJson);	
	cmaLayer.removeAllFeatures();
  	cmaLayer.addFeatures(feats);
    ////alert("outside contour feats Length: " + feats.length);
  	map.zoomToExtent(cmaLayer.getDataExtent());
}


/*function selectTableRows(cmaids){
	
	//deal with table
	$('#tbl-CMA').find('.cmaID').each(function (){
		$(this).attr('checked',false);
	    $(this).parents('tr').removeClass('selected');
	})
	
	$('#tbl-CMA').find('.cmaID').each(function (){
        for (i=0;i<cmaids.length;i++){       
        	if ($(this).val()==cmaids[i]){
        		$(this).attr('checked',true);
        		$(this).parents('tr').addClass('selected');
        	}
        }
	});  
}*/

/*function getSourceList (d) {
	var feats = d.features,
			featsLen = feats.length
			rows = '',
			cols = '';
	
	// Create CMA ID table
			for (var i = 0; i < featsLen; i++) {
			    cols = '<td><input id="source' + feats[i].properties.SOURCEKEY + '" class="cmaID visuallyhidden" type="checkbox" value="' + feats[i].properties.SOURCEKEY + '">'
			    cols += feats[i].properties.SOURCEKEY + '</td>';
			    cols += '<td>' + feats[i].properties.CALLSIGN + '</td>';
			    rows += '<tr>' + cols + '</tr>';
			}
		
//////alert(rows);
	$('#tbl-CMA').find('tbody').append(rows);
	
	$('#tbl-CMA').dataTable({
      "aoColumns": [
                { "sType": "string-num" },
                null
            ],			
			"aaSorting": [
        [0, "asc"]
      ],      
      "bFilter": false,
      "bInfo": false,
      "bPaginate": false,
			"sScrollY": "100px",			
			"bScrollCollapse": true      
    });
	
	// When window resizes, calc. width of fixed datatable header
	$(window).resize(function(){
		$('.dataTables_scrollHead, .dataTables_scrollHeadInner').css('width',($('.dataTables_scrollBody').width()-15) + 'px');	
	});	
	
	
	
	
}*/

$.getJSON("data/contours.geojson", function (data) {
	cmaJson=data;
	myJson.type=cmaJson.type;
	myJson.features=[];
	map.zoomToExtent(fullExtent);
	//map.zoomTo(4);
	
	    
    //getCMAList(data);
	//console.log(data);
	var paras=window.location.href.split("#");
	////alert("from contours.geojson -- paras.length: " + paras.length);
    if (paras.length==1){
		//do nothing
	}
	else{
		if(paras[1].length>0){
			var parasArray=decodeURIComponent(paras[1]).replace(/\s/g, "").split(",");
			//console.log(parasArray.toString());
			drawcma(parasArray);
			console.log("paras: " +parasArray.toString()); 
			selectTableRows(parasArray);
			document.getElementById('cmaID').value = ""; 
			document.getElementById('cmaID').value = parasArray.toString();
		}
	}
});

$.getJSON("data/source.geojson", function (data) {
    sourceJson = data;
    mySourceJson.type = sourceJson.type;
    mySourceJson.features = [];
    map.zoomToExtent(fullExtent);
    map.zoomTo(4);

    //populate the dropdown list
	var citySelect = '';
	var stateSelect = '';

    for (i = 0; i < sourceJson.features.length; i++) {
        if (citySelect !=sourceJson.features[i].properties.CITY.toString()){
            citySelect = sourceJson.features[i].properties.CITY.toString();
            $('#citySelect').append("<option>" + citySelect + "</option>");
        };
        if (stateSelect !=sourceJson.features[i].properties.STATE.toString()){
            stateSelect = sourceJson.features[i].properties.STATE.toString();
            $('#stateSelect').append("<option>" + stateSelect + "</option>");
        }
    }


	//getSourceList(data);
    //console.log(data);
    var paras = window.location.href.split("#");
    ////alert("from source.geojson -- paras.length: " + paras.length);
    if (paras.length == 1) {
        //do nothing
    }
    else {
        if (paras[1].length > 0) {
            var parasArray = decodeURIComponent(paras[1]).replace(/\s/g, "").split(",");
            //console.log(parasArray.toString());
            drawcma(parasArray);
            console.log("paras: " + parasArray.toString());
            selectTableRows(parasArray);
            document.getElementById('cmaID').value = "";
            document.getElementById('cmaID').value = parasArray.toString();
        }
    }
});

/*$.getJSON("data/coverage.geojson", function (data) {
    coverageJson = data;
    myCoverageJson.type = coverageJson.type;
    myCoverageJson.features = [];
    map.zoomToExtent(fullExtent);
    map.zoomTo(4);

    //getSourceList(data);
    //console.log(data);
    var paras = window.location.href.split("#");
    ////////alert("from coverage.geojson -- paras.length: " + paras.length);
    if (paras.length == 1) {
        //do nothing
    }
    else {
        if (paras[1].length > 0) {
            var parasArray = decodeURIComponent(paras[1]).replace(/\s/g, "").split(",");
            //console.log(parasArray.toString());
            drawcma(parasArray);
            console.log("paras: " + parasArray.toString());
            selectTableRows(parasArray);
            document.getElementById('cmaID').value = "";
            document.getElementById('cmaID').value = parasArray.toString();
        }
    }
});*/