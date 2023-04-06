import { DocType } from "../addons/types";

export type Feature = {
    title: string;
    description: string;
    preview?: string;
    docs?: { [type in DocType]?: String };
    id?: string;
};

export type Features = Feature[];

export type FeatureType =
    | "slates"
    | "workfiles"
    | "creator"
    | "loader"
    | "publisher"
    | "sceneManager"
    | "projectManager"
    | "libraryLoader"
    | "trayPublisher"
    | "appLauncher"
    | "configurationGUI"
    | "siteSync"
    | "timersManager"
    | "farmRendering"
    | "remote"
    | "sceneBuilder"
    | "reviewables"
    | "scriptBuilding"
    | "colorManaged"
    | "nodePresets"
    | "rendering";
