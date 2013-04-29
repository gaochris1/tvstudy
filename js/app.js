
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
	
  	 $('#goUser3').click(function(){
    //alert("here");
     getcmaInput('channel');
     });
     
     $('#goUser4').click(function(){
    //alert("here");
	 getcmaInput('dma');

    });

    $('#goUser5').click(function () {
    //alert("here");
    getcmaInput('cd');

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
layers.push(mapboxTerrain);
layers.push(stamenToner);
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
        labelXOffset: "35"
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

//coverageStyle.addUniqueValueRules("default","coverage_5",coverageLookup);
coverageStyle.addUniqueValueRules("default","RESULT",coverageLookup);


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
    displayInLayerSwitcher: false,
    reportError: true
});
layers.push(coverageLayer);
map.addLayers(layers);

var scaleline = new OpenLayers.Control.ScaleLine();
map.addControl(scaleline);


function getcmaInput(type){
	//var cmaids=[];
	var cmaids='';
    var facilityids = [];
	var sourceKey = [];
	var callSign = [];
	var facilityId = [];
	var city='';
	var state = '';
	var citystate = '';
	var row1='';
	var row2='';
	var row3='';
	var rows = '';
	var cols = '';
	var indexOf2dashes = '';
    var channel = '';
	//search by callsign
	if (type=="callsign"){
        document.getElementById('results').style.display = "block";
		//cmaids=$('#cmaID').val().replace(/\s/g, "").split(',');
		cmaids=$('#cmaID').val();
		
        //facilityids=$('#facilityID').val().replace(/\s/g, "").split(',');
		//window.location.hash=cmaids;
		
    if (cmaids.length != 0){    
    $('#tbl_results tr td').parents('tr').remove();
    //alert("sourceJson features length:  " + sourceJson.features.length);
    for (i = 0; i < sourceJson.features.length; i++) {
            if (cmaids.toUpperCase() == sourceJson.features[i].properties.CALLSIGN.toString()) {
                //alert("matched feature id:  " + i);
                sourceKey[i] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[i] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[i] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[i] + '" class="cmaID visuallyhidden" type="text" value="' +                          sourceKey[i] + '">'
                cols += sourceKey[i] + '</td>';
                cols += '<td>' + callSign[i] + '</td>';
                cols += '<td>' + facilityId[i] + '</td>';
                cols += '<td><input id="' + sourceKey[i] + '" type="button" value="Map" class="mapBtnClass"></td>';
                row1 = '<tr style="background-color:rgb(225,225,225)">' + cols + '</tr>';
                //alert ("row1: " + row1);
                cols = '<td colspan="4">Population: ' + sourceJson.features[i].properties.total_po_1;
                cols +=' ----  Interference-free: ' + sourceJson.features[i].properties.total_popu + '</td>';
                row2 = '<tr>' + cols + '</tr>';
                rows = rows + row1 + row2;
    
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
                row1 = '<tr style="background-color:rgb(225,225,225)">' + cols + '</tr>';
                //alert ("row1: " + row1);
                cols = '<td colspan="4">Population: ' + sourceJson.features[i].properties.total_po_1;
                cols +=' ----  Interference-free: ' + sourceJson.features[i].properties.total_popu + '</td>';
                row2 = '<tr>' + cols + '</tr>';
                rows = rows + row1 + row2;
                //rows += '<tr>' + cols + '</tr>';
            }
        }
    }
    $('#tbl_results').find('tbody').append(rows);
    }
    }	
	//search by city and state
		if (type=="citystate"){
        document.getElementById('results').style.display = "block";
		var eCityState=document.getElementById("cityState");
        citystate=eCityState.options[eCityState.selectedIndex].value;
        indexOf2dashes = citystate.indexOf("--");
        state = citystate.substring(0,indexOf2dashes-1);
		city = citystate.substring(indexOf2dashes+3,citystate.length);
	    
 		
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
                row1 = '<tr style="background-color:rgb(225,225,225)">' + cols + '</tr>';
                //alert ("row1: " + row1);
                cols = '<td colspan="4">Population: ' + sourceJson.features[i].properties.total_po_1;
                cols +=' ----  Interference-free: ' + sourceJson.features[i].properties.total_popu + '</td>';
                row2 = '<tr>' + cols + '</tr>';
                rows = rows + row1 + row2;
                //rows += '<tr>' + cols + '</tr>';
        }
        
    }
    
    $('#tbl_results').find('tbody').append(rows);
    }
    }


	//search by channel
	if (type=="channel"){
        document.getElementById('results').style.display = "block";
		//cmaids=$('#cmaID').val().replace(/\s/g, "").split(',');
		channel=$('#channel').val();
		
        //facilityids=$('#facilityID').val().replace(/\s/g, "").split(',');
		//window.location.hash=cmaids;
		
    if (channel.length != 0){    
    $('#tbl_results tr td').parents('tr').remove();
    //alert("sourceJson features length:  " + sourceJson.features.length);
    row0 = '<tr><td colspan="4" align="center"><input id="' + channel + '" class="mapChannelBtnClass" type="button" value="Map All Stations"</td></tr>';
    for (i = 0; i < sourceJson.features.length; i++) {
            if (channel.toUpperCase() == sourceJson.features[i].properties.CHANNEL.toString()) {
                
                sourceKey[i] = sourceJson.features[i].properties.SOURCEKEY.toString();
                //alert("matched feature sourceKey:  " + sourceKey[i].toString());
                callSign[i] = sourceJson.features[i].properties.CALLSIGN.toString();
                //alert("matched feature callSign:  " + callSign[i].toString());
                facilityId[i] = sourceJson.features[i].properties.FACILITYID.toString();
                //alert("matched feature FacilityID:  " + facilityId[i].toString());
                cols = '<td><input id="source' + sourceKey[i] + '" class="cmaID visuallyhidden" type="text" value="' +                          sourceKey[i] + '">'
                cols += sourceKey[i] + '</td>';
                cols += '<td>' + callSign[i] + '</td>';
                cols += '<td>' + facilityId[i] + '</td>';
                cols += '<td><input id="' + sourceKey[i] + '" type="button" value="Map" class="mapBtnClass"></td>';
                row1 = '<tr style="background-color:rgb(225,225,225)">' + cols + '</tr>';
                //alert ("row1: " + row1);
                cols = '<td colspan="4">Population: ' + sourceJson.features[i].properties.total_po_1;
                cols +=' ----  Interference-free: ' + sourceJson.features[i].properties.total_popu + '</td>';
                row2 = '<tr>' + cols + '</tr>';
                rows = rows + row1 + row2;
    
                
            }
        }
    rows = row0 + rows
    $('#tbl_results').find('tbody').append(rows);
    }
    }

    
  
 	//search by dma
	if (type=="dma"){
        document.getElementById('results').style.display = "block";
        var eDma=document.getElementById("dma");
        var dma=eDma.options[eDma.selectedIndex].value;
        //indexOf2dashes = citystate.indexOf("--");
        //state = citystate.substring(0,indexOf2dashes-1);
		//city = citystate.substring(indexOf2dashes+3,citystate.length);
	    
	
        if (dma.length != 0){    
        $('#tbl_results tr td').parents('tr').remove();
    
    
    for (i = 0; i < sourceJson.features.length; i++) {
        if (dma.toString() == sourceJson.features[i].properties.dma.toString()) {
                sourceKey[i] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[i] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[i] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[i] + '" class="cmaID visuallyhidden" type="text" value="' + sourceKey[i] + '">'
                cols += sourceKey[i] + '</td>';
                cols += '<td>' + callSign[i] + '</td>';
                cols += '<td>' + facilityId[i] + '</td>';
                cols += '<td><input id="' + sourceKey[i] + '" type="button" value="Map" class="mapBtnClass"></td>';
                row1 = '<tr style="background-color:rgb(225,225,225)">' + cols + '</tr>';
                //alert ("row1: " + row1);
                cols = '<td colspan="4">Population: ' + sourceJson.features[i].properties.total_po_1;
                cols +=' ----  Interference-free: ' + sourceJson.features[i].properties.total_popu + '</td>';
                row2 = '<tr>' + cols + '</tr>';
                rows = rows + row1 + row2;
                //rows += '<tr>' + cols + '</tr>';
        }
        
    }

    
    $('#tbl_results').find('tbody').append(rows);
    }
    }


//search by cd
if (type == "cd") {
    document.getElementById('results').style.display = "block";
    var eCd = document.getElementById("cd");
    var cd = eCd.options[eCd.selectedIndex].value;
   

    if (cd.length != 0) {
        $('#tbl_results tr td').parents('tr').remove();


        for (i = 0; i < sourceJson.features.length; i++) {
            if (cd.toString() == sourceJson.features[i].properties.cd113.toString()) {
                sourceKey[i] = sourceJson.features[i].properties.SOURCEKEY.toString();
                callSign[i] = sourceJson.features[i].properties.CALLSIGN.toString();
                facilityId[i] = sourceJson.features[i].properties.FACILITYID.toString();
                cols = '<td><input id="source' + sourceKey[i] + '" class="cmaID visuallyhidden" type="text" value="' + sourceKey[i] + '">'
                cols += sourceKey[i] + '</td>';
                cols += '<td>' + callSign[i] + '</td>';
                cols += '<td>' + facilityId[i] + '</td>';
                cols += '<td><input id="' + sourceKey[i] + '" type="button" value="Map" class="mapBtnClass"></td>';
                row1 = '<tr style="background-color:rgb(225,225,225)">' + cols + '</tr>';
                //alert ("row1: " + row1);
                cols = '<td colspan="4">Population: ' + sourceJson.features[i].properties.total_po_1;
                cols += ' ----  Interference-free: ' + sourceJson.features[i].properties.total_popu + '</td>';
                row2 = '<tr>' + cols + '</tr>';
                rows = rows + row1 + row2;
                //rows += '<tr>' + cols + '</tr>';
            }

        }


        $('#tbl_results').find('tbody').append(rows);
    }
}






    $('.mapBtnClass').click(function(){
    
    var mapId = this.id;
    ////alert("mapId: " + mapId);
    drawcma(mapId);
    });
   
    $('.mapChannelBtnClass').click(function(){
    
    var channelId = this.id;
    //alert("channelId: " + channelId);
    drawChannelMap(channelId);
    });
 	
    //window.location.hash=sourceKey;

        
	

	
}

//need another function drawChannelMap to have passed in one channel and then map by this channel
function drawChannelMap(channelId){
        //remove coverage for each station first
/*        var fileName = "data/coverage_channel" + channelId + ".geojson";
        alert ("file name: " + fileName);
       
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
    var coverageFeats = coverageP.read(coverageJson);
    alert("length of coverageFeats: " + coverageFeats.length);*/
    coverageLayer.removeAllFeatures();
    //coverageLayer.addFeatures(coverageFeats);
       
    
    //draw source layer 
    mySourceJson.features = [];
    var sourceP = new OpenLayers.Format.GeoJSON(options);
    
    for (i = 0; i < sourceJson.features.length; i++) {
            if (channelId.toString() == sourceJson.features[i].properties.CHANNEL.toString()) {
                mySourceJson.features.push(sourceJson.features[i]);
            }
    }
    //alert("source layer feature length:" + mySourceJson.features.length );
     
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
	
	
	for (i=0;i<cmaJson.features.length;i++){
			if (channelId.toString()==cmaJson.features[i].properties.CHANNEL.toString()){
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
//end of function drawChannelMap

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
    
    //draw source layer first
    mySourceJson.features = [];
    var sourceP = new OpenLayers.Format.GeoJSON(options);
    
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
    var dmaSelect = '';
    var cdSelect = '';

    for (i = 0; i < sourceJson.features.length; i++) {
        if (citySelect != sourceJson.features[i].properties.CITY.toString() || stateSelect != sourceJson.features[i].properties.STATE.toString()) {
            citySelect = sourceJson.features[i].properties.CITY.toString();
            stateSelect = sourceJson.features[i].properties.STATE.toString();
            $('#cityState').append("<option>" + stateSelect + " -- " + citySelect + "</option>");
        }

        if (dmaSelect != sourceJson.features[i].properties.dma.toString()) {
            dmaSelect = sourceJson.features[i].properties.dma.toString();
            $('#dma').append("<option>" + dmaSelect + "</option>");
        }

        if (cdSelect != sourceJson.features[i].properties.cd113.toString()) {
            cdSelect = sourceJson.features[i].properties.cd113.toString();
            //alert("cd113:" + cdSelect);
            $('#cd').append("<option>" + cdSelect + "</option>");
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

