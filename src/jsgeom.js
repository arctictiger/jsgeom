/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var jsgeom = (function() {
    var geometry = (function(){
        //This a representation of the geometry as specified by the geojson specifications
        //http://geojson.org/geojson-spec.html
        function Geometry(type, coordinates){
            this.type = type;
            this.coordinates = coordinates;
        }

        function GeometryCollection(geometries){
            this.type = geometry.type.GeometryCollection;
            this.geometries = geometries;
        }
        type = {
            Point:"Point",
            LineString:"LineString",
            Polygon:"Polygon",
            MultiPoint:"MultiPoint",
            MultiLineString:"MultiLineString",
            MultiPolygon:"MultiPolygon",
            GeometryCollection:"GeometryCollection"
        }
        return {
            Geometry: Geometry,
            GeometryCollection : GeometryCollection,
            type: type
        }
    })();
    var operations = (function(){
        //From spatial SQL standard
        //Equals
        //Disjoint
        //Touches
        //Within
        //Overlaps
        //Crosses
        //Intersects
        //Contains
        //Relate
       

        function _pointOnEdge(edge, point){
            if((point[0] == edge[0][0] && point[1] == edge[0][1] )|| (point[0] == edge[1][0] && point[1] == edge[1][1] )) return true;
            var maxX = edge[1][0];
            var minX = edge[0][0];
            var maxY = edge[1][1];
            var minY = edge[0][1];
            if(minX > maxX){
                maxX= minX;
                minX = edge[1][0];
            }
            if(minY > maxY){
                maxY= minY;
                minY = edge[1][1];
            }

            if(point[0] <=  maxX && point[1] <= maxY && point[0] >=  minX && point[1] >= minY){
                var lineSlope = (edge[0][0] - edge[1][0]) / (edge[0][1] - edge[1][1]);
                var pointSlope = (point[0] - edge[1][0]) / (point[1] - edge[1][1]);
                return (lineSlope == pointSlope);
            }
            return false;
        }

        //private function
        //Adapted from
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]
        function _pointInSimplePolygon( polygon, point)
        {
            var pt = point.coordinates;
            var poly = polygon.coordinates[0]; // Only the exterior ring is tested.
            if (poly.length < 4){
                throw "Invalid polygon";
            }
            for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i){
                if(_pointOnEdge([poly[i],poly[j]], pt)) return true;
                ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
                && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
                && (c = !c);
            }
            return c;
        }
        
       
        //See http://postgis.refractions.net/docs/ST_Contains.html
        function contains(geometrya, geometryb)
        {
            switch(geometrya.type){
                case "Point":
                    if(geometryb.type=="Point"){
                        if(geometryb.coordinates[0] == geometrya.coordinates[0] && geometryb.coordinates[1] == geometrya.coordinates[1]) return true;
                        else return false;
                    }
                    throw "Invalid geometry for method";
                    break;
                case "MultiPoint":
                    if(geometryb.type=="Point"){
                        for(var i = 0; i < geometrya.coordinates.length; i++){
                            if (contains(new jsgeom.geometry.Geometry("Point", geometrya.coordinates[i]),geometryb)) return true;
                        }
                        return false;
                    }
                    throw "Invalid geometry for method";
                    break;
                case "LineString":
                    switch(geometryb.type){
                        case "Point":
                            for(var i = 1; i < geometrya.coordinates.length; i++){
                                if(_pointOnEdge([geometrya.coordinates[i -1],geometrya.coordinates[i]], geometryb.coordinates))return true;
                            }
                            return false;
                            break;
                        case "MultiPoint":
                            for(var i =0; i < geometryb.coordinates.length; i++){
                                if(!contains(geometrya, new jsgeom.geometry.Geometry("Point", geometryb.coordinates[i])))return false;
                            }
                            return true;
                            break;
                        case "LineString":
                            //This works but there must be a better way of solving
                            var firstIndex;
                            var lastIndex;
                            //Check which direction line two traverses line one;
                            for(var j = 1; i < geometrya.coordinates.length; j++){
                                    if(_pointOnEdge([geometrya.coordinates[j -1],geometrya.coordinates[j]], geometryb.coordinates[0]))firstIndex = j-1;
                                    if(_pointOnEdge([geometrya.coordinates[j -1],geometrya.coordinates[j]], geometryb.coordinates[1]))lastIndex = j-1;
                            }
                            if(firstIndex<lastIndex){
                                if(lastIndex -firstIndex != 1){
                                    for(var i = firstIndex + 1; i <= lastIndex; i ++){
                                        if(!_pointOnEdge([geometrya.coordinates[i],geometrya.coordinates[i+1]], geometryb.coordinates[0]))return false;
                                        if(!_pointOnEdge([geometrya.coordinates[i],geometrya.coordinates[i+1]], geometryb.coordinates[1]))return false;
                                    }
                                }
                                for(var i = 2; j < geometryb.coordinates.length; i++)
                                {
                                    for(var j = 1; i < geometrya.coordinates.length; j++){
                                        if(_pointOnEdge([geometrya.coordinates[j -1],geometrya.coordinates[j]], geometryb.coordinates[0]))firstIndex = j-1;
                                        if(_pointOnEdge([geometrya.coordinates[j -1],geometrya.coordinates[j]], geometryb.coordinates[1]))lastIndex = j-1;
                                    }

                                }
                            }


                            var firstLineIndex;
                            var lastLineIndex;
                            //Calculate direction of travel down the parent line
                            for(var i = 0; i < geometryb.coordinates.length; i++){
                                

                                for(var j = 1; i < geometrya.coordinates.length; j++)                            {
                                    if(!_pointOnEdge([geometrya.coordinates[j -1],geometrya.coordinates[j]], geometryb.coordinates[i]))return false;
                                    else{
                                            firstLineIndex = (isNaN(firstLineIndex) || firstLineIndex > j-1)? j-1: firstLineIndex;
                                            lastLineIndex = j;
                                            if((lastLineIndex - firstLineIndex) > 1){
                                            for(var x = firstLineIndex; x < lastLineIndex -1; x++)
                                                {
                                                    if(!_pointOnEdge([geometrya.coordinates[x],geometrya.coordinates[x + 1]], geometryb.coordinates[i]))return false;
                                                }
                                            }
                                            firstLineIndex = lastLineIndex;
                                        }
                                    }
                                }
                            
                            return true;
                            break;
                        case "MultiLineString":
                            for(var i =0; i < geometryb.coordinates.length; i++){
                                for(var j =0; j < geometryb.coordinates[i].length; j++){
                                    if(!contains(geometrya,new jsgeom.geometry.Geometry("Point", geometryb.coordinates[i][j])))return false;
                                }
                            }
                            return true;
                            break;
                        case "Polygon":
                            throw "Invalid geometry for method";
                            break;
                        case "MultiPolygon":
                            throw "Invalid geometry for method";
                            break;
                        case "GeometryCollection":
                            for(var i = 0; i < geometryb.geometries.length; i++){
                                if(!contains(geometrya, geometryb.geometries[i]))return false;
                            }
                            return true;
                            break;
                        default:
                            return false;
                            break;
                    }
                break;
                case "MultiLineString":
                    throw "Function not implemented for this type"
                    break;
                case "Polygon":
                    switch(geometryb.type){
                        case "Point":
                            //Check that the goemetry is within the exterior ring
                            if(_pointInSimplePolygon(geometrya, geometryb))
                            {
                                //If the geometry has holes (interior rings) we check that the point is not in one of these.
                                for(var i = 1; i < geometrya.coordinates.length; i++)   {
                                    if(_pointInSimplePolygon(new jsgeom.geometry.Geometry("Polygon", [geometrya.coordinates[i]]),geometryb))  return false;
                                }
                                return true;
                            }
                            return false;
                            break;
                        case "MultiPoint":
                            for(var i =0; i < geometryb.coordinates.length; i++ ){
                                if(!contains(geometrya, new jsgeom.geometry.Geometry("Point", geometryb.coordinates[i])))return false;
                            }
                            return true;
                            break;
                        case "LineString":
                            for(var i = 0; i < geometryb.coordinates.length; i++){
                                if(!contains(geometrya, new jsgeom.geometry.Geometry("Point", geometryb.coordinates[i]))) return false;
                            }
                            return true;
                            break;
                        case "MultiLineString":
                            for(var i = 0; i < geometryb.coordinates; i++){
                                if(!contains(geometrya, new jsgeom.geometry.Geometry("LineString", geometryb.coordinates[i])))return false;
                            }
                            return true;
                            break;
                        case "Polygon":
                            if(!contains(geometrya, new jsgeom.geometry.Geometry("LineString", geometryb.coordinates[0]))) return false;
                            else if(geometrya.coordinates.length > 1){                                
                                for(var i = 1; i < geometrya.coordinates.length; i ++){
                                    for(var j = 0; j<geometrya.coordinates[i].length; j++){
                                        if(contains(geometryb, new jsgeom.geometry.Geometry("Point", geometrya.coordinates[i][j]))) return false;
                                    }
                                }                                
                            }
                            return true;
                            break;
                        case "MultiPolygon":
                            for(var i = 0; i < geometryb.coordinates.length; i++){
                                if(!contains(geometrya, new jsgeom.geometry.Geometry("Polygon", geometryb.coordinates[i])))return false;
                            }
                            return true;
                            break;
                        case "GeometryCollection":
                            for(var i = 0; i < geometryb.geometries.length; i++){
                                if(!contains(geometrya, geometryb.geometries[i])){
                                    return false;
                                }
                            }
                            return true;
                            break;
                        default:
                            return false;
                            break;
                    }
                    break;   
                case "MultiPolygon":
                    throw "Function not implemented for this type"
                    /*for(var i = 0; i < geometrya.coordinates.length; i++){
                         if(contains(new jsgeom.geometry.Geometry("Polygon",geometrya.coordinates[i]), geometryb)) return true;
                    }
                    return false;*/
                    break;
                case "GeometryCollection":
                    throw "Function not implemented for this type"
                    break;
            }
        }
        return {
            contains : contains
        }
    })();

    //private function for calculating mbr
    function _getMbr(coordinates){
        minX = coordinates[0][0];
        maxX = minX;
        minY = coordinates[0][1];
        maxY = minY;
        for(var i = 1; i < coordinates.length; i ++){
            minX = (coordinates[i][0] < minX)?coordinates[i][0]: minX;
            minY = (coordinates[i][1] < minX)?coordinates[i][1]: minY;
            maxX = (coordinates[i][0] > maxX)?coordinates[i][0]: maxX;
            maxY = (coordinates[i][1] > maxY)?coordinates[i][1]: maxY;
        }
        return new jsgeom.geometry.Polygon([[[minX,minY],[minX,maxY],[maxX,maxY],[maxX,minY],[minX,minY]]]);
    }

    function getMbr(geometry){
        var coordinates = new Array();
        switch(geometry.type)
        {
            case "point":
                coordinates = [geometry.coordinates];
                break;
            case "LineString":
                coordinates = geometry.coordinates;
                break;
            case "Polygon":
                coordinates = geometry.coordinates[0];
                break;
        }
        return _getMbr(coordinates);
    }
    
    return {
        geometry : geometry,
        operations : operations
    }
})();
