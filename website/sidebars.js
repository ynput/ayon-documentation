function sorted(a, b) {
    const nameA = typeof a == "string" ? a : a.items[0] || a.label;
    const nameB = typeof b == "string" ? b : b.items[0] || b.label;
    return nameA > nameB ? 1 : -1;
}

module.exports = {
    artist: [
        {
            type: "category",
            collapsed: false,
            label: "General",
            items: [
                "artist_getting_started",
                "artist_concepts",
                "artist_publish",
                {
                    type: "category",
                    collapsed: true,
                    label: "Tools",
                    link: { type: "doc", id: "artist_tools" },
                    items: [
                        "artist_tools_creator",
                        "artist_tools_loader",
                        "artist_tools_library_loader",
                        "artist_tools_publisher",
                        "artist_tools_inventory",
                        "artist_tools_workfiles",
                        "artist_tools_look_assigner",
                    ],
                },
            ],
        },
        {
            type: "category",
            collapsed: false,
            label: "Integrations",
            items: [
                "addon_3dsmax_artist",
                "addon_3dequalizer_artist",
                "addon_aftereffects_artist",
                "addon_blender_artist",
                "addon_resolve_artist",
                {
                    type: "category",
                    label: "Ftrack",
                    items: [
                        "addon_ftrack_artist",
                        "addon_ftrack_manager",
                        "addon_ftrack_actions",
                    ],
                },
                "addon_harmony_artist",
                "addon_hiero_artist",
                "addon_flame_artist",
                {
                    type: "category",
                    label: "Houdini",
                    link: {
                        type: 'generated-index',
                        title: 'AYON Houdini Artist Docs',
                        description:
                          "Welcome to AYON Houdini Artist Docs!",
                        keywords: ['houdini'],
                      },
                    items: [
                        "addon_houdini_artist",
                        "addon_houdini_artist_loader_hdas",
                    ],
                },
                "addon_jira_artist",
                "addon_kitsu_artist",
                {
                    type: "category",
                    label: "Maya",
                    items: [
                        "addon_maya_artist",
                        "addon_maya_multiverse_artist",
                        "addon_maya_yeti_artist",
                        "addon_maya_xgen_artist",
                        "addon_maya_ornatrix_artist",
                        "addon_maya_arnold_artist",
                        "addon_maya_vray_artist",
                        "addon_maya_redshift_artist",
                    ],
                },
                {
                    type: "category",
                    label: "USD",
                    link: {
                        type: 'generated-index',
                        title: 'AYON USD Book',
                        description:
                          "Welcome to AYON USD Book!",
                        keywords: ['usd'],
                      },
                    items: [
                        "addon_usd_artist_usd_intro",
                        "addon_usd_artist_get_started",
                        "addon_usd_artist_contribution_workflow",
                        "addon_usd_artist_maya_workflow",
                        "addon_usd_artist_houdini_workflow",
                        "addon_usd_artist_faq",
                    ],
                },
                "addon_motionbuilder_artist",
                "addon_nuke_artist",
                "addon_photoshop_artist",
                "addon_premiere_artist",
                "addon_substancepainter_artist",
                "addon_substancedesigner_artist",
                {
                    type: "category",
                    label: "Tray Publisher",
                    link: {
                        type: 'generated-index',
                        title: 'Tray Publisher User',
                        description:
                          "Tray Publisher User Guide",
                        keywords: ['tray', 'publisher'],
                      },
                    items: [
                        "addon_traypublisher_artist",
                        "addon_traypublisher_artist_advanced"
                    ],
                },
                "addon_tvpaint_artist",
                "addon_unreal_artist",
                "addon_version_control_artist",
                "addon_wrap_artist",
                "addon_openrv_artist",
                {
                    type: "category",
                    label: "Aquarium",
                    items: ["addon_aquarium_artist", "addon_aquarium_manager"],
                },
                "addon_cinema4d_artist",
                "addon_zbrush_artist",
                "addon_mochapro_artist",
            ].sort(sorted),
        },
        {
            type: "category",
            collapsed: false,
            label: "Production Tracking",
            items: [
                "artist_my_tasks_page",
                "artist_details_panel",
                "artist_activity_feed",
                "artist_reviewables",
                "artist_inbox",
                "artist_task_progress_page",
                "addon_planner"
            ],
        },
    ],
    Admin: [
        "system_introduction",
        {
            type: "category",
            label: "AYON Server",
            link: {
                type: 'generated-index',
                title: 'AYON Server',
                description:
                  "Welcome to AYON Server Admin Docs!",
                keywords: ['server', 'admin'],
              },
            items: [
                {
                    type: "category",
                    label: "Self-hosting",
                    link: {
                        type: 'generated-index',
                        title: 'Hosting AYON Server',
                        description:
                          "Documentation dedicated for self hosting AYON and running your own AYON instance.",
                        keywords: ['server', 'admin'],
                      },
                    items: [
                        "admin_server_deployment",
                        "admin_server_configuration",
                        "admin_server_installing_addons",
                        "admin_server_provisioning",
                        "admin_server_services",
                        "admin_server_email",
                    ],
                },
                "admin_server_bundles_and_addons",
                "admin_server_market",
                "admin_server_updating_pipeline",
                "admin_server_permissions",
                "admin_server_power_features",
                "admin_server_licenses",
            ],
        },
        {
            type: "category",
            label: "AYON Launcher",
            items: ["admin_launcher_distribute", "admin_launcher_run"],
        },
        {
            type: "category",
            label: "Configuration",
            items: [
                "admin_environment",
                "admin_settings",
                "admin_colorspace",
                "admin_settings_project_anatomy",
                "addon_core_settings",
                "addon_applications_admin",
            ],
        },
        {
            type: "category",
            label: "Integrations",
            items: [
                "addon_3dsmax_admin",
                "addon_3dequalizer_admin",
                "addon_aftereffects_admin",
                "addon_blender_admin",
                "addon_resolve_admin",
                "addon_deadline_admin",
                "addon_ftrack_admin",
                "addon_harmony_admin",
                "addon_hiero_admin",
                "addon_houdini_admin",
                "addon_keycloak_admin",
                {
                    type: "category",
                    label: "Maya",
                    items: [
                        "addon_maya_admin",
                        "addon_maya_ornatrix_admin",
                    ],
                },
                "addon_motionbuilder_admin",
                "addon_nuke_admin",
                "addon_photoshop_admin",
                "addon_premiere_admin",
                "addon_site_sync_admin",
                "addon_slack_admin",
                "addon_sso_admin",
                "addon_substancepainter_admin",
                {
                    type: "category",
                    collapsed: true,
                    label: "Substance Designer",
                    link: { type: "doc", id: "addon_substancedesigner_admin"},
                    items: [
                        "addon_substancedesigner_admin_tutorials",
                        "addon_substancedesigner_admin_settings",
                    ]
                },
                "addon_tvpaint_admin",
                "addon_unreal_admin",
                "addon_kitsu_admin",
                "addon_jira_admin",
                "addon_clockify_admin",
                "addon_traypublisher_admin",
                "addon_wrap_admin",
                "addon_syncsketch_admin",
                "addon_flow_admin",
                {
                    type: "category",
                    label: "Flame",
                    link: {
                        type: 'generated-index',
                        title: 'AYON Flame Addon',
                        description:
                            "Welcome to Flame Integration Documentation!",
                        keywords: ['flame'],
                    },
                    items: [
                        "addon_flame_admin_intro",
                        "addon_flame_admin_get_started",
                        "addon_flame_admin_settings"
                    ]
                },
                "addon_aquarium_admin",
                "addon_usd_admin",
                {
                    type: "category",
                    label: "Version Control",
                    link: {
                        type: 'generated-index',
                        title: 'AYON Version Control',
                        description:
                          "Welcome to AYON Version Control Docs!",
                        keywords: ['version-control'],
                      },
                    items: [
                        "addon_version_control_admin_intro",
                        "addon_version_control_admin_get_started",
                        "addon_version_control_admin_settings"
                    ]
                },
                "addon_cinema4d_admin",
                "addon_zbrush_admin",
                "admin_webserver_for_webpublisher",
                "addon_mochapro_admin",
            ].sort(sorted),
        },
        "admin_releases",
        "admin_import_openpype_project",
    ],
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
