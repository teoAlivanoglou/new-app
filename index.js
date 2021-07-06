import 'ol/ol.css';
import {Map, View} from 'ol';
import MousePosition from 'ol/control/MousePosition';
import TileLayer from 'ol/layer/Tile';
import {createStringXY} from 'ol/coordinate';
import OSM from 'ol/source/OSM';
import {defaults as defaultControls} from 'ol/control';
import * as olProj from 'ol/proj'

import GeoJSON from 'ol/format/GeoJSON';


const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    // className: 'custom-mouse-position',
    target: document.getElementById('dbg'),
    undefinedHTML: '&nbsp;',
  });

const map = new Map({
    controls: defaultControls().extend([mousePositionControl]),
    target: 'map',
    layers: [
        new TileLayer({source: new OSM()})
    ],
    view: new View({
        center: [0, 0],
        zoom: 0
    })
});

map.on('click', function(event){
    let coord = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    dbg(coord, true);
});


// dbg('works');
// dbg('works');
// dbg('works');




function dbg (txt, clear = false) {
    let divcont = document.getElementById("dbg");
    if (clear) {
        divcont.innerHTML = '';
    }
    divcont.innerHTML += txt;
    divcont.innerHTML += '<br>';
    
}