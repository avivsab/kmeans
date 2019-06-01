const express = require('express');
const app = express();
const engines = require('consolidate');
const csv = require('csv-array');
const kmeans = require('node-kmeans');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    
  csv.parseCSV('./ExampleMap.csv', function (data) {
    // console.log(data);
    const csvDataArray = data;
    const appleSizeArr = [];
    const applePosXArr = [];
    const applePosYArr = [];
    const appleColorArr = [];
    let applesDivs = '';
    let clustersBorders = '';
    csvDataArray.forEach((element, index) => {
      appleSizeArr.push(element.Size);
      applePosXArr.push(parseFloat(element.x_position));
      applePosYArr.push(parseFloat(element.y_position));
      appleColorArr.push(element.Color);
      applesDivs += `<div style="background-color: ${
        appleColorArr[index]
      }; width: ${appleSizeArr[index]}px; height: ${
        appleSizeArr[index]
      }px; border-radius: 50%; position: absolute; left: ${100 +
        applePosXArr[index]}px; bottom: ${100 +
        applePosYArr[index]}px; "></div>`;
    });

    let k = 1;
    applePosXArr.sort(function (a, b) {
      return a - b
    });
    applePosYArr.sort(function (a, b) {
      return a - b
    });
    for (let i = 0; i < applePosXArr.length; i++) {
      if (applePosXArr[i] - applePosXArr[i - 1] > 10) {
        k++;
      };
    };
    for (let i = 0; i < applePosYArr.length; i++) {
      if (applePosYArr[i] - applePosYArr[i - 1] > 10) {
        k++;
        // kYArr.push(applePosYArr[i]);
      };
    };

    let vectors = []
    for (let i = 0; i < csvDataArray.length; i++) {
      vectors[i] = [
        csvDataArray[i]['x_position'],
        csvDataArray[i]['y_position']
      ];
    };

    let currCluster,
    //   centerX,
    //   centerY,
      minX,
      minY,
      maxX,
      maxY,
      currPointX,
      currPointY;

    kmeans.clusterize(vectors, { k: k }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      };

      console.log('Found %i clusters', result.length);

      for (let i = 0; i < result.length; i++) {
        currCluster = result[i];
        // centerX = currCluster.centroid[0];
        // centerY = currCluster.centroid[1];

        // calc the cluster boundaries
        minX = Infinity;
        minY = Infinity;
        maxX = -Infinity;
        maxY = -Infinity;
        for (let j = 0; j < currCluster.cluster.length; ++j) {
          currPointX = currCluster.cluster[j][0];
          currPointY = currCluster.cluster[j][1];
          if (currPointX < minX) {
            minX = currPointX;
          };

          if (currPointX > maxX) {
            maxX = currPointX;
          };

          if (currPointY < minY) {
            minY = currPointY;
          };

          if (currPointY > maxY) {
            maxY = currPointY;
          };
        };

        // console.log(`Cluster ${i} has center at [${centerX}, ${centerY}] and boundary rect [x:${minX} y:${minY}, width:${maxX-minX}, height:${maxY-minY}]`);
        clustersBorders += `<div style='width: ${30 + maxX - minX}px; height: ${30 +
          maxY -
          minY}px; background-color: white;position: absolute; left: ${95 +
          minX}px; bottom:${95 +
          minY}px;' class='clustDiv'></div>`;
          
      }
      const title = ' Clusters Visualization';
      res.render(__dirname + '/routes/views/index.html', {
        title: title,
        applesDivs: applesDivs,
        applesBorders: clustersBorders
      });
    });
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app
