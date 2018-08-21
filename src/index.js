import './style.css';
import aos from 'aos'; //https://github.com/michalsnik/aos/tree/v2
import * as echarts from 'echarts/dist/echarts.js';
import * as ecStat from 'echarts-stat';
import Nguyen from './Nguyen.mp3';
import NguyenPhoto from './Nguyen.jpg';
import Rodriguez from './Rodriguez_clip.mp3';
import RodriguezPhoto from './Rodriguez.jpg';
import * as pym from 'pym.js';

var viewPortTag = document.createElement('meta');
viewPortTag.id = "viewport";
viewPortTag.name = "viewport";
viewPortTag.content="width=device-width, initial-scale-1";
document.getElementsByTagName('head')[0].appendChild(viewPortTag);

function header() {
	var header = document.createElement('section');
	header.id = "header";
	header.classList.add("wrapper-child");

	var title = document.createElement('H1');
	var t = document.createTextNode("A deeper dive into California's housing and homelessness crisis");
	title.appendChild(t);
	header.appendChild(title);

	var byline = document.createElement('p');
	byline.id = "byline";
	var t2 = document.createTextNode("By Victoria Cabales");
	byline.appendChild(t2);
	header.appendChild(byline);

	var info = document.createElement('p');
	var t3 = document.createTextNode("Over 134,000 Californians now face homelessness on any given night. Recent research conducted at UCLA found that there is a correlation between high cost of living and homelessness rates. As rents continue to rise, millions of low-income Californians struggle to meet ends meet, and many live on the edge of homelessness.");
	info.id = "info";
	info.appendChild(t3);
	header.appendChild(info);

	return header;
}

function resolveAfterTrigger() { /* async call for echarts */
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('resolved');
		}, 500);
	});
}

/* Chart 1 */
// % Change in Rent vs % Change in Renter Income
// https://lao.ca.gov/reports/2015/finance/housing-costs/housing-costs.aspx
// http://www.ppic.org/wp-content/uploads/r-118hjr.pdf
async function chart1(container) { // https://infogram.com/rents-vs-renter-income-1gk92ejnzq6vp16
	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	let option = null;
	option = {
	    title: {
	        text: 'Rent vs Renter Income',
					left: 'center'
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['% Change in Rent','% Change in Renter Income'],
					top: '6%'
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {
								title: 'save'
							}
	        }
	    },
	    xAxis: {
	        type: 'category',
					name: "Year",
					nameLocation: "middle",
					nameGap: 20,
	        boundaryGap: false,
	        data: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
	    },
	    yAxis: {
	        type: 'value',
					name: "% Change",
					nameGap: 30,
					nameLocation: "middle",
					axisLabel: {
						formatter: "{value}%"
					}
	    },
	    series: [
	        {
	            name:'% Change in Rent',
	            type:'line',
	            data:[0,3,6,9,12,15,18,20,22,24,24,20,21,22,24]
	        },
	        {
	            name:'% Change in Renter Income',
	            type:'line',
	            data:[0,-1,-2,-3,-5,-6,-5,-1,-2,-5,-7,-11,-10,-9,-7]
	        }
	    ]
	};

	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

function viz1() {
	var viz1_div = document.createElement('section');
	viz1_div.id = "viz1_div";
	viz1_div.classList.add("viz-div");
	// Source: PPIC http://www.ppic.org/wp-content/uploads/r-118hjr.pdf
	return viz1_div;
}

/* Audio 1 */

function audio1() {
	var audio1 = document.createElement('section');
	audio1.id = "audio1";
	audio1.classList.add("wrapper-child");

	var h2 = document.createElement('H2');
	var t = document.createTextNode("California families struggle to find homes as housing cost burdens remain high.");
	h2.appendChild(t);
	audio1.appendChild(h2);

	var img = document.createElement("IMG");
	img.src = NguyenPhoto;
	img.id = "Nguyen-photo";
	audio1.appendChild(img);
	var photoCred = document.createElement('p');
	photoCred.appendChild(document.createTextNode("Jenny Nguyen, with her parents Khanh Nguyen and Tammy Vo, sitting in their home in Sacramento built by Habitat for Humanity. Photo Credit: Robbie Short"));
	photoCred.className = 'photo-cred';
	audio1.appendChild(photoCred);
	var caption = document.createElement('CAPTION');
	caption.appendChild(document.createTextNode("The Nguyen family struggled to pay their rent for about four years after immigrating from Vietnam in 2008. The family bounced around from Los Angeles to San Jose to Milpitas, separating at times because of housing costs.. They eventually managed to secure permanent housing  in Sacramento through Habitat for Humanity. Listen to their story."));
	audio1.appendChild(caption);

	var player = document.createElement('audio');
	player.src = Nguyen;
	player.controls = true;
	var p = document.createElement('p').appendChild(document.createTextNode("Your browser does not support the audio element."));
	player.appendChild(p);
	player.typle = "audio/wav";
	audio1.appendChild(player);

	var quote = document.createElement("BLOCKQUOTE");
	quote.appendChild(document.createTextNode('"When we lived in an apartment, every year the price would increase."'));
	audio1.appendChild(quote);

	return audio1;
}

/* Chart 2 */
// Source: HUD https://www.huduser.gov/portal/datasets/cp.html#2006-2013
// Housing cost burden by income
//The income limits are set at 80% and 50% of HUD's adjusted area median family income (HAMFI): "low income" is defined as 80% of HAMFI and "very low income" is defined as 50% of HAMFI.

async function chart2(container) {
	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	let option = null;
	option = {
	    tooltip : {
	        trigger: 'axis',
					formatter: function (params) {
							var data = "";
							for (var i=0;i<params.length;i++) {
								console.log(params[i].color);
								data += params[i].seriesName.substring(0,params[i].seriesName.length-7) + ": " + params[i].data + "%" + "<br/>";
							}
							return data;
					},
	        axisPointer : {
	            type : 'shadow'
	        }
	    },
			title: {
				text: 'Percentage of Cost Burdened Renters in CA (2016)',
				left: 'center'
			},
	    legend: {
					top: '6%',
	        data: ['Moderately Rent Burdened (>30%)', 'Severely Rent Burdened (>50%)']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis:  {
	        type: 'value',
					name: 'Percentage of Cost Burdened Renters in CA',
					nameLocation: 'middle',
					nameGap: 20,
					axisLabel: {
						formatter: "{value}%"
					}
	    },
	    yAxis: {
	        type: 'category',
					name: 'Income Brackets in CA',
					nameLocation: 'middle',
					nameGap: 100,
	        data: ['<$15,000','$15,000-29,999','$30,000-44,999','$45,000-74,999','>$75,000']
	    },
			toolbox: {
					feature: {
							saveAsImage: {
								title: 'save'
							}
					}
			},
	    series: [
	        {
	            name: 'Moderately Rent Burdened (>30%)',
	            type: 'bar',
	            // stack: '总量',
	            label: {
	                normal: {
	                    show: false,
	                    position: 'insideRight'
	                }
	            },
	            data: [9.6,26.6,47.6,38.8,10.6]
	        },
					{
							name: 'Severely Rent Burdened (>50%)',
							type: 'bar',
							// stack: '总量',
							label: {
									normal: {
											show: false,
											position: 'insideRight'
									}
							},
							data: [78.6,61.0,27.8,7.6,0.5]
					}
	    ]
	};

	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

function viz2_div() {
	var viz2_div = document.createElement('section');
	viz2_div.id = "viz2_div";
	viz2_div.classList.add("viz-div");
	// viz2_div.classList.add("parallax");
	// viz2_div.classList.add("bg");

	return viz2_div;
}

/* Chart 4 */

async function chart4(container) { // Relationship between median rent and homelessness rate (homeless count / state population)

	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	var data = [[689, 0.108206], [1120, 0.261759], [888, 0.172702], [640, 0.142886], [1200, 0.315889], [934, 0.323311], [1019, 0.116991], [960, 0.109939], [954, 0.285244], [837, 0.206999], [1379, 0.448458], [702, 0.123411], [868, 0.109827], [715, 0.095767], [661, 0.095239], [711, 0.093023], [636, 0.119306], [747, 0.168858], [744, 0.180182], [1170, 0.160464], [1036, 0.262792], [748, 0.127364], [813, 0.144002], [666, 0.080893], [706, 0.169958], [681, 0.182657], [692, 0.204274], [944, 0.308711], [967, 0.113254], [1148, 0.146643], [753, 0.155741], [1079, 0.354469], [756, 0.138632], [644, 0.098092], [700, 0.121045], [686, 0.13189], [862, 0.40648], [798, 0.115413], [878, 0.1213], [754, 0.104153], [651, 0.103174], [730, 0.146125], [831, 0.130576], [851, 0.123571], [860, 0.18542], [1068, 0.102874], [954, 0.297552], [607, 0.129894], [743, 0.105347], [742, 0.314425], [743, 0.077809], [1208, 0.249393], [976, 0.127518], [701, 0.082116], [1375, 0.339629], [1171, 0.195108], [1115, 0.094421], [1048, 0.103333], [1086, 0.1534], [933, 0.097551], [1483, 0.505766], [790, 0.118641], [950, 0.084346], [768, 0.081568], [741, 0.087611], [789, 0.072019], [707, 0.090364], [808, 0.070554], [797, 0.170671], [1314, 0.119742], [1179, 0.256056], [818, 0.090852], [912, 0.137503], [728, 0.049328], [771, 0.10184], [741, 0.145551], [769, 0.130255], [1003, 0.261271], [1026, 0.108431], [1244, 0.094785], [804, 0.118866], [1194, 0.45091], [839, 0.087235], [776, 0.144163], [759, 0.086588], [744, 0.106821], [1015, 0.336803], [881, 0.110405], [948, 0.111359], [841, 0.07794], [706, 0.108432], [806, 0.12372], [956, 0.083195], [954, 0.091946], [925, 0.196422], [1159, 0.071629], [1135, 0.285076], [682, 0.072087], [802, 0.08674], [840, 0.150695]];
	var states = ["AL 12", "AK 12", "AZ '12", "AR '12", "CA '12", "CO '12", "CT '12", "DE '12", "FL '12", "GA '12", "HI '12", "ID '12", "IL '12", "IN '12", "IA '12", "KS '12", "KY '12", "LA '12", "ME '12", "MD '12", "MA '12", "MI '12", "MN '12", "MS '12", "MO '12", "MT '12", "NE '12", "NV '12", "NH '12", "NJ '12", "NM '12", "NY '12", "NC '12", "ND '12", "OH '12", "OK '12", "OR '12", "PA '12", "RI '12", "SC '12", "SD '12", "TN '12", "TX '12", "UT '12", "VT '12", "VA '12", "WA '12", "WV '12'", "W '12", "WY '12", "AL '17", "AK '17", "AZ '17", "AR '17", "CA '17", "CO '17", "CT '17", "DE '17", "FL '17", "GA '17", "HI '17", "ID '17", "IL '17", 'y17_IN', "IA '17", "KS '17", "KY '17", "LA '17", "ME '17", "MD '17", "MA '17", "MI '17", "MN '17", "MS '17", "MO '17", "MT '17", "NE '17", "NV '17", "NH '17", "NJ '17", "NM '17", "NY '17", "NC '17", "ND '17", "OH '17", "OK '17", "OR '17", "PA '17", "RI '17", "SC '17", "SD '17", "TN '17", "TX '17", "UT '17", "VT '17", "VA '17", "WA '17", "WV '17", "WI '17", "WY '17"];
	var my_dict = {};
	for (var i=0; i< data.length; i++) {
		my_dict[data[i]] = states[i];
	}

	// See https://github.com/ecomfe/echarts-stat
	var myRegression = ecStat.regression('linear', data);

	myRegression.points.sort(function(a, b) {
	    return a[0] - b[0];
	});
	let option = null;
	option = {
	    title: {
	        text: 'Median Rent vs Homelessness Rate by State Population',
	        subtext: 'Research by UCLA Economics Professor William Yu',
	        sublink: 'https://www.anderson.ucla.edu/centers/ucla-anderson-forecast/june-2018-economic-outlook',
	        left: 'center',
					textStyle: {
						color: '#EFF6EE'
					}
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross'
	        },
					formatter: function(params) {
							var data = "";
							console.log(params);
							for (var i=0; i<params.length; i++) {
									// console.log(my_dict[params[i].value]);
									data = my_dict[params[0].value] + "<br/>";
									data += "Homelessness rate: " + params[i].value[1].toString().substring(0,4) + "<br/>" + "Median rent: $" + params[i].value[0];
							}
							console.log(data);
							return data;
					}
	    },
	    xAxis: {
	        type: 'value',
	        min: 600,
					name: 'Median Rent',
					nameLocation: 'middle',
					nameGap: 25,
					axisLine: {
						lineStyle: {
							color: '#C0C0C0'
						}
					},
	        splitLine: {
	            lineStyle: {
	                type: 'dashed',
									color: '#EFF6EE'
	            }
	        },
	    },
	    yAxis: {
	        type: 'value',
					name: 'Homelessness Rate',
					nameLocation: 'middle',
					nameGap: 35,
					axisLine: {
						lineStyle: {
							color: '#C0C0C0'
						}
					},
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        },
	    },
			toolbox: {
					feature: {
							saveAsImage: {
								title: 'save'
							}
					}
			},
	    series: [{
	        name: 'scatter',
	        type: 'scatter',
	        label: {
	            emphasis: {
	                show: true,
	                position: 'left',
	                textStyle: {
	                    color: 'white',
	                    fontSize: 16
	                },
									formatter: function (params) {
											return my_dict[params.value];
									}
	            }
	        },
	        data: data
	    }, {
	        name: 'line',
	        type: 'line',
	        showSymbol: false,
					color: '#C0C0C0',
	        data: myRegression.points,
	        markPoint: {
	            itemStyle: {
	                normal: {
	                    color: 'transparent'
	                }
	            },
	            label: {
	                normal: {
	                    show: true,
	                    position: 'left',
	                    formatter: myRegression.expression,
	                    textStyle: {
	                        color: '#333',
	                        fontSize: 14
	                    }
	                }
	            }
	        }
	    }]
	};
	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

async function chart4a(container) { // Relationship between median home value and homelessness rate (homeless count / state population)

	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	var data = [[123200, 0.108206], [245100, 0.261759], [151500, 0.172702], [107600, 0.142886], [349400, 0.315889], [234900, 0.323311], [267800, 0.116991], [226900, 0.109939], [148200, 0.285244], [142300, 0.206999], [496600, 0.448458], [154500, 0.123411], [170600, 0.109827], [122700, 0.095767], [126300, 0.095239], [130100, 0.093023], [120800, 0.119306], [139500, 0.168858], [172300, 0.180182], [279900, 0.160464], [323800, 0.262792], [115700, 0.127364], [178400, 0.144002], [99800, 0.080893], [135000, 0.169958], [184800, 0.182657], [128300, 0.204274], [150700, 0.308711], [236000, 0.113254], [311600, 0.146643], [157500, 0.155741], [280900, 0.354469], [150100, 0.138632], [142500, 0.098092], [127600, 0.121045], [114300, 0.13189], [223900, 0.40648], [163800, 0.115413], [234600, 0.1213], [135500, 0.104153], [134300, 0.103174], [137800, 0.146125], [129200, 0.130576], [199700, 0.123571], [216900, 0.18542], [237800, 0.102874], [243000, 0.297552], [100400, 0.129894], [165200, 0.105347], [187400, 0.314425], [136200, 0.077809], [267800, 0.249393], [205900, 0.127518], [123300, 0.082116], [477500, 0.339629], [314200, 0.195108], [274600, 0.094421], [243400, 0.103333], [197700, 0.1534], [166800, 0.097551], [592000, 0.505766], [189400, 0.118641], [186500, 0.084346], [134800, 0.081568], [142300, 0.087611], [144900, 0.072019], [135600, 0.090364], [158000, 0.070554], [184700, 0.170671], [306900, 0.119742], [366900, 0.256056], [147100, 0.090852], [211800, 0.137503], [113900, 0.049328], [151400, 0.10184], [217200, 0.145551], [148100, 0.130255], [239500, 0.261271], [251100, 0.108431], [328200, 0.094785], [167500, 0.118866], [302400, 0.45091], [165400, 0.087235], [184100, 0.144163], [140100, 0.086588], [132200, 0.106821], [287100, 0.336803], [174100, 0.110405], [247700, 0.111359], [153900, 0.07794], [160700, 0.108432], [157700, 0.12372], [161500, 0.083195], [250300, 0.091946], [223700, 0.196422], [264000, 0.071629], [306400, 0.285076], [117900, 0.072087], [173200, 0.08674], [209500, 0.150695]];
	var states = ['y12_AL', 'y12_AK', 'y12_AZ', 'y12_AR', 'y12_CA', 'y12_CO', 'y12_CT', 'y12_DE', 'y12_FL', 'y12_GA', 'y12_HI', 'y12_ID', 'y12_IL', 'y12_IN', 'y12_IA', 'y12_KS', 'y12_KY', 'y12_LA', 'y12_ME', 'y12_MD', 'y12_MA', 'y12_MI', 'y12_MN', 'y12_MS', 'y12_MO', 'y12_MT', 'y12_NE', 'y12_NV', 'y12_NH', 'y12_NJ', 'y12_NM', 'y12_NY', 'y12_NC', 'y12_ND', 'y12_OH', 'y12_OK', 'y12_OR', 'y12_PA', 'y12_RI', 'y12_SC', 'y12_SD', 'y12_TN', 'y12_TX', 'y12_UT', 'y12_VT', 'y12_VA', 'y12_WA', 'y12_WV', 'y12_WI', 'y12_WY', 'y17_AL', 'y17_AK', 'y17_AZ', 'y17_AR', 'y17_CA', 'y17_CO', 'y17_CT', 'y17_DE', 'y17_FL', 'y17_GA', 'y17_HI', 'y17_ID', 'y17_IL', 'y17_IN', 'y17_IA', 'y17_KS', 'y17_KY', 'y17_LA', 'y17_ME', 'y17_MD', 'y17_MA', 'y17_MI', 'y17_MN', 'y17_MS', 'y17_MO', 'y17_MT', 'y17_NE', 'y17_NV', 'y17_NH', 'y17_NJ', 'y17_NM', 'y17_NY', 'y17_NC', 'y17_ND', 'y17_OH', 'y17_OK', 'y17_OR', 'y17_PA', 'y17_RI', 'y17_SC', 'y17_SD', 'y17_TN', 'y17_TX', 'y17_UT', 'y17_VT', 'y17_VA', 'y17_WA', 'y17_WV', 'y17_WI', 'y17_WY'];

	// See https://github.com/ecomfe/echarts-stat
	var myRegression = ecStat.regression('linear', data);

	myRegression.points.sort(function(a, b) {
	    return a[0] - b[0];
	});

	option = {
	    title: {
	        text: 'Homelessness vs Median Home Value',
	        subtext: 'UCLA Economics Professor William Yu',
	        sublink: 'https://www.anderson.ucla.edu/centers/ucla-anderson-forecast/june-2018-economic-outlook',
	        left: 'center',
					color: '#EFF6EE'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross'
	        }
	    },
			toolbox: {
					feature: {
							saveAsImage: {
								title: 'save'
							}
					}
			},
	    xAxis: {
	        type: 'value',
	        min: 100000,
					axisLine: {
						lineStyle: {
							color: '#EFF6EE'
						}
					},
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        },
	    },
	    yAxis: {
	        type: 'value',
					axisLine: {
						lineStyle: {
							color: '#EFF6EE'
						}
					},
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        },
	    },
	    series: [{
	        name: 'scatter',
	        type: 'scatter',
	        label: {
	            emphasis: {
	                show: true,
	                position: 'left',
	                textStyle: {
	                    color: 'white',
	                    fontSize: 16
	                }
	            }
	        },
	        data: data
	    }, {
	        name: 'line',
	        type: 'line',
					color: '#EFF6EE',
	        showSymbol: false,
	        data: myRegression.points,
	        markPoint: {
	            itemStyle: {
	                normal: {
	                    color: 'transparent'
	                }
	            },
	            label: {
	                normal: {
	                    show: true,
	                    position: 'left',
	                    formatter: myRegression.expression,
	                    textStyle: {
	                        color: '#333',
	                        fontSize: 14
	                    }
	                }
	            }
	        }
	    }]
	};
	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

function viz4_div() {
	var viz4_div = document.createElement('section');
	viz4_div.id = "viz4_div";
	viz4_div.classList.add("viz-div");
	// viz4_div.classList.add("parallax");
	// viz4_div.classList.add("bg");

	return viz4_div;
}

/* Audio 2 */

function audio2() {
	var audio2 = document.createElement('section');
	audio2.id = "audio2";
	audio2.classList.add("wrapper-child");

	var h2 = document.createElement('H2');
	var t = document.createTextNode("As rents continue to increase, families fight for housing security.");
	h2.appendChild(t);
	audio2.appendChild(h2);

	var img = document.createElement("IMG");
	img.src = RodriguezPhoto;
	img.id = "Rodriguez-photo";
	audio2.appendChild(img);
	var photoCred = document.createElement('p');
	photoCred.appendChild(document.createTextNode("Photo Credit: City Heights Community Development Corporation"));
	photoCred.className = 'photo-cred';
	audio2.appendChild(photoCred);
	var caption = document.createElement('CAPTION');
	caption.innerHTML = 'As a teen, Miriam Rodriguez faced homelessness after immigrating from Mexico to reunite with her mother. During this time, she attended high school while living in a garage in Los Angeles. Today, she is an advocate with the Residents United Network of Housing California and a mother of three. Her family is currently struggling to find affordable housing in San Diego. <br/><br/>“One of the things I share with my daughters is to see that we might be struggling, but it’s important to remember that other families are going through worse,” Rodriguez said. “Sometimes as we’re walking to school, we see that other families are living in cars in San Diego. This is an area where I could never imagine seeing that happening.” <br/><br/>';
	caption.innerHTML += 'Dreams for Change, a San Diego nonprofit that assists homeless individuals, estimates that <a href="http://www.sandiegouniontribune.com/news/homelessness/sd-me-homeless-parkin-20170619-story.html" target="blank">about 1,000 people in the county live in cars.</a>'
	audio2.appendChild(caption);

	return audio2;
}

/* Chart 5 */

async function chart5(container) {

	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	let option = null;
	option = {
			color: ['#cc3700', '#0066CC'],
			title: {
				text: 'Sheltered vs Unsheltered Homeless in CA',
				left: 'center',
				textStyle: {
					color:'#EFF6EE'
				}
			},
			toolbox: {
					feature: {
							saveAsImage: {
								title: 'save'
							}
					}
			},
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {
	            type : 'shadow'
	        }
	    },
	    legend: {
					top: '6%',
	        data:['Sheltered', 'Unsheltered'],
					textStyle: {
						color: '#EFF6EE'
					}
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'value',
							name: 'Number of Homeless',
							nameLocation: 'middle',
							nameGap: 19,
							axisLine: {
								lineStyle: {
									color: '#EFF6EE'
								}
							}
	        }
	    ],
	    yAxis : [
	        {
	            type : 'category',
							name: 'Year',
							nameLocation: 'middle',
							nameGap: 40,
							axisLine: {
								lineStyle: {
									color: '#EFF6EE'
								}
							},
	            axisTick : {show: false},
	            data : ['2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017']
	        }
	    ],
	    series : [
	        {
	            name:'Sheltered',
							stack: '总量',
	            type:'bar',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                }
	            },
	            data:[138986-90475,136531-89566,123678-72901,123480-72581,125128-74437,120098-74208,118552-72998,113952-71437,115738-73699,118142-78390,134278-91642]
	        },
	        {
	            name:'Unsheltered',
	            type:'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data:[90475,89566,72901,72581,74437,74208,72998,71437,73699,78390,91642]
	        }
	    ]
	};

	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

function viz5_div() {
	var viz5_div = document.createElement('section');
	viz5_div.id = "viz5_div";
	viz5_div.classList.add("viz-div");

	return viz5_div;
}

/* Chart 6 */

async function chart6(container) {

	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	let option = null;
	option = {
	    color: ['#283D3B', '#197278', '#EDDDD4', '#C44536', '#772E25'],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
			title: {
				text: 'Homelessness Counts in the 5 Most Populous States',
				left: 'center'
			},
	    legend: {
					top: '6%',
	        data: ['CA', 'TX', 'FL', 'NY', 'IL']
	    },
	    toolbox: {
	        show: true,
	        orient: 'vertical',
	        left: 'right',
	        top: 'center',
	        feature: {
	            saveAsImage: {
								show: true,
								title: "save"
							}
	        }
	    },
	    calculable: true,
	    xAxis: [
	        {
	            type: 'category',
							name: 'Year',
							nameLocation: 'middle',
							nameGap: 25,
	            axisTick: {show: false},
	            data: ['2007','2008','2009','2010','2011','2012', '2013', '2014', '2015', '2016','2017']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
							name: 'Numbre of Homeless',
							nameLocation: 'middle',
							nameGap: 50
	        }
	    ],
	    series: [
	        {
	            name: 'CA',
	            type: 'bar',
	            barGap: 0,
	            data: [138986,136531,123678,123480,125128,120098,118552,113952,115738,118142,134278]
	        },
	        {
	            name: 'TX',
	            type: 'bar',
	            data: [39788,40190,36761,35121,36911,34052,29615,28495,23678,23122,23548]
	        },
	        {
	            name: 'FL',
	            type: 'bar',
	            data: [48069,50158,55599,57551,56687,55170,47862,41542,35900,33559,32190]
	        },
	        {
	            name: 'NY',
	            type: 'bar',
	            data: [62601,61125,61067,65606,63445,69566,77430,80590,88250,86352,89503]
	        },
					{
							name: 'IL',
							type: 'bar',
							data: [15487,14724,14055,14395,14009,14144,13425,13107,13177,11590,10798]
					}
	    ]
	};

	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

function viz6_div() {
	var viz6_div = document.createElement('section');
	viz6_div.id = "viz6_div";
	viz6_div.classList.add("viz-div");

	return viz6_div;
}

function viz7() {
	var viz7_div = document.createElement('section');
	viz7_div.id = "viz7_div";
	viz7_div.classList.add("viz-div");
	// viz1_div.classList.add("parallax");
	// viz1_div.classList.add("bg");

	// Source: PPIC http://www.ppic.org/wp-content/uploads/r-118hjr.pdf
	return viz7_div;
}

/* Chart 7 */

async function chart7(container) { // TODO: Fix formatting

	var result = await resolveAfterTrigger();
	var myChart = echarts.init(container);
	let option = null;
	var my_dict = {'Emergency Homeless Aid Block Grants': "The Homeless Emergency Aid program bridges funding" +"<br/>"+ "for local governments in assisting immediate homeless" +"<br/>"+"needs. The program provides flexible block grants to"+"<br/>"+"jurisdictions that declare a shelter crisis.",
		"Council Administration" : "The state homeless council works to connect"+"<br/>"+"individuals and families with permanent housing.",
		"CalWORKS Housing Support Program" : "This program provides funds to help low-income"+"<br/>"+"families secure permanent housing.",
		"CalWORKS Homeless Assistance Program" : "As part of CalWORKS, this program increases"+"<br/>"+ "funding for housing insecure families to $85"+"<br/>"+ "per day from $65.",
		"Senior Home Safe Program" : "Funded by CalWORKs, this program was intended"+"<br/>"+"to provide housing-related support to seniors at"+"<br/>"+"risk of homelessness.",
		"Domestic Violence Shelters and Services" : "Funded by the California Office of Emergency Services, this"+"<br/>"+"program focuses on assisting victims of domestic violence.",
		"Homeless Youth and Exploitation Program" : "Funded by the California Office of Emergency Services, this program"+"<br/>"+"focuses on assisting homeless youth.",
		"Homeless and Mental Illness Program" : "The Department of Health Care Services allotted $5 million"+"<br/>"+"to provide intensive outreach and treatment for homeless"+"<br/>"+"individuals who have mental health service needs."
	};

	option = {
		color: ['#D782BA','#EDDDD4','#E49273','#08B2E3','#E09F3E','#FCD0A1','#6D9F71','#7180AC'],
	    title : {
	        text: 'New Homelessness Spending in CA',
	        x:'center',
					textStyle: {
						color: '#EFF6EE'
					}
	    },
	    tooltip : { // could also adjust position
	        trigger: 'item',
	        formatter: function (params) {
	            return params.name + ": $" + params.value +"M"+ "<br/><hr/>" + my_dict[params.name];
	        },
					confine: true
	    },
			toolbox: {
					feature: {
							saveAsImage: {
								title: 'save'
							}
					}
			},
	    // legend: {
	    //     orient: 'horizontal',
	    //     left: 'center',
			// 		top: '40',
	    //     data: ['Emergency Homeless Aid Block Grants','Council Administration','CalWORKS Housing Support Program','CalWORKS Homeless Assistance Program','Senior Home Safe Program','Domestic Violence Shelters and Services','Homeless Youth and Exploitation Program','Homeless and Mental Illness Program']
	    // },
	    series : [
	        {
	            name: 'Budget',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:0.5, name:'Council Administration'},
	                {value:24.2, name:'CalWORKS Housing Support Program'},
	                {value:8.1, name:'CalWORKS Homeless Assistance Program'},
	                {value:15, name:'Senior Home Safe Program'},
									{value:10, name:'Domestic Violence Shelters and Services'},
									{value:500, name:'Emergency Homeless Aid Block Grants'},
									{value:1, name:'Homeless Youth and Exploitation Program'},
									{value:50, name:'Homeless and Mental Illness Program'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	if (option && typeof option === "object") {
			myChart.setOption(option, true);
	}
}

function wrapper() {
	var wrapper = document.createElement('div');
	wrapper.id = "wrapper";
	wrapper.appendChild(header());
	wrapper.appendChild(viz1());
	wrapper.appendChild(audio1());
	wrapper.appendChild(viz2_div());
	wrapper.appendChild(viz4_div());
	wrapper.appendChild(audio2());
	wrapper.appendChild(viz5_div());
	wrapper.appendChild(viz6_div());
	wrapper.appendChild(viz7());

	return wrapper;
}

document.body.appendChild(wrapper());

/* Scroll animations */
var w = document.getElementById("wrapper");
var v1 = document.getElementById("viz1_div");
var a1 = document.getElementById("audio1");
var v2 = document.getElementById("viz2_div");
var v4 = document.getElementById("viz4_div");
var a2 = document.getElementById("audio2");
var v5 = document.getElementById("viz5_div");
var v6 = document.getElementById("viz6_div");
var a3 = document.getElementById("audio3");
var v7 = document.getElementById("viz7_div");

var viz1_trigger, viz2_trigger, viz4_trigger, viz5_trigger, viz6_trigger, audio1_trigger, audio2_trigger, audio3_trigger, viz7_trigger;
viz1_trigger = viz2_trigger = viz4_trigger = viz5_trigger = viz6_trigger = audio1_trigger = audio2_trigger = audio3_trigger = viz7_trigger = false;

async function renderText(text_div, text) {
	var result = await resolveAfterTrigger();
	for (var i=0; i <text.length; i++) {
		text_div.appendChild(text[i]);
	}
}

function triggerViz(scrollPos) { // scrollPos - expected pos of visualization, genViz - function to generate echart
	if ((scrollPos > v1.offsetTop-(v1.offsetTop*0.7)) && (!viz1_trigger)) {
		viz1_trigger = true;

		var chart1_div = document.createElement('div');
		chart1_div.id = "chart1_div";
		chart1_div.classList.add("echart-div");
		v1.appendChild(chart1_div);
		chart1(chart1_div);

		var text = [];

		var caption = document.createElement('CAPTION');
		caption.className = "chart-caption";
		var caption_t = document.createTextNode("Source: California Department of Housing and Community Development, California Housing Partnership. All figures in 2000 dollars.");
		text.push(caption);
		caption.appendChild(caption_t);

		var chart1_aside = document.createElement('div');
		chart1_aside.classList.add("chart-aside");
		v1.appendChild(chart1_aside);
		var h2 = document.createElement('H2');
		var t = document.createTextNode("Income has not kept up with rising rents");
		h2.appendChild(t);
		text.push(h2);
		var p = document.createElement('p');
		p.innerHTML = "Although housing prices have increased steadily, the median household income has not kept up for homeowners or renters. The median monthly housing costs of homeowners with mortgages <a href='http://www.ppic.org/wp-content/uploads/r-118hjr.pdf' target='blank'>in California is 47 percent higher than the national average</a>. California renters pay 40 percent more than the national mean, yet the state’s median household income is only 18 percent higher than the nation’s average."
		text.push(p);

		renderText(chart1_aside,text);
	}
	if ((scrollPos > v1.offsetTop+(v1.offsetTop*0.1)) && (!audio1_trigger)) {
		audio1_trigger = true;
	}
	if ((scrollPos > a1.offsetTop+(a1.offsetTop*0.1)) && (!viz2_trigger)) {
		viz2_trigger = true;

		var chart2_div = document.createElement('div');
		chart2_div.id = "chart2_div";
		chart2_div.classList.add("echart-div");
		v2.appendChild(chart2_div);
		chart2(chart2_div);

		var text = [];
		var chart2_aside = document.createElement('div');
		chart2_aside.classList.add("chart-aside");
		v2.appendChild(chart2_aside);

		var caption = document.createElement('CAPTION');
		caption.className = "chart-caption";
		var caption_t = document.createTextNode("Source: Harvard Joint Center for Housing Studies");
		text.push(caption);
		caption.appendChild(caption_t);

		var h2 = document.createElement('H2');
		var t = document.createTextNode("Low-income Californians are severely housing cost burdened");
		h2.appendChild(t);
		text.push(h2);
		var p = document.createElement('p');
		p.innerHTML = "Californian renters who earn less than the state’s median income have been especially hurt by the housing crisis. Over half of the state’s renters pay <a href='https://calbudgetcenter.org/wp-content/uploads/SCANPH_Sara-Kimberlin_9.22.2017.pdf' target='blank'>30 percent or more</a> of their income towards housing. More than 25 percent of renters are severely cost burdened, paying 50 percent or more of their income in rent. Meanwhile, two-thirds of extremely low-income Californians <a href='https://calbudgetcenter.org/wp-content/uploads/SCANPH_Sara-Kimberlin_9.22.2017.pdf' target='blank'>suffer severe cost burdens.</a> ";
		text.push(p);

		renderText(chart2_aside,text);
	}
	if ((scrollPos > v2.offsetTop+(v2.offsetTop*0.1)) && (!viz4_trigger)) {
		viz4_trigger = true;

		var chart4_div = document.createElement('div');
		chart4_div.id = "chart4_div";
		chart4_div.classList.add("echart-div");
		v4.appendChild(chart4_div);
		chart4(chart4_div);

		var text = [];

		var caption = document.createElement('CAPTION');
		caption.className = "chart-caption";
		var caption_t = document.createTextNode("Source: UCLA Anderson Forecast, Professor William Yu");
		text.push(caption);
		caption.appendChild(caption_t);

		var chart4_aside = document.createElement('div');
		v4.appendChild(chart4_aside);
		var h2 = document.createElement('H2');
		var t = document.createTextNode("Housing costs drive up homelessness rates");
		h2.appendChild(t);
		text.push(h2);
		var p = document.createElement('p');
		p.innerHTML = 'Housing prices have skyrocketed in California partly because there is a major shortage of homes within the state. Although California needs to build <a href="https://www.kqed.org/news/11666284/5-reasons-californias-housing-costs-are-so-high" target="blank">180,000 additional units of housing</a> annually to keep up with projected household growth, the state has averaged less than half of that over the past decade. Due to this shortage, <a href="https://lao.ca.gov/reports/2015/finance/housing-costs/housing-costs.aspx" target="blank">California’s homeownership rate has declined to its lowest rate since the 1940s.</a> Today, <a href="https://www.census.gov/quickfacts/fact/table/ca/PST045217#viewtop" target="blank">54.1 percent of Californians own their homes.</a><br/><br/>“A state with higher housing costs, higher rental costs, and lower household income has a higher homelessness rate,” said William Yu, an economics professor at UCLA, said.<br/><br/>';
		p.innerHTML += "<a href='https://www.anderson.ucla.edu/centers/ucla-anderson-forecast/projects-and-partnerships/allen-matkins/summer/fall-2018-survey' target='blank'>Yu’s research</a> found that median household income, housing supply growth, and population density were also factors in predicting how a state’s homelessness rate would be. ";
		text.push(p);
		chart4_aside.classList.add("chart-aside");
		chart4_aside.id = "chart4_aside";

		renderText(chart4_aside,text);
	}
	if ((scrollPos > v4.offsetTop+(v4.offsetTop*0.1)) && (!audio2_trigger)) {
		audio2_trigger = true;
	}
	if ((scrollPos > a2.offsetTop+(a2.offsetTop*0.1)) && (!viz5_trigger)) {
		viz5_trigger = true;

		var chart5_div = document.createElement('div');
		chart5_div.id = "chart5_div";
		chart5_div.classList.add("echart-div");
		v5.appendChild(chart5_div);
		chart5(chart5_div);

		var text = [];

		var caption = document.createElement('CAPTION');
		caption.className = "chart-caption";
		var caption_t = document.createTextNode("Source: Department of Housing and Urban Development");
		text.push(caption);
		caption.appendChild(caption_t);

		var chart5_aside = document.createElement('div');
		v5.appendChild(chart5_aside);
		var h2 = document.createElement('H2');
		var t = document.createTextNode("Homelessness is on the rise");
		h2.appendChild(t);
		text.push(h2);
		chart5_aside.appendChild(h2);
		var p = document.createElement('p');
		p.innerHTML = 'California alone accounts for 25 percent of the nation’s homeless population, <a href="https://www.hudexchange.info/resource/3031/pit-and-hic-data-since-2007/" target="blank">at 134,000 on a given night.</a> The majority of California’s unsheltered homeless population is chronically homeless, meaning that they have been homeless for a year or more or have experienced at least four episodes of homelessness in the past three years. Individuals experiencing chronic homelessness often have serious mental or physical illnesses.<br/><br/>According to research from 2017, <a href="https://www.hudexchange.info/resource/reportmanagement/published/CoC_PopSub_State_CA_2017.pdf" target="blank">26 percent of the nation’s total homeless population suffers from mental illness</a>, while 18 percent struggle with substance abuse, and 24 percent identify as victims of domestic violence.';
		chart5_aside.classList.add("chart-aside");
		text.push(p);

		renderText(chart5_aside,text);
	}
	if ((scrollPos > v5.offsetTop+(v5.offsetTop*0.1)) && (!viz6_trigger)) {
		viz6_trigger = true;

		var chart6_div = document.createElement('div');
		chart6_div.id = "chart6_div";
		chart6_div.classList.add("echart-div");
		v6.appendChild(chart6_div);
		chart6(chart6_div);

		var text = [];

		var caption = document.createElement('CAPTION');
		caption.className = "chart-caption";
		caption.id = "chart6-caption";
		var caption_t = document.createTextNode("Source: Department of Housing and Urban Development");
		text.push(caption);
		caption.appendChild(caption_t);

		var chart6_aside = document.createElement('div');
		chart6_aside.id = "chart6_aside";
		v6.appendChild(chart6_aside);
		var h2 = document.createElement('H2');
		var t = document.createTextNode("California has the most unsheltered homeless individuals in the country");
		h2.appendChild(t);
		text.push(h2);
		chart6_aside.appendChild(h2);
		var p = document.createElement('p');
		p.innerHTML = 'The state has the highest percentage of unsheltered homeless individuals in the country, at slightly under 70 percent, according to <a href="https://www.hudexchange.info/resources/documents/2017-AHAR-Part-1.pdf" target="blank">data</a> from the US Department of Housing and Urban Development. This means that the vast majority of the state’s homeless population is not living in emergency shelters or transitional housing. Instead, they are living on the street or in a place “not meant for human habitation”.';
		chart6_aside.classList.add("chart-aside");
		text.push(p);

		renderText(chart6_aside,text);
	}
	if ((scrollPos > v6.offsetTop+(v6.offsetTop*0.1)) && (!viz7_trigger)) {
		viz7_trigger = true;

		var chart7_div = document.createElement('div');
		chart7_div.id = "chart7_div";
		chart7_div.classList.add("echart-div");
		v7.appendChild(chart7_div);
		chart7(chart7_div);

		var text = [];

		var caption = document.createElement('CAPTION');
		caption.className = "chart-caption";
		var caption_t = document.createTextNode("Source: California Department of Finance");
		text.push(caption);
		caption.appendChild(caption_t);

		var chart7_aside = document.createElement('div');
		v7.appendChild(chart7_aside);
		chart7_aside.classList.add("chart-aside");
		var h2 = document.createElement('H2');
		h2.appendChild(document.createTextNode("Increase in state homelessness and housing affordability spending"));
		text.push(h2);
		var p = document.createElement('p');
		p.innerHTML = 'The <a href="http://www.ebudget.ca.gov/FullBudgetSummary.pdf" target="blank">2018 state budget</a> has set aside nearly $5 billion for housing affordability and homelessness. More than $600 million was allotted to specific homelessness response programs, which include measures to establish permanent housing, provide support for mental health services, and assist homeless youth and victims of domestic violence.';
		text.push(p);

		renderText(chart7_aside,text);
	}
}

var pymChild = new pym.Child();

w.onscroll = function() {
	triggerViz(w.scrollTop);
};

window.onorientationchange = function() {
		var orientation = window.orientation;
				switch(orientation) {
						case 0:
						case 90:
						case -90: window.location.reload();
						break; }
};
