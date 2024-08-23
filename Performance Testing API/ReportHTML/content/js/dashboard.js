/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.88618256316867, "KoPercent": 0.11381743683132256};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.014113362167083997, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Transfer Antar Bank"], "isController": false}, {"data": [0.0125, 500, 1500, "All Data Ewallet"], "isController": false}, {"data": [0.0, 500, 1500, "Ewallet history"], "isController": false}, {"data": [0.0, 500, 1500, "GET notifications"], "isController": false}, {"data": [0.008264462809917356, 500, 1500, "Check Account Ewallet"], "isController": false}, {"data": [0.00819672131147541, 500, 1500, "Last Transaction VA"], "isController": false}, {"data": [0.04710144927536232, 500, 1500, "Success Refresh Token"], "isController": false}, {"data": [0.0, 500, 1500, "Mutasi"], "isController": false}, {"data": [0.018796992481203006, 500, 1500, "Detail User"], "isController": false}, {"data": [0.039568345323741004, 500, 1500, "Success Re-Login User"], "isController": false}, {"data": [0.0, 500, 1500, "Transfer Sesama Bank"], "isController": false}, {"data": [0.0, 500, 1500, "Mutasi [/] Download"], "isController": false}, {"data": [0.0, 500, 1500, "Create Transaction Ewallet"], "isController": false}, {"data": [0.007142857142857143, 500, 1500, "Success Login"], "isController": false}, {"data": [0.012295081967213115, 500, 1500, "Check Nomor VA"], "isController": false}, {"data": [0.05755395683453238, 500, 1500, "Success Refresh Token [/]"], "isController": false}, {"data": [0.02158273381294964, 500, 1500, "Success Re-Login User [/]"], "isController": false}, {"data": [0.0, 500, 1500, "Mutasi [/]"], "isController": false}, {"data": [0.06296296296296296, 500, 1500, "Informasi Saldo"], "isController": false}, {"data": [0.0, 500, 1500, "History Transaction Other Bank"], "isController": false}, {"data": [0.0, 500, 1500, "Check Transfer Sesama Bank"], "isController": false}, {"data": [0.0, 500, 1500, "History Transaction Same Bank"], "isController": false}, {"data": [0.0037593984962406013, 500, 1500, "List All Bank Data"], "isController": false}, {"data": [0.011278195488721804, 500, 1500, "Detail User [/]"], "isController": false}, {"data": [0.025, 500, 1500, "All Data Ewallet [/]"], "isController": false}, {"data": [0.01079136690647482, 500, 1500, "Success Login [/]"], "isController": false}, {"data": [0.0037593984962406013, 500, 1500, "Check Transfer Antar Bank"], "isController": false}, {"data": [0.0, 500, 1500, "Transfer Virtual Account"], "isController": false}, {"data": [0.029166666666666667, 500, 1500, "Data qris"], "isController": false}, {"data": [0.0, 500, 1500, "Mutasi Download"], "isController": false}, {"data": [0.0, 500, 1500, "Transfer Qris Merchant"], "isController": false}, {"data": [0.0375, 500, 1500, "Data qris [/]"], "isController": false}, {"data": [0.0, 500, 1500, "GET notifications [/]"], "isController": false}, {"data": [0.05185185185185185, 500, 1500, "Informasi Saldo [/]"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4393, 5, 0.11381743683132256, 8217.290006829042, 966, 60054, 5149.0, 18207.399999999994, 24425.500000000015, 44069.100000000115, 2.3933441822885992, 4.668860735753118, 1.3694865497312185], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Transfer Antar Bank", 133, 0, 0.0, 15062.1954887218, 4199, 47870, 14359.0, 22550.4, 28386.6, 42783.93999999995, 0.07877639527507474, 0.0844958281087209, 0.05385105145757062], "isController": false}, {"data": ["All Data Ewallet", 120, 0, 0.0, 4258.741666666668, 1249, 9159, 3938.0, 6774.100000000001, 7721.049999999998, 9149.34, 0.08073473995676654, 0.08465255615437559, 0.040998110134295516], "isController": false}, {"data": ["Ewallet history", 120, 0, 0.0, 10162.224999999999, 3271, 58479, 8264.5, 17887.800000000003, 21408.899999999987, 52686.149999999776, 0.08073370793773817, 0.08978865555165343, 0.04170715966705419], "isController": false}, {"data": ["GET notifications", 120, 0, 0.0, 5745.5583333333325, 2760, 14532, 5282.5, 8534.6, 10342.449999999993, 13859.369999999974, 0.08091504122958497, 0.09063301143194674, 0.03998340904508788], "isController": false}, {"data": ["Check Account Ewallet", 121, 0, 0.0, 5633.181818181819, 1412, 19102, 4601.0, 11315.999999999995, 13252.399999999996, 18456.960000000003, 0.07756067199591814, 0.07480889066445139, 0.04605164899757639], "isController": false}, {"data": ["Last Transaction VA", 122, 0, 0.0, 5442.893442622951, 1017, 16453, 4852.5, 10241.000000000002, 11866.249999999998, 16428.16, 0.07789161445693903, 0.07372918155066882, 0.04145598620999196], "isController": false}, {"data": ["Success Refresh Token", 138, 0, 0.0, 4160.666666666666, 1009, 14419, 3070.5, 9703.800000000001, 10253.399999999983, 14415.88, 0.07684674420391785, 0.08103244244707877, 0.05448314091019957], "isController": false}, {"data": ["Mutasi", 133, 1, 0.7518796992481203, 24209.315789473687, 6112, 60028, 19967.0, 45785.0, 52534.8, 59831.82, 0.07834248507074974, 0.1063409267989614, 0.04662169385877383], "isController": false}, {"data": ["Detail User", 133, 0, 0.0, 4817.8421052631575, 1016, 19279, 4079.0, 8230.800000000001, 12723.4, 18089.33999999999, 0.08047072348020752, 0.08209973094492595, 0.039999607667407844], "isController": false}, {"data": ["Success Re-Login User", 139, 0, 0.0, 3753.733812949642, 1118, 17541, 3156.0, 7160.0, 8389.0, 15896.199999999977, 0.07772597288873331, 0.0703528832561479, 0.04364495547951333], "isController": false}, {"data": ["Transfer Sesama Bank", 134, 0, 0.0, 19937.910447761187, 3093, 50620, 18185.5, 33885.0, 35913.5, 50226.600000000006, 0.07353937896543264, 0.07769022500443157, 0.049624717641712855], "isController": false}, {"data": ["Mutasi [/] Download", 130, 1, 0.7692307692307693, 7802.692307692307, 1962, 22540, 5611.0, 15504.800000000003, 19126.599999999995, 22462.19, 0.07801126482664097, 1.274196689314437, 0.04753811450373434], "isController": false}, {"data": ["Create Transaction Ewallet", 120, 0, 0.0, 12874.524999999998, 3130, 50747, 8806.0, 25377.900000000005, 33404.99999999998, 49400.89999999995, 0.08139179977617256, 0.08722395144470445, 0.05381078950045783], "isController": false}, {"data": ["Success Login", 140, 0, 0.0, 3396.014285714286, 1236, 12349, 2949.0, 5142.400000000001, 6244.999999999996, 11927.110000000004, 0.0776020092268789, 0.08679505416758819, 0.04467961664053142], "isController": false}, {"data": ["Check Nomor VA", 122, 0, 0.0, 4996.655737704917, 1127, 26459, 4112.0, 8574.300000000001, 11686.399999999994, 25182.26999999998, 0.07712649440485214, 0.07427425628249032, 0.044362798051228426], "isController": false}, {"data": ["Success Refresh Token [/]", 139, 0, 0.0, 3817.7122302158277, 966, 16123, 2878.0, 7888.0, 9534.0, 14349.799999999974, 0.0774730196029034, 0.08176479933233863, 0.055002817628233176], "isController": false}, {"data": ["Success Re-Login User [/]", 139, 0, 0.0, 4044.0503597122306, 1140, 12779, 3179.0, 8500.0, 10438.0, 12506.999999999996, 0.07754770718208927, 0.07022639641662645, 0.04362058528992521], "isController": false}, {"data": ["Mutasi [/]", 129, 3, 2.3255813953488373, 29891.999999999996, 6820, 60054, 28879.0, 52327.0, 57484.5, 60049.5, 0.07631569139354227, 0.10555051252050615, 0.04476822103686403], "isController": false}, {"data": ["Informasi Saldo", 135, 0, 0.0, 4211.770370370371, 1013, 16421, 3200.0, 8722.000000000002, 10513.19999999999, 16396.16, 0.07555347115032679, 0.07442650892874132, 0.03836699706852532], "isController": false}, {"data": ["History Transaction Other Bank", 133, 0, 0.0, 12544.93984962406, 1740, 32057, 11901.0, 20644.400000000005, 23902.399999999998, 31262.75999999999, 0.0795692015739147, 0.07663513400530421, 0.042815068425026366], "isController": false}, {"data": ["Check Transfer Sesama Bank", 133, 0, 0.0, 9468.44360902255, 1940, 24740, 8650.0, 16604.800000000003, 19168.1, 24572.719999999998, 0.0781065102657207, 0.07385972111130883, 0.0469859475817226], "isController": false}, {"data": ["History Transaction Same Bank", 133, 0, 0.0, 13502.601503759397, 2810, 28319, 12762.0, 21173.800000000003, 24298.699999999997, 28201.02, 0.07819881666963588, 0.07676910674902825, 0.04215404961097559], "isController": false}, {"data": ["List All Bank Data", 133, 0, 0.0, 4696.654135338346, 1398, 26188, 4148.0, 7888.0, 10039.799999999997, 22815.87999999997, 0.08043028387657035, 0.07785837153015894, 0.04131477472566016], "isController": false}, {"data": ["Detail User [/]", 133, 0, 0.0, 4593.037593984964, 1118, 17121, 3920.0, 8089.400000000001, 9624.5, 16671.859999999997, 0.08021683878104181, 0.08180359985126712, 0.03987340912065457], "isController": false}, {"data": ["All Data Ewallet [/]", 120, 0, 0.0, 3885.716666666667, 1038, 10613, 3515.0, 6534.700000000002, 7719.549999999998, 10568.479999999998, 0.08080710132806472, 0.08472711378750965, 0.04111376932804855], "isController": false}, {"data": ["Success Login [/]", 139, 0, 0.0, 3927.0, 1465, 13122, 2974.0, 7233.0, 11748.0, 12917.599999999997, 0.07779474835077932, 0.08696542957392545, 0.04664646043689307], "isController": false}, {"data": ["Check Transfer Antar Bank", 133, 0, 0.0, 6196.210526315788, 1427, 17349, 5749.0, 10185.4, 12422.999999999998, 16374.89999999999, 0.07913854421970289, 0.07631391088256137, 0.04884332026059787], "isController": false}, {"data": ["Transfer Virtual Account", 123, 0, 0.0, 13327.63414634146, 2929, 40177, 11723.0, 22741.4, 25721.399999999998, 39150.28000000002, 0.07495680842441398, 0.07808357950753987, 0.0445056050019958], "isController": false}, {"data": ["Data qris", 120, 0, 0.0, 2842.2416666666663, 998, 6850, 2732.5, 3999.2000000000007, 4823.199999999995, 6749.619999999996, 0.07969905636317266, 0.07508107718587945, 0.0393047104134787], "isController": false}, {"data": ["Mutasi Download", 131, 0, 0.0, 8730.053435114502, 2172, 27789, 6618.0, 17651.6, 22364.399999999998, 27637.960000000003, 0.07797001784977738, 1.2827673324448123, 0.04743683703165166], "isController": false}, {"data": ["Transfer Qris Merchant", 120, 0, 0.0, 8769.191666666668, 2607, 31487, 6673.0, 17471.7, 25250.299999999967, 31149.739999999987, 0.07972844491661402, 0.08453239516207797, 0.05201035273857243], "isController": false}, {"data": ["Data qris [/]", 120, 0, 0.0, 3260.65, 1205, 11005, 2817.0, 5448.800000000003, 6584.049999999999, 10944.939999999997, 0.07948809665752554, 0.07482606286349244, 0.039278297762410076], "isController": false}, {"data": ["GET notifications [/]", 120, 0, 0.0, 5212.041666666666, 2651, 10700, 5046.0, 7441.500000000001, 8005.5, 10409.569999999989, 0.08092257126075343, 0.09050512606556482, 0.04006615588789257], "isController": false}, {"data": ["Informasi Saldo [/]", 135, 0, 0.0, 4083.1777777777793, 970, 17994, 3489.0, 7229.000000000002, 8797.999999999989, 17124.959999999966, 0.07541086352141921, 0.07428930148872216, 0.03836822255337832], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 1, 20.0, 0.02276348736626451], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 4, 80.0, 0.09105394946505804], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4393, 5, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 4, "500/Internal Server Error", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Mutasi", 133, 1, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Mutasi [/] Download", 130, 1, "500/Internal Server Error", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Mutasi [/]", 129, 3, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
