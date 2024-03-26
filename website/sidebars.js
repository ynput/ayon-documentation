function sorted(a, b) {
    const nameA = typeof a == 'string' ? a : (a.items[0] || a.label);
    const nameB = typeof b == 'string' ? b : (b.items[0] || b.label);
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
        "addon_houdini_artist",
        "addon_kitsu_artist",
        {
          type: "category",
          label: "Maya",
          items: [
            "addon_maya_artist",
            "addon_maya_multiverse_artist",
            "addon_maya_yeti_artist",
            "addon_maya_xgen_artist",
            "addon_maya_arnold_artist",
            "addon_maya_vray_artist",
            "addon_maya_redshift_artist",
          ],
        },
        "addon_nuke_artist",
        "addon_photoshop_artist",
        "addon_substancepainter_artist",
        "addon_tvpaint_artist",
        "addon_unreal_artist",
        "addon_wrap_artist",
        "addon_openrv_artist",
        {
            type: "category",
            label: "Aquarium",
            items: [
                "addon_aquarium_artist",
                "addon_aquarium_manager",
            ],
        },
      ].sort(sorted),
    },
  ],
  Admin: [
    "system_introduction",
    {
      type: "category",
      label: "AYON server",
      items: [
        "admin_server_deployment",
        "admin_server_configuration",
        "admin_server_installing_addons",
        "admin_server_provisioning",
        "admin_server_services",
        "admin_server_email",
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
        "addon_aftereffects_admin",
        "addon_blender_admin",
        "addon_resolve_admin",
        "addon_deadline_admin",
        "addon_ftrack_admin",
        "addon_harmony_admin",
        "addon_hiero_admin",
        "addon_houdini_admin",
        "addon_keycloak_admin",
        "addon_maya_admin",
        "addon_nuke_admin",
        "addon_photoshop_admin",
        "addon_site_sync_admin",
        "addon_slack_admin",
        "addon_sso_admin",
        "addon_substancepainter_admin",
        "addon_tvpaint_admin",
        "addon_unreal_admin",
        "addon_kitsu_admin",
        "addon_clockify_admin",
        "addon_traypublisher_admin",
        "addon_wrap_admin",
        "addon_syncsketch_admin",
        "addon_aquarium_admin"
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
    "dev_dev_mode",
    "dev_testing",
    "dev_contribute",
    {
      type: "category",
      label: "Hosts integrations",
      items: [
        "dev_host_implementation",
        "dev_publishing",
      ],
    },
    "dev_deadline",
    "dev_colorspace",
    "dev_event_system",
    {
      type: "category",
      label: "Integrations",
      items: [
        "addon_aquarium_developer"
      ].sort(sorted),
    },
  ],
};
