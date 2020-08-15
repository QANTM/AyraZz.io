var geoCoordMap = {
    '南京':[118.8665,31.73574],
    '深圳':[113.8108,22.63944],
    '开封':[114.262778,34.838611],
    '上海':[121.334167,31.191944],
    '无锡':[120.455833,31.598333],
    '张家港':[120.672222,31.815556],
    '苏州':[120.645,31.421667],
};

var FData = [
    [{name:'南京'}, {name:'深圳',value:50}],
    [{name:'深圳'},{name:'上海',value:50}],
    [{name:'上海'},{name:'张家港',value:50}],
    [{name:'张家港'},{name:'苏州',value:50}],
    [{name:'苏州'},{name:'开封',value:50}],
    [{name:'开封'},{name:'无锡',value:50}],
    [{name:'无锡'},{name:'张家港',value:50}],
    [{name:'张家港'},{name:'上海',value:50}],
    [{name:'上海'}, {name:'南京',value:50}],
];

var ZData = [
    [{name:'深圳'},{name:'开封',value:50}]
];

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var color = ['#FF69B4', '#00CED1'];
var series = [];
[['', FData], ['', ZData],].forEach(function (item, i) {
    series.push({
        name: item[0] + ' .',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' ',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
        },
        lineStyle: {
            color: color[i],
            width: 1,
            opacity: 0.6,
            curveness: 0.2
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + '',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            show: true,
            position: 'right',
            formatter: '{b}'
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
            color: color[i]
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
        })
    });
});

option = {
    backgroundColor: '#708090',
    title : {
        text: 'Love Triangle in This Summer',
        subtext: 'a story of a couple',
        left: 'left',
        textStyle: {
            fontSize:30,
            color: '#FFB6C1'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: [],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },
    geo: {
        map: 'china',
        label: {
            show: true,
            textStyle:{
                fontSize:9
            }
        },
        roam: true,
        itemStyle: {
            areaColor: '#404a59',
            borderColor: '#000000'
        },

        emphasis: {
            label: {
                show: true
            },
            itemStyle: {
                areaColor: '#2a333d'
            }
        }
    },
    series: series
};