/* 
 * This javascript file contains all the tests required to check the jsgeom library
 */
var jsgeomTests = (function() {
    function Test(name, group, description, test){
        this.name = name;                           // test name
        this.group = group;                         //
        this.description = description;
        this.test = test;
        this.time = 0;
    }

    Test.prototype.executeTest = function() {
        var start = (new Date).getTime();
        var result = this.test();
        this.time = (new Date).getTime() - start;
 
        return result;
    };

    function TestResult(passed, message){
        this.passed = passed;
        this.message = message;
    }
    geometryTests = (function(){
        var tests = new Array();

        tests.push(new Test("Point type", "Point", "Test to see that points have the correct type", (function(){
            var point = new jsgeom.geometry.Geometry("Point",[100,200]);
            var typeTest = (point.type === "Point" );
            var message = (typeTest)?"First point returned valid type.":"First point returned invalid type.";
            return new TestResult(typeTest, message);
        })));
    
        tests.push(new Test("Point coordinate value", "Point", "Test to see that a new point returns the expected values", (function(){
            var point1 = new jsgeom.geometry.Geometry("Point",[100,200]);
            var point2 = new jsgeom.geometry.Geometry("Point",[12345.5434,2786345.1234567789]);
            var coordinateTest = (point1.coordinates[0] === 100 &  point1.coordinates[1] === 200);
            var message = (coordinateTest)?"First point returned correct coordinate.":"First point returned incorrect coordinate.";
            var coordinateTest2 = (point2.coordinates[0] === 12345.5434 &  point2.coordinates[1] === 2786345.1234567789);
            message += (coordinateTest2)?", Second point returned correct coordinate.":", Second point returned incorrect coordinate.";
            return new TestResult(coordinateTest && coordinateTest2, message);
        })));

        tests.push(new Test("MultiPoint type", "MultiPoint","Test to see that points have the correct type", (function(){
            var multiPoint = new jsgeom.geometry.Geometry("MultiPoint",[[100,200],[500,600],[800,100]]);
            var typeTest = (multiPoint.type === "MultiPoint" );
            var message = (typeTest)?"First MultiPoint returned valid type.":"First MultiPoint returned invalid type.";
            return new TestResult(typeTest, message);
        })));

        tests.push(new Test("MultiPoint coordinate value", "MultiPoint","Test to see that a new MultiPoint returns the expected values", (function(){
            var multiPoint1 = new jsgeom.geometry.Geometry("MultiPoint",[[100,200],[500,600],[800,100]]);
            var multiPoint2 = new jsgeom.geometry.Geometry("MultiPoint",[[12345.5434,2786345.1234567789],[100,300]]);
            var coordinateTest1 = (multiPoint1.coordinates[0][0] === 100 &  multiPoint1.coordinates[0][1] === 200 & multiPoint1.coordinates[2][0] === 800);
            var message = (coordinateTest1)?"First MultiPoint returned correct coordinates.":"First MultiPoint returned incorrect coordinates.";
            var coordinateTest2 = (multiPoint2.coordinates[0][0] === 12345.5434 &  multiPoint2.coordinates[0][1] === 2786345.1234567789 &  multiPoint2.coordinates[1][1] === 300);
            message += (coordinateTest2)?", Second MultiPoint returned correct coordinate.":", Second MultiPoint returned incorrect coordinate.";
            return new TestResult(coordinateTest1 && coordinateTest2, message);
        })));
                                  
        tests.push(new Test("LineString type", "LineString","Test to see that lineString have the correct type", (function(){
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[0,400],[400,400]]);
            var typeTest = (lineString.type == "LineString" );
            var message = (typeTest)?"First LineString returned valid type.":"First LineString returned invalid type.";
            return new TestResult(typeTest, message);
        })));


        tests.push(new Test("LineString coordinate values", "LineString","Test to see that a new lineString returns the expected values", (function(){
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[0,400],[400,400]]);
            var coordinateTest = (lineString.coordinates[0][0] === 0 &&  lineString.coordinates[2][0] === 400);
            var message = (coordinateTest)?"First polygon returned correct coordinates.":"First polygon returned incorrect coordinates.";
            return new TestResult(coordinateTest, message);
        })));

        tests.push(new Test("MultiLineString type", "MultiLineString","Test to see that MultLineString have the correct type", (function(){
            var multiLineString = new jsgeom.geometry.Geometry("MultiLineString",[[[0,0],[0,400],[400,400]],[[80,20],[30,40],[500,700]]]);
            var typeTest = (multiLineString.type === "MultiLineString" );
            var message = (typeTest)?"First MultiLineString returned valid type.":"First MultiLineString returned invalid type.";
            return new TestResult(typeTest, message);
        })));

        tests.push(new Test("MultiLineString coordinate values", "MultiLineString","Test to see that a new MultiLineString returns the expected values", (function(){
            var multiLineString = new jsgeom.geometry.Geometry("MultiLineString",[[[0,0],[0,400],[400,400]],[[80,20],[30,40],[500,700]]]);
            var coordinateTest = (multiLineString.coordinates[0][0][0] === 0 &  multiLineString.coordinates[0][2][0] === 400 & multiLineString.coordinates[1][2][1] === 700);
            var message = (coordinateTest)?"First polygon returned correct coordinates.":"First polygon returned incorrect coordinates.";
            return new TestResult(coordinateTest, message);
        })));

        tests.push(new Test("Polygon type", "Polygon","Test to see that polygons have the correct type", (function(){
            var polygon = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,400],[400,400],[400,0],[0,0]]]);
            var typeTest = (polygon.type === "Polygon" );
            var message = (typeTest)?"First polygon returned valid type.":"First polygon returned invalid type.";
            return new TestResult(typeTest, message);
        })));

        tests.push(new Test("Polygon coordinate values", "Polygon","Test to see that a new polygon returns the expected values", (function(){
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,400],[400,400],[400,0],[0,0]]]);
            var polygon2 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,400],[400,400],[400,0],[0,0]],[[100,100],[100,300],[300,300],[300,100],[100,100]]]);
            var coordinateTest1 = (polygon1.coordinates[0][0][0] === 0 &  polygon1.coordinates[0][3][0] === 400);
            var message = (coordinateTest1)?"First polygon returned correct coordinates.":"First polygon returned incorrect coordinates.";
            var coordinateTest2 = (polygon2.coordinates[0][0][0] === 0 &  polygon2.coordinates[0][3][0] === 400 & polygon2.coordinates[1][3][0] === 300 );
            message += (coordinateTest2)?", Second polygon returned correct coordinates.":", Second polygon returned incorrect coordinates.";
            return new TestResult(coordinateTest1 && coordinateTest2, message);
        })));

        tests.push(new Test("MultiPolygon type", "MultiPolygon","Test to see that MultiPolygons have the correct type", (function(){
            var multiPolygon = new jsgeom.geometry.Geometry("MultiPolygon",[[[0,0],[0,400],[400,400],[400,0],[0,0]],[[500,800],[90000,4000],[4090,4090],[4700,5000],[0,0]]]);
            var typeTest = (multiPolygon.type === "MultiPolygon" );
            var message = (typeTest)?"First MultiPolygons returned a valid type.":"First MultiPolygon returned a invalid type.";
            return new TestResult(typeTest, message);
        })));

        tests.push(new Test("MultiPolygon coordinate values", "MultiPolygon","Test to see that a new MultiPolygon returns the expected values", (function(){
            var multiPolygon1 = new jsgeom.geometry.Geometry("MultiPolygon",[[[[0,0],[0,400],[400,400],[400,0],[0,0]]],[[[500,800],[90000,4000],[4090,4090],[4700,5000],[0,0]]]]);
            var multiPolygon2 = new jsgeom.geometry.Geometry("MultiPolygon",[[[[0,0],[0,400],[400,400],[400,0],[0,0]],[[100,100],[100,300],[300,300],[300,100],[100,100]]]]);
            var coordinateTest1 = (multiPolygon1.coordinates[0][0][0][0] === 0 &  multiPolygon1.coordinates[0][0][3][0] === 400);
            var message = (coordinateTest1)?"First MultiPolygon returned correct coordinates.":"First MultiPolygon returned incorrect coordinates.";
            var coordinateTest2 = (multiPolygon2.coordinates[0][0][0][0] === 0 &  multiPolygon2.coordinates[0][0][3][0] === 400 & multiPolygon2.coordinates[0][1][3][0] === 300 );
            message += (coordinateTest2)?", Second MultiPolygon returned correct coordinates.":", Second MultiPolygon returned incorrect coordinates.";
            return new TestResult(coordinateTest1 && coordinateTest2, message);
        })));

        tests.push(new Test("GeometryCollection type", "GeometryCollection","Test to see that GeometryCollection has the correct type", (function(){
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[0,400],[400,400]]);
            var multiPoint = new jsgeom.geometry.Geometry("MultiPoint",[[100,200],[500,600],[800,100]]);
            var multiPolygon = new jsgeom.geometry.Geometry("Polygon",[[[[0,0],[0,400],[400,400],[400,0],[0,0]]],[[[500,800],[90000,4000],[4090,4090],[4700,5000],[0,0]]]]);
            var geometryCollection = new jsgeom.geometry.GeometryCollection([lineString, multiPoint, multiPolygon]);
            var typeTest = (geometryCollection.type === "GeometryCollection" );
            var message = (typeTest)?"First geometryCollection returned a valid type.":"First geometryCollection returned a invalid type.";
            return new TestResult(typeTest, message);
        })));

        tests.push(new Test("GeometryCollection coordinate values", "GeometryCollection","Test to see that a new GeometryCollection returns the expected values", (function(){
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[0,400],[400,400]]);
            var multiPoint = new jsgeom.geometry.Geometry("MultiPoint",[[100,200],[500,600],[800,100]]);
            var multiPolygon = new jsgeom.geometry.Geometry("MultiPolygon",[[[[0,0],[0,400],[400,400],[400,0],[0,0]]],[[[500,800],[90000,4000],[4090,4090],[4700,5000],[0,0]]]]);
            var geometryCollection = new jsgeom.geometry.GeometryCollection([lineString,multiPoint,multiPolygon]);
            var geometryTest = (geometryCollection.geometries[0].type === "LineString" && geometryCollection.geometries[2].type === "MultiPolygon" && geometryCollection.geometries[2].coordinates[0][0][3][0] === 400 );
            var message = (geometryTest)?"GeometryCollection returned correct geometry objects.":"GeometryCollection returned incorrect geometry objects.";
            return new TestResult(geometryTest, message);
        })));
        return tests;

    })();
   

    operationsTests =(function(){
        var tests = new Array();
        tests.push(new Test("Point contains Point", "Contains", "Test to see that contains function works when given a point and another point.", (function(){
            var point1 = new jsgeom.geometry.Geometry("Point", [500,500]);
            var point2 = new jsgeom.geometry.Geometry("Point",[0,400]);
            var point3 = new jsgeom.geometry.Geometry("Point",[500,500]);
            var pointInPoint= (jsgeom.operations.contains(point3, point1)===true);
            var pointNotInPoint = (jsgeom.operations.contains( point2, point1)===false);
            var message = (pointInPoint)?"Correct result when point is on point.":"Incorrect result when point is on point.";
            message += (pointNotInPoint)?", Correct result when point is outside point.":", Incorrect result when point is outside point.";
            return new TestResult(pointInPoint & pointNotInPoint, message);
        })));

        tests.push(new Test("MultiPoint contains Point", "Contains", "Test to see that contains function works when given a MultiPoint and another point.", (function(){
            var point1 = new jsgeom.geometry.Geometry("Point", [500,500]);
            var point2 = new jsgeom.geometry.Geometry("Point",[0,400]);
            var multiPoint = new jsgeom.geometry.Geometry("MultiPoint",[[500,500],[800,300],[400,10]]);
            var pointInMultiPoint= (jsgeom.operations.contains(multiPoint, point1)===true);
            var pointNotInMultiPoint = (jsgeom.operations.contains( multiPoint, point2)===false);
            var message = (pointInMultiPoint)?"Correct result when point is in MultiPoint.":"Incorrect result when point is in MultiPoint.";
            message += (pointNotInMultiPoint)?", Correct result when point is outside MultiPoint.":", Incorrect result when point is outside MultiPoint.";
            return new TestResult(pointInMultiPoint & pointNotInMultiPoint, message);
        })));

        tests.push(new Test("Polygon contains Point", "Contains", "Test to see that contains function works when given a point and a polygon.", (function(){
            var point1 = new jsgeom.geometry.Geometry("Point", [500,500]);
            var point2 = new jsgeom.geometry.Geometry("Point",[0,400]);
            var point3 = new jsgeom.geometry.Geometry("Point",[501,30]);
            var point4 = new jsgeom.geometry.Geometry("Point",[100,100]);
            var point5 = new jsgeom.geometry.Geometry("Point",[40,50]);
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]]]);
            var polygon2 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var point1InPolyonTest= (jsgeom.operations.contains(polygon1, point1)===true);
            var point2InPolyonTest = (jsgeom.operations.contains( polygon1, point2)===true);
            var point3OutsidePolyonTest = (jsgeom.operations.contains(polygon1, point3)===false);
            var point5InsideInteriorRing= (jsgeom.operations.contains(polygon2, point5)===false);
            var point3OutsidePolygon = (jsgeom.operations.contains(polygon2, point3)===false);
            var pointInPolygonOutsideInteriorRing= (jsgeom.operations.contains(polygon2, point4)===true);
            var message = ((point1InPolyonTest & point1InPolyonTest)?"Correct":"Incorrect") + " result when point is in polygon.";
            message += ((point3OutsidePolyonTest)?", Correct":", Incorrect") + " result when point is outside polygon.";
            message += ((point5InsideInteriorRing)?", Correct":",Incorrect") +"result when point is in polygon but also inside a hole in the polygon.";
            message += ((point3OutsidePolygon)?", Correct":", Incorrect") + " result when point is outside the polygon.";
            message += ((pointInPolygonOutsideInteriorRing)?", Correct":", Incorrect") + "result when point is in the polygon but not in a hole.";
            return new TestResult(point1InPolyonTest & point2InPolyonTest & point3OutsidePolyonTest & point5InsideInteriorRing & point3OutsidePolygon & pointInPolygonOutsideInteriorRing, message);
        })));

        tests.push(new Test("Polygon contains LineString", "Contains", "Test to see that contains function works when given a LineString and a polygon.", (function(){
            var lineString1 = new jsgeom.geometry.Geometry("LineString",[[0,500],[500,500],[250,0]]);
            var lineString2 = new jsgeom.geometry.Geometry("LineString",[[50,30],[300,300],[600,200]]);
            var lineString3 = new jsgeom.geometry.Geometry("LineString",[[50,30],[300,300],[22,80]]);
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]]]);
            var polygon2 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var lineInPolyonTest = (jsgeom.operations.contains(polygon1, lineString1)===true);
            var lineGoesOutOfPolyonTest = (jsgeom.operations.contains(polygon1, lineString2)===false);
            var lineInPolyon2Test = (jsgeom.operations.contains( polygon2, lineString1)===true);
            var lineGoesOutOfPolyon2Test = (jsgeom.operations.contains(polygon2, lineString2)===false);
            var lineGoesIntoHolePolyon2Test = (jsgeom.operations.contains(polygon2, lineString3)===false);
            var message = ((lineInPolyonTest)?"Correct":"Incorrect")+" result when line is in polygon.";
            message += ((lineGoesOutOfPolyonTest)?", Correct":", Incorrect")+" result when line is only partialty inside polygon.";
            message += ((lineInPolyon2Test)?", Correct":", Incorrect")+" result when line is in polygon.";
            message += ((lineGoesOutOfPolyon2Test)?", Correct":", Incorrect")+ " result when line is only partialty inside polygon.";
            message += ((lineGoesIntoHolePolyon2Test)?", Correct":", Incorrect")+" result when line is goes into a hole in polygon.";
            return new TestResult(lineInPolyonTest & lineGoesOutOfPolyonTest & lineInPolyon2Test & lineGoesOutOfPolyon2Test & lineGoesIntoHolePolyon2Test, message);
        })));

        tests.push(new Test("Polygon contains Polygon", "Contains", "Test to see that contains function works when given a Polygon and a Polygon.", (function(){
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,400],[400,400],[500,0],[0,0]]]);
            var polygon2 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[600,500],[500,0],[0,0]]]);
            var polygon3 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]]]);
            var polygon4 = new jsgeom.geometry.Geometry("Polygon",[[[50,80],[50,400],[400,500],[50,500],[50,80]]]);
            var polygon5 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,400],[400,400],[500,0],[0,0]],[[8,8],[8,100],[100,100],[100,8],[8,8]]]);
            var polygon6 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var polygonInPolyonTest = (jsgeom.operations.contains( polygon3, polygon1)===true);
            var polygonGoesOutOfPolyonTest = (jsgeom.operations.contains(polygon3, polygon2)===false);
            var polygonInPolyon6Test = (jsgeom.operations.contains(polygon6, polygon4)===true);
            var polygonGoesOverAHolePolyonTest = (jsgeom.operations.contains( polygon6, polygon1)===false);
            var polygonGoesOverAHoleButHasItOwnLargerHolePolyonTest = (jsgeom.operations.contains( polygon6, polygon5)===true);
            var message = ((polygonInPolyonTest)?"Correct":"Incorrect")+" result when polygon is in polygon.";
            message += ((polygonGoesOutOfPolyonTest)?", Correct":", Incorrect")+" result when polygon is only partialty inside polygon.";
            message += ((polygonInPolyon6Test)?", Correct":", Incorrect") +" result when polygon is in polygon but not breaching any holes.";
            message += ((polygonGoesOverAHolePolyonTest)?", Correct":", Incorrect")+" result when polygon is in polygon but breaching a hole";
            message += ((polygonGoesOverAHoleButHasItOwnLargerHolePolyonTest)?", Correct":", Incorrect") +" result when polygon is in polygon with larger hole over hole.";
            return new TestResult(polygonInPolyonTest & polygonGoesOutOfPolyonTest & polygonInPolyon6Test & polygonGoesOverAHolePolyonTest & polygonGoesOverAHoleButHasItOwnLargerHolePolyonTest, message);
        })));

        tests.push(new Test("Polygon contains MultiPoints.", "Contains", "Test to see that contains function works when given MultiPoints and a Polygon with holes.", (function(){
            var multiPoints1 = new jsgeom.geometry.Geometry("MultiPoint",[[200,201],[200,400],[400,400],[500,100]]);
            var multiPoints2 = new jsgeom.geometry.Geometry("MultiPoint",[[200,201],[200,400],[400,400],[500,700]]);
            var multiPoints3 = new jsgeom.geometry.Geometry("MultiPoint",[[200,201],[200,400],[400,400],[20,30]]);
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var multiPointsWithinInPolyonTest = (jsgeom.operations.contains(polygon1, multiPoints1)===true);
            var multiPointsOutsidePolyonTest = (jsgeom.operations.contains( polygon1, multiPoints2)===false);
            var multiPointsInPolyonTestButInHole = (jsgeom.operations.contains( polygon1, multiPoints3)===false);
            var message = ((multiPointsWithinInPolyonTest)?"Correct":"Incorrect")+" result when multiPoints are in polygon but not breaching any holes.";
            message += ((multiPointsOutsidePolyonTest)?", Correct":", Incorrect")+" result when multiPoints are outside the polygon but not breaching any holes.";
            message += ((multiPointsInPolyonTestButInHole)?", Correct":", Incorrect")+"  result when multiPoints are outside the a point in multipoint is a hole.";
            return new TestResult(multiPointsWithinInPolyonTest & multiPointsOutsidePolyonTest & multiPointsInPolyonTestButInHole, message);
        })));

        tests.push(new Test("Polygon contains MultiLineString.", "Contains", "Test to see that contains function works when given MultiLineString and a Polygon with holes.", (function(){
            var multiLineString1 = new jsgeom.geometry.Geometry("MultiLineString",[[[0,500],[500,500],[250,0]],[[15,100],[50,100],[85,90]]]);
            var multiLineString2 = new jsgeom.geometry.Geometry("MultiLineString",[[[50,30],[300,300],[600,200]],[[10,100],[24,50],[75,80]]]);
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var multiLineWithinPolyonTest = (jsgeom.operations.contains(polygon1, multiLineString1 )===true);
            var multiLineOutsidePolyonTest = (jsgeom.operations.contains(polygon1, multiLineString2 )===false);
            var message = ((multiLineWithinPolyonTest)?"Correct":"Incorrect")+" result when multiLineStrings are in polygon but not breaching any holes.";
            message += ((multiLineOutsidePolyonTest)?"Correct":"Incorrect")+" result when a point in a multiLineString is outside of a polygon.";
            return new TestResult(multiLineWithinPolyonTest & multiLineOutsidePolyonTest, message);
        })));

        tests.push(new Test("Polygon contains MultiPolygon.", "Contains", "Test to see that contains function works when given MultiPolygon and a Polygon with holes.", (function(){
            var multiPolygon1 = new jsgeom.geometry.Geometry("MultiPolygon",[[[[50,80],[50,400],[400,500],[50,500],[50,80]]],[[[0,0],[0,400],[400,400],[500,0],[0,0]],[[8,8],[8,100],[100,100],[100,8],[8,8]]]]);
            var multiPolygon2 = new jsgeom.geometry.Geometry("MultiPolygon",[[[[0,0],[50,400],[400,700],[50,700],[0,0]]],[[[0,0],[0,400],[400,400],[500,0],[0,0]],[[8,8],[8,100],[100,100],[100,8],[8,8]]]]);
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var multiPolygonWithinPolyonTest = (jsgeom.operations.contains(polygon1, multiPolygon1 )===true);
            var multiPolygonPartiallyPolyonTest = (jsgeom.operations.contains(polygon1, multiPolygon2 )===false);
            var message = ((multiPolygonWithinPolyonTest)?"Correct":"Incorrect")+" result when all polygons are contained within polygon.";
            message += ((multiPolygonPartiallyPolyonTest)?"Correct":"Incorrect")+" result when not all polygons are completed contained within polygon.";
            return new TestResult(multiPolygonWithinPolyonTest & multiPolygonPartiallyPolyonTest, message);
        })));

        tests.push(new Test("Polygon contains GeometryCollection", "Contains", "Test to see that contains function works when given a GeometryCollection and a polygon with holes.", (function(){
            var lineString1 = new jsgeom.geometry.Geometry("LineString",[[0,500],[500,500],[250,300]]);
            var lineString2 = new jsgeom.geometry.Geometry("LineString",[[50,30],[300,300],[600,200]]);
            var polygon1 = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[10,10],[20,20],[20,80],[40,80],[45,10],[10,10]]]);
            var polygon2 = new jsgeom.geometry.Geometry("Polygon",[[[50,80],[50,400],[400,500],[50,500],[50,80]]]);
            var point1 = new jsgeom.geometry.Geometry("Point",[200,300]);
            var geomCollection1 = new jsgeom.geometry.GeometryCollection([lineString1,polygon2,point1]);
            var geomCollectionInsidePolyonTest = (jsgeom.operations.contains( polygon1, geomCollection1)===true);
            geomCollection1.geometries.push(lineString2);
            var geomCollectionOutsidePolyonTest = (jsgeom.operations.contains(polygon1, geomCollection1)===false);
            var message = ((geomCollectionInsidePolyonTest)?"Correct":"Incorrect") +" result when all geometries are within the polygon1.";
            message += ((geomCollectionOutsidePolyonTest)?", Correct":", Incorrect")+" result when a geometry in a collection is outside the polygon1.";
            return new TestResult(geomCollectionInsidePolyonTest & geomCollectionOutsidePolyonTest, message);
        })));

        tests.push(new Test("LineString contains Point", "Contains", "Test to see that contains function works when given a point and a LineString.", (function(){
            var point = new jsgeom.geometry.Geometry("Point", [500,400]);
            var point1 = new jsgeom.geometry.Geometry("Point",[250,250]);
            var point2 = new jsgeom.geometry.Geometry("Point",[501,30]);
            var lineString1 = new jsgeom.geometry.Geometry("LineString",[[0,0],[500,500],[500,0],[600,0],[250,250]]);
            var pointOnVertex= (jsgeom.operations.contains(lineString1, point)===true);
            var pointOnEdge = (jsgeom.operations.contains( lineString1, point1)===true);
            var pointOutsideLineString = (jsgeom.operations.contains(lineString1, point2)===false);
            var message = ((pointOnVertex & pointOnEdge)?"Correct":"Incorrect")+"  result when point is on LineString.";
            message += ((pointOutsideLineString)?", Correct":", Incorrect")+" result when point is not on LineString.";
            return new TestResult(pointOnVertex & pointOnEdge & pointOutsideLineString, message);
        })));

        tests.push(new Test("LineString contains LineString", "Contains", "Test to see that contains function works when given a LineString and a LineString.", (function(){
            var lineString1 = new jsgeom.geometry.Geometry("LineString",[[250,250],[500,500],[500,400]]);
            var lineString2 = new jsgeom.geometry.Geometry("LineString",[[250,250],[500,500],[700,400]]);
            var lineString3 = new jsgeom.geometry.Geometry("LineString",[[250,250],[350,350],[500,400]]);
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[500,500],[500,0],[600,0],[250,250]]);
            var lineOnLine= (jsgeom.operations.contains(lineString, lineString1)===true);
            var lineNotOnLine2 = (jsgeom.operations.contains(lineString, lineString3)===false);
            var lineNotOnLine= (jsgeom.operations.contains(lineString, lineString2)===false);
            var message = ((lineOnLine)?"Correct":"Incorrect")+" result when LineString is on LineString.";
            message += ((lineNotOnLine)?", Correct":"Incorrect")+" result when LineString is not on LineString.";
            message += ((lineNotOnLine2)?"Correct":"Incorrect")+" result when points on LineString but not the hole LineString.";
            return new TestResult(lineOnLine & lineNotOnLine & lineNotOnLine2, message);
        })));

        tests.push(new Test("LineString contains MultiPoint", "Contains", "Test to see that contains function works when given MultiPoint and a LineString.", (function(){
            var multiPoint1 = new jsgeom.geometry.Geometry("MultiPoint",[[250,250],[500,500],[550,0]]);
            var multiPoint2 = new jsgeom.geometry.Geometry("MultiPoint",[[250,250],[500,500],[700,400]]);
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[500,500],[500,0],[600,0],[250,250]]);
            var pointsOnLine= (jsgeom.operations.contains(lineString, multiPoint1)===true);
            var pointsNotOnLine= (jsgeom.operations.contains(lineString, multiPoint2)===false);
            var message = ((pointsOnLine)?"Correct":"Incorrect")+" result when all Points are on LineString.";
            message += ((pointsNotOnLine)?"Correct":"Incorrect")+" result when not all Points are on LineString.";
            return new TestResult(pointsOnLine & pointsNotOnLine, message);
        })));

        tests.push(new Test("LineString contains MultiLineString", "Contains", "Test to see that contains function works when given MultiLineString and a LineString.", (function(){
            var multiLineString1 = new jsgeom.geometry.Geometry("MultiLineString",[[[250,250],[500,500],[500,400]],[[250,250],[500,500],[500,300]]]);
            var multiLineString2 = new jsgeom.geometry.Geometry("MultiLineString",[[[250,250],[500,500],[500,400]],[[250,250],[500,500],[700,400]]]);
            var lineString = new jsgeom.geometry.Geometry("LineString",[[0,0],[500,500],[500,0],[600,0],[250,250]]);
            var pointsOnLine= (jsgeom.operations.contains(lineString, multiLineString1)===true);
            var pointsNotOnLine= (jsgeom.operations.contains(lineString, multiLineString2)===false);
            var message = ((pointsOnLine)?"Correct":"Incorrect")+" result when all Points are on LineString.";
            message += ((pointsNotOnLine)?"Correct":"Incorrect")+" result when not all Points are on LineString.";
            return new TestResult(pointsOnLine & pointsNotOnLine, message);
        })));

        tests.push(new Test("Exception Point Contains Polygon", "Contains", "Tests that an exception is thrown of type 'Invalid geometry for method' if contains point contains geometry.", (function(){
            var point = new jsgeom.geometry.Geometry("Point",[40,30]);
            var polygon = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]]]);
            try{
                jsgeom.operations.contains(point, polygon);
                return new TestResult(false, "No exception thrown when testing for in polygon a point.");
            }
            catch(e){
                if(e=="Invalid geometry for method"){
                    return new TestResult(true,"Success.. Exception thrown when testing for in polygon a point.");
                }
                else{
                    return new TestResult(false, "Exception thrown, but not of type 'Invalid geometry for method'");
                }
            }
        })));

        tests.push(new Test("Exception MultiPoint Contains Polygon", "Contains", "Tests that an exception is thrown of type 'Invalid geometry for method' if contains MultiPoint contains geometry.", (function(){
            var multiPoint = new jsgeom.geometry.Geometry("MultiPoint",[[40,30],[50,50]]);
            var polygon = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]]]);
            try{
                jsgeom.operations.contains(multiPoint, polygon);
                return new TestResult(false,"No exception thrown when testing for in polygon a multiPoint.");
            }catch(e){
                if(e=="Invalid geometry for method"){
                    return new TestResult(true,"Success.. Exception thrown when testing for in polygon a multiPoint.");
                } else{
                    return new TestResult(false, "Exception thrown, but not of type 'Invalid geometry for method'");
                }
            }
        })));

        tests.push(new Test("Exception LineString Contains Polygon", "Contains", "Tests that an exception is thrown of type 'Invalid geometry for method' if lineString contains polygon.", (function(){
            var polygon = new jsgeom.geometry.Geometry("Polygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]]]);
            var lineString = new jsgeom.geometry.Geometry("LineString",[[40,30],[80,80],[70,50]]);
            try{
                jsgeom.operations.contains( lineString, polygon);
                return new TestResult(false,"No exception thrown when testing for in polygon a point.");
            }catch(e){
                if(e=="Invalid geometry for method"){
                    return new TestResult(true,"Success.. Exception thrown when testing for in polygon a point.");
                } else{
                    return new TestResult(false,"Exception thrown, but not of type 'Invalid geometry for method'");
                }
            }
        })));

        tests.push(new Test("Exception LineString Contains MultiPolygon", "Contains", "Tests that an exception is thrown of type 'Invalid geometry for method' if lineString contains MultiPolygon.", (function(){
            var multiPolygon = new jsgeom.geometry.Geometry("MultiPolygon",[[[0,0],[0,500],[500,500],[500,0],[0,0]],[[5000,1000],[5000,8000],[5000,5000],[5000,1000],[5000,1000]]]);
            var lineString = new jsgeom.geometry.Geometry("LineString",[[40,30],[80,80],[70,50]]);
            try{
                jsgeom.operations.contains( lineString, multiPolygon);
                return new TestResult(false,"No exception thrown when testing for in multiPolygon on LineString.");
            }catch(e){
                if(e=="Invalid geometry for method"){
                    return new TestResult(true,"Success.. Exception thrown when testing for in multiPolygon on LineString.");
                } else{
                    return new TestResult(false,"Exception thrown, but not of type 'Invalid geometry for method'");
                }
            }
        })));
                                  
        return tests;
    })();
    return {
        geometryTests : geometryTests,
        operationsTests : operationsTests
    }
})();

