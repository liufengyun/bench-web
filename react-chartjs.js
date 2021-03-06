var React = require('react');
var ReactDOM = require('react-dom');

function createClass(chartType, methodNames, dataKey) {
  var classData = {
    displayName: chartType + 'Chart',
    getInitialState: function() { return {}; },
    render: function() {
      var _props = {
        ref: 'canvass'
      };
      for (var name in this.props) {
        if (this.props.hasOwnProperty(name)) {
          if (name !== 'data' && name !== 'options') {
            _props[name] = this.props[name];
          }
        }
      }
      return React.createElement('canvas', _props);
    }
  };

  var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'];
  function extra(type) {
    classData[type] = function() {
      return this.state.chart[type].apply(this.state.chart, arguments);
    };
  }

  classData.componentDidMount = function() {
    this.initializeChart(this.props);
  };


  classData.componentWillUnmount = function() {
    var chart = this.state.chart;
    chart.destroy();
  };

  classData.componentWillReceiveProps = function(nextProps) {
    var chart = this.state.chart;

    chart.data = nextProps.data;

    // Updates Chart with new data
    chart.update();
  };

  classData.initializeChart = function(nextProps) {
    var Chart = require('chart.js');
    var el = ReactDOM.findDOMNode(this);
    var ctx = el.getContext("2d");

    var chart = new Chart(ctx, {
      type: chartType.toLowerCase(),
      data: nextProps.data,
      options: nextProps.options
    });

    this.state.chart = chart;
  };


  // return the chartjs instance
  classData.getChart = function() {
    return this.state.chart;
  };

  // return the canvass element that contains the chart
  classData.getCanvass = function() {
    return this.refs.canvass;
  };

  classData.getCanvas = classData.getCanvass;

  var i;
  for (i=0; i<extras.length; i++) {
    extra(extras[i]);
  }
  for (i=0; i<methodNames.length; i++) {
    extra(methodNames[i]);
  }

  return React.createClass(classData);
}

module.exports = {
  Line: createClass('Line', ['getPointsAtEvent']),
  Bar: createClass('Bar', ['getBarsAtEvent']),
  Bubble: createClass('Bubble', ['getPointsAtEvent']),
  Doughnut: createClass('Doughnut', ['getSegmentsAtEvent']),
  Pie: createClass('Pie', ['getSegmentsAtEvent']),
  PolarArea: createClass('PolarArea', ['getSegmentsAtEvent']),
  Radar: createClass('Radar', ['getPointsAtEvent']),
  Scatter: createClass('Scatter', ['getPointsAtEvent'])
}