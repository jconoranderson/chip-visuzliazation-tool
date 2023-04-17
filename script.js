var vaccination_data = [];

$.ajax({
  url: "https://health.data.ny.gov/resource/nvtm-yit2.json",
  type: "GET",
  data: {
    "$limit" : 5000,
    "$$app_token" : 'aGFbKDOg0gCeCm2c9Od2EsFjL'
  }
}).done(function(api_data) {
	//console.log(api_data)
  vaccination_data = api_data;
  
//  console.log(vaccination_data[0]['schoolname'])
  update_table();
  update_chart();
});

var vaxData = document.getElementById('vaxData');

const cell_keys = ['county', 'schoolname', 'percentcompletelyimmunized'];

function create_element(tag, attributes, children = []) {
  const element = Object.assign(document.createElement(tag), attributes);
  element.append(...children);
//  console.log(element)
  return element;
}

function create_row_element(item) {
  return create_element(
    'tr', {},
    cell_keys.map( (key) => create_element('td', { innerHTML: item[key] }) )
  );
}

function update_table() {
  vaxData.innerHTML = '';
  vaxData.append(...vaccination_data.map(create_row_element));
}

function update_chart(){
  console.log(vaccination_data)
  
/*   var currentSeries = [{
                name: vaccination_data[0]['schoolname'],
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }] */
}

var currentSeries = [
							{
                name: 'Completely Immunized',
                data: [97.3, 86.3, 100]
              },
              {
                name: 'Immunized Polio',
                data: [99.5, 89, 99]
              },
              ]

var myChartOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Vaccination Record'
  },
  xAxis: {
    categories: ['IMMACULATE CONCEPTION', 'LA SALLE ACADEMY', 'ST GEORGE ACADEMY']
  },
  yAxis: {
    title: {
      text: 'Percent Complete',
    },
    max : 100
  },
	series: currentSeries
}

function drawMyChart() {
//        const chart = Highcharts.chart('container', {
	// Tell the 'Highcharts' library to draw a 'chart' in 'container' using the options I specify in myChartOptions (above)
  Highcharts.chart('container', myChartOptions);
}
// Tell the document (the browser window) to listen for an event, namely when the DOM is fully loaded, and then run my 'drawMyChart' function
//document.addEventListener('DOMContentLoaded', drawMyChart);
drawMyChart();
//myChartOptions.series[1].data = [15, 17, 13];
//drawMyChart();