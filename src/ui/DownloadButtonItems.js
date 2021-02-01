import axios from "axios";

export var DownloadButtonItems;

DownloadButtonItems = function (refs, layout) {
    var uiManager = refs.uiManager,
        i18n = refs.i18nManager.get();

    return [
        {
            xtype: 'label',
            text: "Customized Layouts",
            style: 'padding:7px 5px 5px 7px; font-weight:bold; border:0 none'
        },
        {
            text: 'CSV (.csv)',
            iconCls: 'ns-menu-item-tablelayout',
            handler: function () {
                layout = layout || uiManager.instanceManager.getStateCurrent();
                var type = 'json';
                var url = layout.req(null, type, false, true).url();

                var endpoint = "../cert/report/download/";
                console.log("Calling endpoint", endpoint);
                axios.post(endpoint, {
                    url
                }).then(rsp => {
                    var hiddenElement = document.createElement('a');
                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(rsp.data);
                    hiddenElement.target = '_blank';
                    hiddenElement.download = 'report.csv';
                    hiddenElement.click();
                }).catch(err => {
                    console.log("error in downloading csv file", err);
                });
            }
        },
        {
            xtype: 'label',
            text: i18n.table_layout,
            style: 'padding:7px 5px 5px 7px; font-weight:bold; border:0 none'
        },
        {
            text: 'Microsoft Excel (.xls)',
            iconCls: 'ns-menu-item-tablelayout',
            handler: function () {
                uiManager.openTableLayoutTab(layout, 'xls');
            }
        },
        {
            text: 'CSV (.csv)',
            iconCls: 'ns-menu-item-tablelayout',
            handler: function () {
                uiManager.openTableLayoutTab(layout, 'csv');
            }
        },
        {
            text: 'HTML (.html)',
            iconCls: 'ns-menu-item-tablelayout',
            handler: function () {
                uiManager.openTableLayoutTab(layout, 'html+css', true);
            }
        }
    ];
};
