const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()
const { Adw, GObject } = imports.gi

const {
    baseGTypeName,
    makeRow,
    makeSwitch
} = Me.imports.libs.prefItems

var otherPage = GObject.registerClass({
    GTypeName: baseGTypeName+'otherPage',
}, class notificationsPage extends Adw.PreferencesPage {
    filterListData = []
    filteredAppsGroup
    settings
    addFilteredAppButtonRow

    constructor(settings) {
        // group config
        super({
            name: 'other',
            title: 'Other',
            iconName: 'non-starred-symbolic'
        })
        
        // description / enable
        const group = new Adw.PreferencesGroup()
        makeSwitch({
            parent: group,
            title: "Fix Weather Widget Overflow",
            value: settings.get_boolean("datemenu-fix-weather-widget"),
            subtitle: "Fix overflow visual bug of weather widget in datemenu",
            bind: [settings, "datemenu-fix-weather-widget"]
        })
        makeSwitch({
            parent: group,
            title: "Remove Notifications On Date Menu",
            value: settings.get_boolean("datemenu-remove-notifications"),
            subtitle: "Hide notifications on date menu.\n*this option removes media control on date menu too*",
            bind: [settings, "datemenu-remove-notifications"]
        })
        makeSwitch({
            parent: group,
            title: "Remove Media Control On Date Menu",
            value: settings.get_boolean("datemenu-remove-media-control"),
            subtitle: "Hide media control on date menu.",
            bind: [settings, "datemenu-remove-media-control"]
        })
        this.add(group)
    }
})