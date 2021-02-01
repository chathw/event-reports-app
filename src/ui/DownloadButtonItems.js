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

                var endpoint = "../../cert/report/download/";
                axios.post(endpoint, {
                    url
                }).then(rsp => {
                    var blob = new Blob([rsp], { type: 'application/pdf' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "report.csv";

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);
                });
                console.log("URL", layout, url);
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
