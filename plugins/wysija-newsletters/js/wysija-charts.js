var RColor=function(){this.hue=Math.random(),this.goldenRatio=0.618033988749895};RColor.prototype.hsvToRgb=function(e,n,l){var o=Math.floor(e*6),j=e*6-o,d=l*(1-n),c=l*(1-j*n),m=l*(1-(1-j)*n),a=255,i=255,k=255;switch(o){case 0:a=l,i=m,k=d;break;case 1:a=c,i=l,k=d;break;case 2:a=d,i=l,k=m;break;case 3:a=d,i=c,k=l;break;case 4:a=m,i=d,k=l;break;case 5:a=l,i=d,k=c;break}return[Math.floor(a*256),Math.floor(i*256),Math.floor(k*256)]};RColor.prototype.get=function(c,a,d){this.hue+=this.goldenRatio;this.hue%=1;if(typeof a!=="number"){a=0.5}if(typeof d!=="number"){d=0.95}var b=this.hsvToRgb(this.hue,a,d);if(c){return"#"+b[0].toString(16)+b[1].toString(16)+b[2].toString(16)}else{return b}};var WysijaCharts={charts:[],chartsCount:0,current:null,getData:function(a){if(a===undefined){return false}jQuery.get(a,function(b){if(b.result.success===true&&b.result.data){this.current.dataProvider=b.result.data;this.current.validateData();return true}}.bind(this));return false},createChart:function(b,j){var h=null;switch(j.type){case"piechart":h=new AmCharts.AmPieChart();h.titleField=j.titleField;h.color="#333333";h.fontSize=12;h.valueField=j.valueField;h.sequencedAnimation=true;h.startEffect="elastic";h.innerRadius="30%";h.startDuration=0;h.labelRadius=15;if(j.threeD!==undefined){h.depth3D=10;h.angle=15}break;case"column":h=new AmCharts.AmSerialChart();h.categoryField=j.categoryField;h.color="#333333";h.fontSize=12;h.startDuration=0;h.plotAreaFillAlphas=0.2;if(j.threeD!==undefined){h.angle=30;h.depth3D=60}var f=h.categoryAxis;f.gridAlpha=0.2;f.gridPosition="start";f.gridColor="#AAAAAA";f.axisColor="#AAAAAA";f.axisAlpha=0.5;f.dashLength=5;var k=new AmCharts.ValueAxis();k.gridAlpha=0.2;k.gridColor="#AAAAAA";k.axisColor="#AAAAAA";k.axisAlpha=0.5;k.dashLength=5;k.title="Orders";k.titleColor="#999999";h.addValueAxis(k);if(j.graphs!==undefined){var a=j.graphs,m=null,c=new RColor();for(var e=0,g=a.length;e<g;e++){m=new AmCharts.AmGraph();m.title=a[e].title;m.valueField=a[e].valueField;m.type="column";m.lineAlpha=1;m.lineColor=a[e].color;m.fillAlphas=0.6;m.balloonText="[[value]]";h.addGraph(m);m=null}var d=new AmCharts.ChartCursor();d.zoomable=false;d.cursorAlpha=0;h.addChartCursor(d);var l=new AmCharts.AmLegend();h.addLegend(l)}break}if(j.title!==undefined){h.addTitle(j.title)}if(j.data!==undefined){h.dataProvider=j.data;h.validateData()}else{if(j.url!==undefined){this.getData(j.url,function(i){h.dataProvider=i}.bind(h))}else{alert("missing data provider");return false}}this.chartsCount=this.charts.push(h);this.charts[this.chartsCount-1].elementId=b;this.current=this.charts[this.chartsCount-1];this.current.write(this.current.elementId)}};