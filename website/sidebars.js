/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

//module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
//};

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
              "artist_tools",
              "artist_install"
          ],
      },
      {
          type: "category",
          collapsed: false,
          label: "Integrations",
          items: [
              "artist_hosts_hiero",
              "artist_hosts_nuke_tut",
              {
                  type: "category",
                  label: "Maya",
                  items: [
                      "artist_hosts_maya",
                      "artist_hosts_maya_multiverse",
                      "artist_hosts_maya_yeti",
                      "artist_hosts_maya_xgen",
                      "artist_hosts_maya_vray",
                      "artist_hosts_maya_redshift",
                  ],
              },
              "artist_hosts_blender",
              "artist_hosts_harmony",
              "artist_hosts_houdini",
              "artist_hosts_aftereffects",
              "artist_hosts_resolve",
              "artist_hosts_photoshop",
              "artist_hosts_tvpaint",
              "artist_hosts_unreal",
              "artist_kitsu",
              {
                  type: "category",
                  label: "Ftrack",
                  items: [
                      "artist_ftrack",
                      "manager_ftrack",
                      "manager_ftrack_actions",
                  ],
              }
          ],
      },
  ],
  Admin: [
      "system_introduction",
      {
          type: "category",
          label: "Getting Started",
          items: [
              "admin_builds",
              "admin_distribute",
              "admin_use",
              "admin_ayon_commands",
          ],
      },
      {
          type: "category",
          label: "Configuration",
          items: [
              "admin_settings",
              "admin_settings_system",
              "admin_settings_project_anatomy",

          ],
      },
      {
          type: "category",
          label: "Modules",
          items: [
              "module_ftrack",
              "module_kitsu",
              "module_site_sync",
              "module_deadline",
              "module_muster",
              "module_slack"
          ],
      },
      {
          type: "category",
          label: "Integrations",
          items: [
              "admin_hosts_blender",
              "admin_hosts_hiero",
              "admin_hosts_houdini",
              "admin_hosts_maya",
              "admin_hosts_nuke",
              "admin_hosts_resolve",
              "admin_hosts_harmony",
              "admin_hosts_aftereffects",
              "admin_hosts_tvpaint"
          ],
      },
     
      
  ],
  
};