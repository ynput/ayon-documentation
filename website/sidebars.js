function sorted(a, b) {
    const nameA = typeof a == "string" ? a : a.items[0] || a.label;
    const nameB = typeof b == "string" ? b : b.items[0] || b.label;
    return nameA > nameB ? 1 : -1;
}

module.exports = {
    Dev: [
        "dev_introduction",
        "dev_requirements",
        {
            type: "category",
            label: "AYON launcher",
            items: [
                "dev_launcher",
                "dev_launcher_build_windows",
                "dev_launcher_build_macos",
                "dev_launcher_build_linux",
            ],
        },
        {
            type: "category",
            label: "APIs & Resources",
            link: {
                type: 'generated-index',
                title: 'AYON APIs an develoment resources',
                description:
                  "Welcome to AYON APIs and development resources catalogue!",
                keywords: ['api', 'components'],
              },
            items: [
                "dev_api_rest",
                "dev_api_graphql",
                "dev_api_python",
                "dev_api_cpp",
                "dev_api_usd_resolver",
                "dev_components_react"
            ],
        },
        {
            type: "category",
            label: "AYON server",
            items: [
                "server_introduction",
                "server_api_architecture",
                "server_theme",
                "server_testing",
            ],
        },
        "dev_dev_mode",
        "dev_testing",
        "dev_contribute",
        {
            type: "category",
            label: "Addon Development",
            link: {
                type: 'generated-index',
                title: 'AYON Addon Development',
                description:
                  "Welcome to AYON Addon Development Documentation!",
                keywords: ['addon', 'dev'],
              },
            items: [
                "dev_addon_intro",
                "dev_addon_creation",
                "dev_host_implementation",
                "dev_publishing"
            ],
        },
        "dev_deadline",
        "dev_colorspace",
        "dev_event_system",
        {
            type: "category",
            label: "Integrations",
            items: ["addon_aquarium_developer"].sort(sorted),
        },
    ],
};
