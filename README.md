## AYON pipeline official documentation

:exclamation: While we're transitioning from OpenPype, there are a lot of details the are factually incorrect. We're working on resolving all of them. :exclamation:

:books: View the live [documentation](https://ayon.ynput.io).

:family: Check out our community discussions [forum](https://community.ynput.io).

:phone: Want to know even more about AYON? Get in [contact](https://community.ynput.io/contact).

:raising_hand: Need some support or want something custom? Take a look at our [services](https://ynput.io/services/).

## Contribute

If you spot something incorrect or just think a page could do with some improvement, help us out!

1. Make the changes to the relevant markdown file.
2. Make a PR documenting the changes.

## Run Development Server - [docusaurus](https://docusaurus.io/docs/installation#running-the-development-server)

Install Node.js https://nodejs.org/en/download

`cd website`
`npm install`
`npm start`

## Build

`cd website`
`npm build`

## Addons

Every addon is resembled by a typescript or JSON file in `src/data/addons/data`.

### Adding new addons

1. duplicate template.ts (or any other addon) in the data folder as a template to get started
2. rename the file to your addon name (e.g. myAddon.ts)
3. fill in the addon data
4. add the preview or logo image in the addons/img folder "myAddon-icon.png" or "myAddon-preview.png"
5. add addon name ("myAddon") to either officialAddons or communityAddons

### File Types
You can use either a .ts (recommended) or .json file
If you use a .ts file you can use intellisense to help you write the file
Take a look at the types.ts file to see what you can add to the addon object

### Using an Icon (recommended)
Icon images should be 1:1 ratio (square) and have a transparent background
When using an icon image, a blurred background will be generated and a color palette will be extracted from the image

### Using a Preview image
Sometimes logo images doesn't work as expected, in that case you can add a preview image that will be used instead
Preview images should be around 1:2 ratio (landscape), include a blurred background and have the text "myAddon Addon" baked into the image.
It's harder to match a preview image to the rest of the addons so it's recommended to use an icon image when possible

| Attribute | Description | Example |
|----------|-------------|---------|
| title | The title of the addon | Blender |
| description | A short description of the addon | Blender is a great addon |
| descriptionLong | A long description of the addon | Blender is a great addon that does a lot of things |
| preview | A preview image of the addon | blender.png |
| icon | A logo image of the addon | blender-icon.png |
| features | An array of features that the addon supports | `['workfiles', 'loader']` |
| families | An array of families that the addon supports | `['image', 'video', 'model']` |
| addons | An array of addons that the addon supports | `['nuke', 'maya']` |
| docs | An object of documentation links for the addon | `{ user: artist_hosts_blender, admin: admin_hosts_blender, developer: dev_publishing }` |
| github | A link to the github code repository of the addon | - |
| discussion | A link to the discussion forum of the addon | - |
| id | The id of the addon, if not set (recommended) it will be the same as the filename | blender |



